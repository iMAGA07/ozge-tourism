"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { AnimatedNumber } from "./AnimatedNumber";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Polaroid grid — captures of the operation
const polaroids = [
  { src: "IMG_5616_2.jpg", caption: "Horse riding · Akmola", rotate: -4 },
  { src: "IMG_8742.jpg", caption: "Inside the yurt", rotate: 3 },
  { src: "IMG_2972.jpg", caption: "Karagandy · Karaganda", rotate: -2 },
  { src: "IMG_7140.jpg", caption: "Family table · Steppe", rotate: 5 },
];

// Country code → label for the passport stamps
const operations = [
  { code: "KZ", label: "Kazakhstan", year: "2025" },
  { code: "UZ", label: "Uzbekistan", year: "2025" },
  { code: "KG", label: "Kyrgyzstan", year: "2025" },
  { code: "TJ", label: "Tajikistan", year: "2025" },
  { code: "TM", label: "Turkmenistan", year: "2025" },
  { code: "AF", label: "Afghanistan", year: "2025" },
  { code: "IR", label: "Iran", year: "2025" },
  { code: "+", label: "& beyond", year: "—" },
];

type HelpTab = "tours" | "outdoor" | "retreats" | "logistics";
const helpTabs: { id: HelpTab; label: string; body: string }[] = [
  {
    id: "tours",
    label: "Tours & Trips",
    body:
      "Exceptional and fully customized tours, trips, adventures, and retreats across Kazakhstan and Central Asia. Whether you're looking for a one-day trip, a weekend getaway, or a multi-day cultural or nature-focused journey — we design every experience according to your interests.",
  },
  {
    id: "outdoor",
    label: "Outdoor Activities",
    body:
      "A wide range of exciting outdoor activities — including, but not limited to, horse riding, archery, target shooting, cycling, camping, hiking, paragliding, skiing, snowboarding, and winter snow adventures — depending on the season and location.",
  },
  {
    id: "retreats",
    label: "Retreats & Off-sites",
    body:
      "Professional retreats and team-building programs, including corporate retreats, leadership and academic retreats, student and youth camps, and strategic off-site planning retreats for schools, universities, and organizations.",
  },
  {
    id: "logistics",
    label: "Travel Logistics",
    body:
      "To ensure a smooth and comfortable travel experience, we also assist with flight bookings, reservations, and all necessary travel arrangements across Kazakhstan and Central Asia.",
  },
];

