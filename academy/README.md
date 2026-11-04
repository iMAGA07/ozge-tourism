# Ozge Academy — website prototype

Phase-1 prototype of **www.ozgeacademy.com**, built from *Ozge Academy — Website
Development Requirements* (19 Oct 2026). A separate Next.js app living in this
repository, deployable as its own Vercel project.

```bash
cd academy
npm install
npm run dev        # http://localhost:3001  (→ redirects to /en)
npm run build      # production build
```

Copy `.env.example` → `.env.local` and add a Telegram bot token + chat IDs to
receive submissions. Without them, development prints submissions to the
terminal; production refuses them with a clear "message us on WhatsApp"
notice, so nothing is ever silently lost.

---

## What's in the prototype

| Area | Status |
|---|---|
| Animated homepage — hero orbit, rotating headline, marquee, scroll reveals, 11 sections | ✅ |
| Homepage **section order** driven by data (`src/content/en/home.ts → sections`) | ✅ |
| About (story, mission, vision, values, philosophy, quality, Ozge Ltd.) | ✅ |
| Programs overview → 6 division pages → **25 course pages** | ✅ |
| Course page: objectives, audience, requirements, levels, formats, class types, curriculum, packages, instructors, FAQ, Apply + Free-call buttons | ✅ |
| Packages (name, description, includes, duration, sessions, formats, price/“on request”, hide flag) | ✅ |
| Instructors page (role-based placeholders — no invented people) | ✅ |
| How to apply (8-step process) | ✅ |
| **Online registration** — 4 steps, preselects course from any “Apply” link, guardian details + consent for under-18s, privacy & terms consent, reference number | ✅ |
| **Free 15-min call booking** — course, day (next 14, Sundays off), time slot, details | ✅ request-based |
| **Complaints / suggestions / feedback** — 5 categories, **anonymous by default**, optional contact, separate confidential delivery channel | ✅ |
| Contact page — WhatsApp, email, city, hours, form, link to feedback | ✅ |
| FAQ by category (+ FAQPage structured data) | ✅ |
| Legal: Privacy, Terms, Enrollment & Cancellation, Refund, Cookie, Complaints policy | ✅ drafts, clearly marked |
| SEO: per-page titles/descriptions, canonical URLs, sitemap.xml (46 URLs), robots.txt, Organization + Course + FAQ JSON-LD | ✅ |
| Accessibility: labelled fields, keyboard navigation, skip link, focus rings, reduced-motion support, native `<details>` FAQ | ✅ |
| Multilingual architecture (`/en/...` URLs, dictionaries, per-locale content with English fallback) | ✅ prepared |
| Online payments | 🟡 prepared — price model has amount + currency; no checkout yet |
| CMS / admin dashboard, application statuses, CSV export | 🔜 phase 2 |
| Calendar-backed booking (no double-booking), email confirmations & reminders | 🔜 phase 2 |

## Security (built in from the start)

- **Strict Content-Security-Policy** with a fresh per-request nonce (`src/middleware.ts`) — only scripts the server rendered can run.
- HSTS, `X-Frame-Options: DENY` / `frame-ancestors 'none'`, `nosniff`, strict Referrer-Policy, Permissions-Policy, no `X-Powered-By`.
- **One validation schema** (`src/lib/schemas.ts`, zod) used by the browser *and* re-enforced on the server.
- **CSRF**: form posts accepted only as JSON from our own origin.
- **Rate limiting** per form, keyed by a SHA-256 hash of the IP (raw IPs are never stored).
- **Spam**: hidden honeypot + minimum fill time; bots receive a normal-looking reply so they don't adapt.
- 24 KB body cap, length limits on every field, HTML-escaping of everything delivered to staff.
- **Anonymous feedback is enforced on the server**: name/email/phone are stripped even if a tampered browser sends them; nothing identifying is logged.
- Complaints go to a **separate staff channel** (`TG_COMPLAINTS_CHAT_ID`).
- Production logs never contain personal data — only a reference number and status.

**Honest limitations** (the requirements ask for these, not “100% secure”):
- The rate limiter is in-memory per server instance. At scale, swap the `Map` in `src/lib/server/security.ts` for Upstash Redis / Vercel KV.
- Submissions are delivered to Telegram, not stored in a database. Telegram is a third-party processor; phase 2 should store records in a database first (statuses, notes, CSV export, retention rules) and only *notify* via Telegram/email.
- Consultation slots are requests confirmed by staff — there is no live availability yet, so two people can request the same slot.
- Legal pages are drafts and must be reviewed by a lawyer.

## How to…

**Add a course** — add an object to the right division in `src/content/en/programs.ts`. The page, navigation, registration dropdowns, sitemap and division count update automatically. Set `published: false` to hide it, or `featured: true` to show it on the homepage.

**Add a division** — add a `Division` object; pick an `icon` and `accent`.

**Set a price** — on a package, replace `price: null` with `{ amount: 120000, currency: "KZT", per: "month" }`.

**Launch Kazakh or Russian** — see `src/i18n/config.ts`: add the locale code, a dictionary file, and a content folder. Untranslated content falls back to English, so a language can launch page by page.

**Reorder the homepage** — edit `sections` in `src/content/en/home.ts`.

## ⚠️ Placeholders to confirm before launch

All in `src/content/site.ts` unless noted:
- WhatsApp number (currently the Ozge group line), email `info@ozgeacademy.com`, opening hours
- Social media links (none shown yet)
- Instructor names, photos and bios (`src/content/en/instructors.ts`)
- Course durations, session counts, package contents, prices (`src/content/en/programs.ts`)
- All legal text (`src/content/en/legal.ts`)

## Structure

```
src/
  app/[locale]/…        pages (home, about, programs, instructors, admissions,
                        consultation, register, feedback, contact, faq, legal)
  app/api/submit/[kind] one hardened endpoint for all four forms
  components/           Header, Footer, cards, hero orbit, form kit + forms
  content/              all page copy & program data (→ CMS collections later)
  i18n/                 locales + UI dictionaries
  lib/                  shared schemas, slots, server security & delivery
  middleware.ts         locale routing + nonce CSP
```

## Deploying

Create a **new** Vercel project from this repository with **Root Directory = `academy`**.
Add the env vars from `.env.example`. The tourism site is unaffected — its build
excludes this folder (`tsconfig.json`) and its deploys skip it (`.vercelignore`).
