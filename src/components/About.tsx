"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { AnimatedNumber } from "./AnimatedNumber";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const polaroids = [
  { src: "IMG_5616_2.jpg", caption: "Horse riding · Akmola", rotate: -4 },
  { src: "IMG_8742.jpg", caption: "Inside the yurt", rotate: 3 },
  { src: "IMG_2972.jpg", caption: "Karagandy · Karaganda", rotate: -2 },
  { src: "IMG_7140.jpg", caption: "Family table · Steppe", rotate: 5 },
];

// Approximate geographic positions on a 600×340 stylised Central Asia
// canvas (west → east, north → south). Numbers tuned visually, not GIS-grade.
type HelpTab = "tours" | "outdoor" | "retreats" | "logistics";
const helpTabs: { id: HelpTab; label: string; body: string }[] = [
  {
    id: "tours",
    label: "Tours & Trips",
    body:
      "Exceptional and fully customized tours, trips, adventures, and retreats across Kazakhstan and Central Asia. Whether you're looking for a one-day trip, a weekend getaway, or a multi-day cultural or nature-focused journey — we design every experience around your interests.",
  },
  {
    id: "outdoor",
    label: "Outdoor Activities",
    body:
      "A wide range of exciting outdoor activities — horse riding, archery, target shooting, cycling, camping, hiking, paragliding, skiing, snowboarding, and winter snow adventures — depending on the season and location.",
  },
  {
    id: "retreats",
    label: "Retreats & Off-sites",
    body:
      "Professional retreats and team-building programs — including corporate retreats, leadership and academic retreats, student and youth camps, and strategic off-site planning retreats for schools, universities, and organizations.",
  },
  {
    id: "logistics",
    label: "Travel Logistics",
    body:
      "We assist with flight bookings, reservations, and all necessary travel arrangements across Kazakhstan and Central Asia, so your experience is smooth and comfortable from door to door.",
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
                Founded for explorers,{" "}
                <span className="font-serif italic font-normal text-brand-terracotta">
                  by explorers.
                </span>
              </h2>
            </div>
            <div className="md:col-span-5 md:self-end">
              <p className="text-[13.5px] leading-relaxed text-brand-charcoal/65 md:text-[14px]">
                Ozge Tourism is a division of Ozge LTD, officially registered in
                2025 at the Astana International Financial Centre (AIFC),
                Kazakhstan. Founded with one mission: to help nature lovers and
                adventure seekers discover the very best of Central Asia.
              </p>
            </div>
          </div>
        </Reveal>

        {/* WHO WE ARE — editorial letterhead on left, polaroids on right */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-10">
            {/* Left — editorial intro, no ticket aesthetic */}
            <div className="relative md:col-span-7">
              <div className="rounded-md border border-brand-charcoal/12 bg-brand-paper p-8 md:p-12">
                {/* Letterhead */}
                <div className="flex items-baseline justify-between border-b border-brand-charcoal/12 pb-5">
                  <div>
                    <div className="font-display text-lg font-medium tracking-tight text-brand-ink">
                      Ozge Tourism
                    </div>
                    <div className="mt-0.5 text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                      A division of Ozge LTD · AIFC · Astana
                    </div>
                  </div>
                  <div className="hidden text-right text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/45 md:block">
                    Est. 2025
                  </div>
                </div>

                {/* Editorial body */}
                <h3 className="mt-7 font-serif text-2xl italic leading-snug text-brand-ink md:text-3xl">
                  &ldquo;We help nature lovers and adventure seekers experience
                  the very best of Kazakhstan and Central Asia — from majestic
                  landscapes and thrilling adventures to rich history and
                  vibrant cultures.&rdquo;
                </h3>

                <p className="mt-6 max-w-[58ch] text-[13.5px] leading-relaxed text-brand-charcoal/65 md:text-[14px]">
                  Our goal is to provide premium, safe, and meaningful travel
                  experiences, fully customized for individuals and solo
                  travelers, families and friends, groups and student
                  communities, organizations and teams, and international
                  guests.
                </p>

                {/* Single-line stats — typographic, no badges */}
                <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-brand-charcoal/12 pt-5">
                  <Stat label="Founded" value={<AnimatedNumber to={2025} duration={1500} />} />
                  <Divider />
                  <Stat label="Tours" value={<><AnimatedNumber to={100} duration={1400} />+</>} />
                  <Divider />
                  <Stat label="Countries" value={<><AnimatedNumber to={7} duration={1100} />+</>} />
                  <Divider />
                  <Stat label="Languages" value="EN · RU · KZ" />
                </div>

                {/* Signature line */}
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <div className="font-serif text-[26px] italic leading-none text-brand-ink md:text-[32px]">
                      Mohammad
                    </div>
                    <div className="mt-2 text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                      Founder · Ozge Tourism
                    </div>
                  </div>
                  <div className="text-right text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/45">
                    Mangilik El · Astana
                  </div>
                </div>
              </div>
            </div>

            {/* Right — polaroid wall */}
            <div className="relative md:col-span-5">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {polaroids.map((p, i) => (
                  <div
                    key={p.src}
                    style={{ transform: `rotate(${p.rotate}deg)` }}
                    className={cn(
                      "rounded-sm bg-brand-paper p-2 pb-4 shadow-[0_10px_30px_-12px_rgba(20,15,10,0.25)]",
                      i === 1 || i === 2 ? "mt-6" : ""
                    )}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-brand-mist">
                      <Image
                        src={`/photos/${p.src}`}
                        alt={p.caption}
                        fill
                        sizes="(min-width: 768px) 20vw, 45vw"
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

        {/* WHAT CAN WE HELP WITH — kept tabbed journal but lighter */}
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
                    <p className="mt-4 text-[13px] leading-relaxed text-brand-cream/65 md:text-[13.5px]">
                      {active.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WHERE WE OPERATE — small map + glass card grid */}
        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20">
            <div className="flex items-baseline justify-between text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
              <span>Where we operate</span>
              <span className="font-mono text-brand-charcoal/45">
                07 countries · &amp; beyond
              </span>
            </div>

            <WhereWeOperate />
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ────────────────────────── helpers ────────────────────────── */

function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-display text-xl font-light leading-none text-brand-ink md:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
        {label}
      </div>
    </div>
  );
}
function Divider() {
  return <span className="h-6 w-px bg-brand-charcoal/15" />;
}

/* ───────── Where we operate — small map + glass card grid ────────────────── */

const operatingCountries: {
  code: string;
  flag: string;
  name: string;
  capital: string;
  xPct: number; // dot position on the small map (% of container)
  yPct: number;
  hub?: boolean;
}[] = [
  { code: "KZ", flag: "kz", name: "Kazakhstan",   capital: "Astana",    xPct: 49.0, yPct: 29.3, hub: true },
  { code: "UZ", flag: "uz", name: "Uzbekistan",   capital: "Tashkent",  xPct: 49.0, yPct: 47.3 },
  { code: "KG", flag: "kg", name: "Kyrgyzstan",   capital: "Bishkek",   xPct: 67.6, yPct: 46.7 },
  { code: "TJ", flag: "tj", name: "Tajikistan",   capital: "Dushanbe",  xPct: 60.8, yPct: 54.9 },
  { code: "TM", flag: "tm", name: "Turkmenistan", capital: "Ashgabat",  xPct: 34.4, yPct: 52.5 },
  { code: "AF", flag: "af", name: "Afghanistan",  capital: "Kabul",     xPct: 54.4, yPct: 65.7 },
  { code: "IR", flag: "ir", name: "Iran",         capital: "Tehran",    xPct: 23.5, yPct: 70.2 },
];

function WhereWeOperate() {
  const [svg, setSvg] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/world-ca.svg")
      .then((r) => r.text())
      .then((t) => {
        if (!cancelled) setSvg(t);
      })
      .catch(() => {
        if (!cancelled) setSvg("");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-5">
      {/* Map + cards live in a single subtle panel */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-charcoal/10 bg-gradient-to-br from-brand-mist/50 via-brand-mist/30 to-brand-paper p-5 md:p-8">
        {/* Style scope: only this map's paths */}
        <style jsx global>{`
          .ozge-where-map svg {
            width: 100%;
            height: auto;
            display: block;
            overflow: visible;
          }
          .ozge-where-map .op {
            fill: #efe7d6;
            stroke: rgba(26, 20, 16, 0.18);
            stroke-width: 0.35;
            stroke-linejoin: round;
            stroke-linecap: round;
            transition: fill 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .ozge-where-map .op.kz { fill: #e8c98a; }
          .ozge-where-map.hover-kz .op.kz,
          .ozge-where-map.hover-uz .op.uz,
          .ozge-where-map.hover-kg .op.kg,
          .ozge-where-map.hover-tj .op.tj,
          .ozge-where-map.hover-tm .op.tm,
          .ozge-where-map.hover-af .op.af,
          .ozge-where-map.hover-ir .op.ir {
            fill: #e0a039;
          }
        `}</style>

        {/* Small map on top */}
        <div className="mx-auto max-w-[460px]">
          <div
            className={cn(
              "ozge-where-map relative",
              hover ? `hover-${hover.toLowerCase()}` : ""
            )}
          >
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} aria-hidden="true" />
            ) : (
              <div className="flex aspect-[1.38] items-center justify-center text-[11px] uppercase tracking-[0.28em] text-brand-charcoal/40">
                Loading map…
              </div>
            )}

            {/* Tiny dots over the map — no text, no overlap */}
            <div className="pointer-events-none absolute inset-0">
              {operatingCountries.map((c) => (
                <span
                  key={c.code}
                  className="absolute"
                  style={{ left: `${c.xPct}%`, top: `${c.yPct}%` }}
                >
                  <span
                    className={cn(
                      "block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 transition-all duration-500",
                      hover === c.code
                        ? "h-2.5 w-2.5 bg-brand-saffron ring-brand-saffron/30"
                        : c.hub
                        ? "bg-brand-terracotta ring-brand-terracotta/30"
                        : "bg-brand-ink ring-brand-ink/20"
                    )}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Tiny inline legend */}
          <div className="mt-3 flex justify-center gap-4 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
              Hub
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-ink" />
              Operating
            </span>
          </div>
        </div>

        {/* Glass-effect country cards */}
        <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4">
          {operatingCountries.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onMouseEnter={() => setHover(c.code)}
                onMouseLeave={() => setHover((h) => (h === c.code ? null : h))}
                onFocus={() => setHover(c.code)}
                onBlur={() => setHover((h) => (h === c.code ? null : h))}
                className={cn(
                  "group relative flex h-full w-full items-center gap-3 overflow-hidden rounded-md border p-3.5 text-left backdrop-blur-md transition-all duration-500",
                  "border-white/55 bg-white/45 hover:border-brand-terracotta/45 hover:bg-white/65",
                  // Subtle ring on the hub
                  c.hub && "ring-1 ring-brand-terracotta/35 ring-offset-1 ring-offset-brand-paper/40"
                )}
                aria-label={`${c.name} · capital ${c.capital}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/flags/${c.flag}.svg`}
                  alt=""
                  className="h-7 w-10 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-brand-terracotta">
                      {c.code}
                    </span>
                    {c.hub && (
                      <span className="rounded-full bg-brand-terracotta/10 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-brand-terracotta">
                        Hub
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate font-display text-[14.5px] font-medium leading-snug text-brand-ink">
                    {c.name}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-brand-charcoal/60">
                    {c.capital}
                  </div>
                </div>
              </button>
            </li>
          ))}

          {/* "& beyond" trailing card */}
          <li>
            <div className="flex h-full items-center justify-center rounded-md border border-dashed border-brand-charcoal/30 bg-white/30 p-3.5 text-center backdrop-blur-md">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-brand-charcoal/50">
                  +
                </div>
                <div className="mt-1 font-display text-[14.5px] font-medium text-brand-charcoal/70">
                  &amp; beyond
                </div>
                <div className="mt-0.5 text-[11px] text-brand-charcoal/50">
                  on request
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