export function About() {
  const [tab, setTab] = useState<HelpTab>("tours");
  const active = helpTabs.find((t) => t.id === tab)!;

  return (
    <section id="about" className="relative overflow-hidden bg-brand-paper py-24 md:py-36">
      {/* Faint dashed flight path */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1400 200"
        className="pointer-events-none absolute inset-x-0 top-12 mx-auto hidden h-28 max-w-[1400px] text-brand-terracotta/15 md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C220,40 520,200 720,120 S1180,40 1400,160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
                <span className="h-[1px] w-8 bg-brand-terracotta/60" />
                About us
              </span>
              <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
                Stamped in 2025.{" "}
                <span className="font-serif italic font-normal text-brand-terracotta">
                  Made for explorers.
                </span>
              </h2>
            </div>
            <div className="md:col-span-5 md:self-end">
              <p className="text-[13.5px] leading-relaxed text-brand-charcoal/65 md:text-[14px]">
                Ozge Tourism is a division of Ozge LTD, officially registered in
                2025 at the Astana International Financial Centre (AIFC),
                Kazakhstan. We were founded with a clear mission: to help nature
                lovers and adventure seekers discover and experience the very
                best of Kazakhstan and Central Asia.
              </p>
            </div>
          </div>
        </Reveal>

        {/* PASSPORT SPREAD ─ Who we are */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 grid overflow-hidden rounded-md border border-brand-charcoal/15 bg-brand-paper md:mt-20 md:grid-cols-2">
            {/* Spine / center binding */}
            <div className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-brand-charcoal/15 md:block" />
            <div className="pointer-events-none absolute inset-y-6 left-1/2 hidden -translate-x-1/2 flex-col items-center justify-around md:flex">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full border border-brand-charcoal/40 bg-brand-paper"
                />
              ))}
            </div>

            {/* Left page — passport bio */}
            <div className="relative p-7 md:p-12">
              {/* Top header */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                <span className="font-mono">Republic of Adventure</span>
                <span className="font-mono text-brand-terracotta">PASSPORT</span>
              </div>

              <div className="mt-8 grid grid-cols-[88px_1fr] gap-5">
                {/* "Photo" — the team */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-brand-charcoal/20">
                  <Image
                    src={`/photos/${photos.guide.src}`}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover grayscale"
                  />
                </div>
                <dl className="space-y-3 text-[10.5px] uppercase tracking-[0.22em] text-brand-charcoal/55">
                  <div>
                    <dt className="text-brand-charcoal/45">Name</dt>
                    <dd className="mt-1 font-display text-[15px] font-medium tracking-normal text-brand-ink">
                      Ozge Tourism
                    </dd>
                  </div>
                  <div>
                    <dt className="text-brand-charcoal/45">Registered</dt>
                    <dd className="mt-1 font-mono text-[11.5px] tracking-wider text-brand-ink">
                      AIFC · 2025
                    </dd>
                  </div>
                  <div>
                    <dt className="text-brand-charcoal/45">Operating</dt>
                    <dd className="mt-1 font-mono text-[11.5px] tracking-wider text-brand-ink">
                      Central Asia
                    </dd>
                  </div>
                  <div>
                    <dt className="text-brand-charcoal/45">Languages</dt>
                    <dd className="mt-1 font-mono text-[11.5px] tracking-wider text-brand-ink">
                      EN · RU · KZ + more
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Stats stamps */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-dashed border-brand-charcoal/25 pt-6">
                <Stat label="Tours" value={<><AnimatedNumber to={100} duration={1400} />+</>} />
                <Stat label="Countries" value={<><AnimatedNumber to={7} duration={1100} />+</>} />
                <Stat label="Since" value={<><AnimatedNumber to={2025} duration={1500} /></>} />
              </div>

              {/* Diagonal "Approved" stamp */}
              <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-[-12deg] md:block">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-[3px] border-brand-terracotta/70 text-center font-display text-[12px] font-medium uppercase tracking-[0.06em] text-brand-terracotta/75">
                  <span>Approved</span>
                  <span className="font-mono text-[9px] tracking-widest">
                    AIFC · 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Right page — polaroids */}
            <div className="relative bg-brand-mist/50 p-7 md:p-12">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                <span className="font-mono">Notes from the road</span>
                <span className="font-mono">04 / 04</span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 md:gap-6">
                {polaroids.map((p, i) => (
                  <div
                    key={p.src}
                    style={{ transform: `rotate(${p.rotate}deg)` }}
                    className={cn(
                      "rounded-sm bg-brand-paper p-2 pb-4 shadow-[0_8px_30px_-12px_rgba(20,15,10,0.25)]",
                      i === 1 || i === 2 ? "mt-4 md:mt-6" : ""
                    )}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-brand-mist">
                      <Image
                        src={`/photos/${p.src}`}
                        alt={p.caption}
                        fill
                        sizes="(min-width: 768px) 18vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2 px-1 font-serif text-[10.5px] italic text-brand-charcoal/70">
                      {p.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHAT CAN WE HELP WITH — tabbed open journal */}
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-md border border-brand-charcoal/15 bg-brand-ink text-brand-cream md:mt-16">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-5 md:border-r md:border-brand-cream/10">
                <div className="border-b border-dashed border-brand-cream/15 px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-brand-cream/55 md:px-8">
                  What can we help you with?
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl font-light leading-tight text-brand-cream md:text-3xl">
                    Tours. Outdoor.{" "}
                    <span className="font-serif italic text-brand-saffron">
                      Retreats. Logistics.
                    </span>
                  </h3>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {helpTabs.map((t) => {
                      const isActive = tab === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          data-cursor="hover"
                          onClick={() => setTab(t.id)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-[12px] transition-colors duration-500",
                            isActive
                              ? "border-brand-saffron bg-brand-saffron text-brand-ink"
                              : "border-brand-cream/25 text-brand-cream/70 hover:border-brand-cream/55 hover:text-brand-cream"
                          )}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="md:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 md:p-10"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10.5px] tracking-widest text-brand-saffron">
                        №{" "}
                        {String(
                          helpTabs.findIndex((t) => t.id === tab) + 1
                        ).padStart(2, "0")}
                      </span>
                      <span className="text-[10.5px] uppercase tracking-[0.28em] text-brand-cream/55">
                        {active.label}
                      </span>
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-brand-cream/70 md:text-[14px]">
                      {active.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHERE WE OPERATE — passport stamps grid */}
        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16">
            <div className="flex items-baseline justify-between text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
              <span>Where we operate</span>
              <span className="font-mono text-brand-charcoal/45">
                07 + beyond
              </span>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
              {operations.map((o, i) => (
                <li
                  key={o.code}
                  data-cursor="hover"
                  className="group relative overflow-hidden rounded-md border border-brand-charcoal/20 bg-brand-paper p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-terracotta/60"
                >
                  {/* Inner faux stamp ring */}
                  <div className="pointer-events-none absolute inset-2 rounded-md border border-dashed border-brand-charcoal/15 transition-colors group-hover:border-brand-terracotta/40" />
                  <div className="relative">
                    <div className="font-display text-2xl font-light text-brand-terracotta md:text-3xl">
                      {o.code}
                    </div>
                    <div className="mt-1 font-display text-[13px] font-medium text-brand-ink">
                      {o.label}
                    </div>
                    <div className="mt-2 font-mono text-[9.5px] tracking-widest text-brand-charcoal/45">
                      EST · {o.year}
                    </div>
                    {/* Rotated "VISA" mini stamp on first cell */}
                    {i === 0 && (
                      <div className="absolute right-0 top-0 rotate-[-12deg]">
                        <div className="rounded-sm border border-brand-saffron/60 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-brand-saffron/80">
                          VISA-FREE
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* CONTACT — envelope */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 md:mt-20">
            {/* Floating polaroid accents */}
            <div className="pointer-events-none absolute left-2 top-6 hidden h-32 w-24 -rotate-6 rounded-sm bg-brand-paper p-1.5 pb-3 shadow-[0_8px_30px_-12px_rgba(20,15,10,0.25)] md:block">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={`/photos/${photos.canyon.src}`}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute right-2 top-12 hidden h-32 w-24 rotate-6 rounded-sm bg-brand-paper p-1.5 pb-3 shadow-[0_8px_30px_-12px_rgba(20,15,10,0.25)] md:block">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={`/photos/${photos.lake.src}`}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative mx-auto max-w-[760px] rounded-md border border-brand-charcoal/15 bg-brand-paper p-6 shadow-[0_30px_80px_-40px_rgba(20,15,10,0.3)] md:p-9">
              {/* Envelope flap (top triangle) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-px left-1/2 h-12 w-[60%] -translate-x-1/2 border-b border-brand-charcoal/15"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(176,75,47,0.05) 100%)",
                }}
              />

              <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                <span className="font-mono">Mail us</span>
                <span className="font-mono text-brand-terracotta">PAR AVION</span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3 md:gap-4">
                <div className="rounded-md border border-brand-charcoal/15 bg-white p-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                    Email
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block break-all font-display text-[14px] font-medium text-brand-ink hover:text-brand-terracotta"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="rounded-md border border-brand-charcoal/15 bg-white p-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                    WhatsApp · Telegram
                  </div>
                  <a
                    href={site.whatsapp}
                    className="mt-2 block font-display text-[14px] font-medium text-brand-ink hover:text-brand-terracotta"
                  >
                    {site.phone}
                  </a>
                </div>
                <div className="rounded-md border border-brand-charcoal/15 bg-white p-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                    Office · Astana
                  </div>
                  <div className="mt-2 text-[12.5px] leading-snug text-brand-ink">
                    {site.address}
                  </div>
                </div>
              </div>

              {/* Stamp in the corner */}
              <div className="pointer-events-none absolute bottom-4 right-4 rotate-[-8deg] md:bottom-6 md:right-6">
                <div className="rounded-sm border-2 border-brand-terracotta/70 px-2 py-1 font-mono text-[9px] tracking-widest text-brand-terracotta/80">
                  ASTANA · KAZ
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-light leading-none text-brand-ink md:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-[9.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
        {label}
      </div>
    </div>
  );
}
