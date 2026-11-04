import { NextResponse } from "next/server";
import { z } from "zod";
import {
  antiSpam,
  consultationSchema,
  contactSchema,
  feedbackSchema,
  fieldErrors,
  registrationSchema,
  submissionKinds,
  type SubmissionKind,
} from "@/lib/schemas";
import { isBookable } from "@/lib/slots";
import { clientIp, rateLimit, reference, sameOrigin } from "@/lib/server/security";
import { deliver } from "@/lib/server/notify";
import { findCourse, findDivision } from "@/content";

const MAX_BODY = 24_000; // bytes — generous for text, blocks oversized payloads
const MIN_FILL_MS = 2500; // humans don't complete a form in under 2.5 s
const PREFIX: Record<SubmissionKind, string> = { registration: "REG", consultation: "CON", feedback: "FBK", contact: "MSG" };

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: Request, ctx: { params: Promise<{ kind: string }> }) {
  const { kind } = await ctx.params;
  if (!(submissionKinds as readonly string[]).includes(kind)) return json({ ok: false, error: "not_found" }, 404);

  // 1. Only same-site JSON requests (CSRF defence).
  if (!sameOrigin(req)) return json({ ok: false, error: "forbidden" }, 403);
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ ok: false, error: "unsupported" }, 415);

  // 2. Rate limit per client and form.
  const limit = await rateLimit(clientIp(req), kind, kind === "feedback" ? 4 : 6);
  if (!limit.ok) return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });

  // 3. Size-capped body.
  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "too_large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // 4. Bot traps. Bots get a normal-looking success so they don't adapt.
  const spam = antiSpam.safeParse(body);
  if (!spam.success || spam.data.website || Date.now() - spam.data.startedAt < MIN_FILL_MS) {
    return json({ ok: true, reference: reference(PREFIX[kind as SubmissionKind]) });
  }

  // 5. Validate and deliver.
  try {
    return await handle(kind as SubmissionKind, body);
  } catch (err) {
    if (err instanceof z.ZodError) return json({ ok: false, error: "invalid", fields: fieldErrors(err) }, 400);
    console.error(`[academy] ${kind} handler error`);
    return json({ ok: false, error: "server" }, 500);
  }
}

async function handle(kind: SubmissionKind, body: unknown) {
  switch (kind) {
    case "registration": {
      const v = registrationSchema.parse(body);
      const found = findCourse("en", v.division, v.course);
      if (!found) throw zodPathError("course", "required");
      const ref = reference(PREFIX.registration);
      return finish(ref, await deliver({
        title: "New registration · Ozge Academy",
        reference: ref,
        fields: [
          ["Program", found.division.title],
          ["Course", found.course.title],
          ["Package", v.package],
          ["Format", v.format],
          ["Class type", v.mode],
          ["Start", v.start],
          ["Level", v.level],
          ["Name", v.fullName],
          ["Email", v.email],
          ["Phone", v.phone],
          ["Country", v.country],
          ["Goals", v.goals],
          ["Comments", v.comments],
          ...(v.isMinor
            ? ([
                ["Minor", "Yes — guardian consent given"],
                ["Guardian", v.guardianName],
                ["Guardian email", v.guardianEmail],
                ["Guardian phone", v.guardianPhone],
              ] as [string, unknown][])
            : []),
          ["Status", "New"],
        ],
      }));
    }
    case "consultation": {
      const v = consultationSchema.parse(body);
      const found = findCourse("en", v.division, v.course);
      if (!found) throw zodPathError("course", "required");
      if (!isBookable(v.date, v.time)) throw zodPathError("time", "time");
      const ref = reference(PREFIX.consultation);
      return finish(ref, await deliver({
        title: "Free 15-min call request · Ozge Academy",
        reference: ref,
        fields: [
          ["Course", `${found.course.title} (${found.division.title})`],
          ["Requested slot", `${v.date} at ${v.time} (Astana)`],
          ["Name", v.fullName],
          ["Email", v.email],
          ["Phone", v.phone],
          ["Topic", v.topic],
          ["Status", "Awaiting confirmation"],
        ],
      }));
    }
    case "feedback": {
      const v = feedbackSchema.parse(body);
      const related = v.relatedProgram ? findDivision("en", v.relatedProgram)?.title ?? "—" : undefined;
      const ref = reference(PREFIX.feedback);
      return finish(ref, await deliver({
        title: `Feedback · ${v.category.toUpperCase()}`,
        reference: ref,
        confidential: true,
        fields: [
          ["Category", v.category],
          ["Related program", related],
          ["Subject", v.subject],
          ["Message", v.message],
          ["Identity", v.anonymous ? "Anonymous (no identity stored)" : "Provided"],
          ["Name", v.name],
          ["Email", v.email],
          ["Phone", v.phone],
          ["Status", "Received"],
        ],
      }));
    }
    case "contact": {
      const v = contactSchema.parse(body);
      const ref = reference(PREFIX.contact);
      return finish(ref, await deliver({
        title: "Contact message · Ozge Academy",
        reference: ref,
        fields: [
          ["Name", v.fullName],
          ["Email", v.email],
          ["Phone", v.phone],
          ["Subject", v.subject],
          ["Message", v.message],
        ],
      }));
    }
  }
}

function finish(ref: string, delivery: Awaited<ReturnType<typeof deliver>>) {
  if (delivery === "unconfigured") return json({ ok: false, error: "unavailable" }, 503);
  if (delivery === "failed") return json({ ok: false, error: "server" }, 502);
  return json({ ok: true, reference: ref });
}

function zodPathError(path: string, message: string) {
  return new z.ZodError([{ code: "custom", path: [path], message }]);
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
