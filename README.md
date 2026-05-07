# Ozge Tourism — Premium Landing Site

A single-page, world-class marketing site for **Ozge Tourism**, a Kazakhstan-based tour operator serving foreign travelers across Central Asia. Built to feel as polished as Aman, Apple and Linear — cinematic photography, sophisticated motion, an interactive map of every Kazakh region, and a beautifully crafted lead form.

> Live mock: `npm run dev` and open http://localhost:3000

---

## 1 · Setup

```bash
cd website
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Node 18.18+ recommended (Node 20+ is fine).

### Photos

The repo already includes 39 web-optimized JPGs under `public/photos/` and 6 testimonial images under `public/testimonials/`. They were converted from the source HEICs using macOS `sips` at 2200px/quality 78 — keeping the entire image folder under ~50 MB without visible quality loss.

If you ever want to re-run the conversion:

```bash
# from the repo root, with HEICs in ./photos/
for f in ./photos/*.HEIC; do
  out="website/public/photos/$(basename "${f%.*}").jpg"
  sips -s format jpeg -s formatOptions 78 -Z 2200 "$f" --out "$out"
done
```

### Optional integrations

The inquiry form posts to `POST /api/inquiry`. Without env vars it just logs to the server. Add these in `.env.local` to wire up real notifications:

```env
GSHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
TG_BOT_TOKEN=123456:abc
TG_CHAT_ID=-100123456789
```

See section 6 for the full integration plan.

---

## 2 · Project structure

```
website/
├── public/
│   ├── logo.png                # Ozge logo (transparent)
│   ├── kz_map.svg              # Source SVG of Kazakhstan
│   ├── photos/                 # 39 optimized travel photos
│   └── testimonials/           # 6 review screenshots
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, SEO, smooth scroll
│   │   ├── page.tsx            # The single page — composes every section
│   │   ├── globals.css         # Tailwind + custom styles
│   │   └── api/inquiry/route.ts# Form endpoint (Sheets + Telegram ready)
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky nav, mobile drawer
│   │   ├── Hero.tsx            # Cinematic full-bleed hero, parallax
│   │   ├── Marquee.tsx         # Edge-to-edge photo strip
│   │   ├── WhyKazakhstan.tsx   # Stats + 3-up image collage
│   │   ├── InteractiveMap.tsx  # ⭐ The 20-region interactive map
│   │   ├── Adventures.tsx      # Scheduled adventures (May 2026)
│   │   ├── Storytelling.tsx    # 6 editorial story tiles
│   │   ├── Services.tsx        # 12 service cards
│   │   ├── Destinations.tsx    # Featured spots — staged display + thumbs
│   │   ├── WhyUs.tsx           # 8 reasons + bold guarantee
│   │   ├── Pricing.tsx         # 3 flexible pricing options + quote
│   │   ├── Testimonials.tsx    # Masonry of testimonial images
│   │   ├── About.tsx           # Company info + countries served
│   │   ├── Faq.tsx             # Animated accordion
│   │   ├── LeadForm.tsx        # Inquiry form with full validation
│   │   ├── Footer.tsx          # Logo + clickable socials + copyright
│   │   ├── Reveal.tsx          # Reveal & RevealText motion primitives
│   │   ├── SectionHeader.tsx   # Shared section title block
│   │   └── SmoothScroll.tsx    # Lenis bootstrap (client-only)
│   ├── data/
│   │   ├── site.ts             # Brand contact info & nav items
│   │   ├── photos.ts           # Photo mapping with object-position
│   │   ├── content.ts          # Adventures, services, FAQ, pricing
│   │   ├── regions.ts          # 20 Kazakhstan regions w/ blurbs
│   │   └── regions_paths.json  # Extracted SVG <path d="..."> data
│   └── lib/utils.ts            # cn() helper
├── tailwind.config.ts          # Brand tokens, motion easings
├── next.config.mjs             # Image formats + package optimization
└── tsconfig.json
```

---

## 3 · Libraries used

| Package | Purpose |
| --- | --- |
| `next@15.1.6` | App Router, Image optimization, route handlers |
| `react@19` / `react-dom@19` | UI |
| `tailwindcss` | Styling system + brand tokens |
| `framer-motion` | Reveals, parallax, AnimatePresence transitions |
| `lenis` | Smooth scrolling on desktop (auto-disabled for prefers-reduced-motion) |
| `lucide-react` | Icon set (menu, plus, socials) |
| `clsx` + `tailwind-merge` | The `cn()` helper for class composition |

No animation libraries are loaded eagerly: `lenis` is dynamically imported, and `framer-motion` / `lucide-react` are tree-shaken via `experimental.optimizePackageImports`.

---

## 4 · UX decisions

- **Light, paper-cream surfaces** alternated with deep ink and a warm terracotta + saffron accent — drawn from the Ozge logo. No random colors, no generic gradients.
- **Sophisticated typography rhythm:** modern sans (Inter as a Futura-friendly fallback) + Cormorant italic for the cinematic emphasis lines (e.g. *"dreaming of."* / *"every kind."*). All headings use a `clamp()` fluid scale.
- **One screen, one idea.** Every section opens with a small `eyebrow → headline → italic phrase → lead` rhythm so the page reads like an editorial magazine instead of a feature list.
- **The interactive map is the centerpiece.** It sits early in the page (right after the value proposition) so first-time visitors immediately understand the breadth of Kazakhstan.
- **A bold, unconventional guarantee** appears twice — once inside Why Us, once next to the form — to remove psychological friction at the moment of commitment.
- **Mobile-first.** The map gracefully degrades to a tappable region-chip layout. The featured destinations switch from a staged display to a snap-scroll horizontal track. The nav becomes a fullscreen drawer.

---

## 5 · Animation system

A small set of reusable, restrained motion primitives — never gratuitous, always tied to scroll intent:

- **`<Reveal>`** — fade + 28 px Y + slight blur, triggered once on enter, 950 ms with `[0.22, 1, 0.36, 1]` (the "smooth out" curve we use everywhere).
- **`<RevealText>`** — line-clip per word, used on H1/H2 to give a film-title feel without relying on heavy split-text libraries.
- **Hero parallax** — `useScroll` on the section drives Y-translate, scale and opacity for the photo + headline (separate transforms for layered depth).
- **Map tooltips** — pointer-driven floating card on desktop, `AnimatePresence` cross-fade on the side panel, `clip-path`/`filter` glow for active region.
- **Marquee** — pure CSS (`@keyframes marquee`) so it stays smooth even during heavy JS work.
- **Hover micro-interactions** — 500 ms color & translate transitions on every CTA. Cards lift via image scale (`group-hover:scale-[1.04]`).
- **`prefers-reduced-motion`** — respected globally; Lenis is skipped, animations clamp to ~0 ms.

---

## 6 · Responsive strategy

- **Layout:** `grid` + `flex` everywhere; no fixed widths. The page max-width is `1400px`. Most sections use a 12-column grid that collapses to 1–2 columns under `lg:`.
- **Type:** `clamp()` fluid type via `.fluid-h1`, `.fluid-h2`, `.fluid-h3`, `.fluid-lead` so headlines breathe from 360 px to 1920 px without breakpoints.
- **Images:** every `<Image>` uses `sizes` for proper srcset selection, plus `object-position` tuned per photo (defined once in `data/photos.ts`) to keep landscape composition centered.
- **Map:** desktop hover-tooltip ↔ mobile region-chip strip + sticky side panel, switched by a `useIsMobile()` matchMedia hook.
- **Touch targets:** 44 px minimum throughout (buttons are `py-3.5+`, inputs `py-3`).

---

## 7 · Asset integration

- **Photos.** I audited every photo in the source folder, then wrote `src/data/photos.ts` as a single source of truth that maps semantic keys (`hero`, `mountain`, `golden`, …) to filename + `object-position` so we can tune cropping per photo without touching components. The 6 best landscape-leading frames feed the storytelling section; the 6 most iconic regions feed the destinations carousel.
- **Logo** is rendered via `next/image` (priority on the first instance) and re-used in the navbar and footer.
- **Map.** The SVG was parsed at build time (a tiny Python script extracts each `<path d="..." name="..." id="...">` into `regions_paths.json`). We then render the regions ourselves in React so we can attach hover/click handlers, glow filters and custom styles per region — the 20 paths each carry a curated blurb and 3–4 highlights authored in `data/regions.ts`.
- **Testimonials.** The PNG screenshots were converted to JPG at quality 80 / 1600 px and rendered as a CSS multi-column masonry so they retain aspect ratio without forcing a fixed grid.

---

## 8 · Future integration plan

The form is a clean POST to `/api/inquiry`. The route handler already supports two integrations — both opt-in via env vars.

### Google Sheets

1. Open a target Google Sheet. **Extensions → Apps Script** and paste:
   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActive().getSheetByName('Inquiries');
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([
       d.submittedAt, d.fullName, d.contact, d.email,
       d.preferred, d.details, d.ua,
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
2. **Deploy → New deployment → Web app**, "Execute as: me", "Who has access: Anyone".
3. Copy the URL → set `GSHEETS_WEBAPP_URL` in `.env.local`.

### Telegram

1. Talk to **@BotFather**, `/newbot`, copy the token → `TG_BOT_TOKEN`.
2. Send any message to your bot, then `https://api.telegram.org/bot<TOKEN>/getUpdates` to find your `chat.id`.
3. Set `TG_CHAT_ID` in `.env.local`.

Both run server-side from `src/app/api/inquiry/route.ts`. Failures are caught and logged so a Sheets outage never blocks a Telegram alert (or vice versa).

### Anti-spam (next steps)

- Add a hidden honeypot field + IP rate-limit (e.g. Upstash) in the route handler.
- Optionally swap to **Resend** for a transactional copy to `info@ozgetourism.com`.

---

## 9 · SEO & performance

- App-router metadata: title template, description, OG image (`/photos/IMG_3873.jpg`), Twitter card, theme-color, robots.
- Semantic HTML (`<main>`, `<header>`, `<section>` per section, `<footer>`, labelled forms, `aria-expanded` on accordion, `aria-label` on icon buttons).
- All meaningful images carry alt text; decorative ones use `alt=""`.
- `next/image` with AVIF/WebP and `priority` only on the hero — every other image is lazy-loaded.
- Production bundle: ~207 kB First Load JS for the page (verified via `next build`).

---

## 10 · Editing content

Almost everything is text — change one of these and the whole site updates:

| Edit | File |
| --- | --- |
| Phone, email, address, social URLs | `src/data/site.ts` |
| Region names, blurbs, highlights | `src/data/regions.ts` |
| Adventures, services, why-us, pricing, FAQ | `src/data/content.ts` |
| Photo selection & cropping | `src/data/photos.ts` |
| Brand colors | `tailwind.config.ts → theme.extend.colors.brand` |

---

Designed and built with care, in May 2026.
