import "server-only";

// ─── Rate limiting ──────────────────────────────────────────────────────────
// Fixed-window counter per (client, form). Clients are identified by a SHA-256
// hash of their IP — the raw address is never stored, not even in memory.
// NOTE: memory is per server instance. For production at scale, swap the Map
// for a shared store (e.g. Upstash Redis / Vercel KV) — same interface.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export async function rateLimit(ip: string, scope: string, limit = 5, windowMs = 10 * 60_000) {
  const key = await sha256(`${scope}:${ip}`);
  const now = Date.now();
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }
  b.count += 1;
  return b.count > limit ? { ok: false as const, retryAfter: Math.ceil((b.resetAt - now) / 1000) } : { ok: true as const };
}

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

// ─── Cross-site request forgery ─────────────────────────────────────────────
// Browsers always send Origin on cross-site POSTs. We only accept form posts
// from our own site, and only as JSON (which plain HTML forms cannot send).
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>();
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) allowed.add(host);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host);
    } catch {}
  }
  return allowed.has(originHost);
}

// ─── Submission references ──────────────────────────────────────────────────
// Human-friendly, unguessable IDs such as OA-REG-7KX4QM. No 0/O/1/I to avoid
// mix-ups when read over the phone.
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function reference(prefix: string) {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `OA-${prefix}-${Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("")}`;
}
