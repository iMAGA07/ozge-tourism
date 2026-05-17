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
const countries = [
  { code: "KZ", name: "Kazakhstan",   x: 350, y: 100, big: true },
  { code: "UZ", name: "Uzbekistan",   x: 280, y: 215 },
  { code: "TM", name: "Turkmenistan", x: 215, y: 235 },
  { code: "KG", name: "Kyrgyzstan",   x: 440, y: 195 },
  { code: "TJ", name: "Tajikistan",   x: 410, y: 245 },
  { code: "AF", name: "Afghanistan",  x: 330, y: 290 },
  { code: "IR", name: "Iran",         x: 130, y: 280 },
];

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

        {/* WHERE WE OPERATE — stylised Central Asia map */}
        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20">
            <div className="flex items-baseline justify-between text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
              <span>Where we operate</span>
              <span className="font-mono text-brand-charcoal/45">
                07 countries · &amp; beyond
              </span>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-md border border-brand-charcoal/12 bg-brand-mist/40 p-4 md:p-6">
              <CentralAsiaMap />
            </div>

            {/* Country chips below the map */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {countries.map((c) => (
                <li
                  key={c.code}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-charcoal/15 bg-brand-paper px-3 py-1.5 text-[12px] text-brand-charcoal/80"
                >
                  <span className="font-mono text-[10.5px] tracking-widest text-brand-terracotta">
                    {c.code}
                  </span>
                  {c.name}
                </li>
              ))}
              <li className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-charcoal/30 px-3 py-1.5 text-[12px] text-brand-charcoal/60">
                <span className="font-mono text-[10.5px] tracking-widest text-brand-charcoal/50">
                  +
                </span>
                &amp; beyond
              </li>
            </ul>
          </div>
        </Reveal>

        {/* CONTACT — Air Mail envelope with letter inside, polaroids around */}
        <Reveal delay={0.1}>
          <div className="relative mt-20 md:mt-28">
            <AirMailEnvelope />
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

/* ───────── Real world map (Central Asia highlight) ───────── */

// Markers calibrated to the Equirectangular world SVG (1000×500 viewBox).
// x = (lon + 180) / 360 * 1000, y = (90 - lat) / 180 * 500
const cityMarkers = [
  { code: "KZ", name: "Kazakhstan",   x: 697, y: 108, hub: true },
  { code: "UZ", name: "Uzbekistan",   x: 691, y: 136 },
  { code: "KG", name: "Kyrgyzstan",   x: 708, y: 133 },
  { code: "TJ", name: "Tajikistan",   x: 688, y: 144 },
  { code: "TM", name: "Turkmenistan", x: 661, y: 144 },
  { code: "AF", name: "Afghanistan",  x: 691, y: 155 },
  { code: "IR", name: "Iran",         x: 641, y: 152 },
];

function CentralAsiaMap() {
  const [svg, setSvg] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/world.svg")
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

  // Crop the world map to focus on Eurasia (still recognizable as a real
  // world map, but Central Asia is the visual center).
  // Original viewBox is "0 0 1000 500"; we use "viewBox" on the wrapper SVG.
  const cropViewBox = "470 30 380 240";

  return (
    <div className="relative">
      {/* Live styles override the base path color and highlight our 7 countries */}
      <style jsx global>{`
        .ozge-world svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .ozge-world .c {
          fill: #efe7d6;
          stroke: #fbf8f1;
          stroke-width: 0.3;
          transition: fill 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ozge-world .kz,
        .ozge-world .uz,
        .ozge-world .kg,
        .ozge-world .tj,
        .ozge-world .tm,
        .ozge-world .af,
        .ozge-world .ir {
          fill: #d99a5a;
        }
        .ozge-world .kz {
          fill: #b14a2e;
        }
      `}</style>

      <div className="relative aspect-[19/12] w-full overflow-hidden rounded-md bg-brand-mist/60">
        {/* Subtle dot grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(26,20,16,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* The world map itself */}
        <div className="absolute inset-0 flex items-center justify-center">
          {svg ? (
            <div
              className="ozge-world w-full"
              dangerouslySetInnerHTML={{
                __html: svg.replace(
                  /viewBox="[^"]*"/,
                  `viewBox="${cropViewBox}"`
                ),
              }}
              aria-hidden="true"
            />
          ) : (
            <div className="text-[11px] uppercase tracking-[0.28em] text-brand-charcoal/40">
              Loading map…
            </div>
          )}
        </div>

        {/* Marker overlay — separate SVG sized to match cropped viewBox */}
        <svg
          viewBox={cropViewBox}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* Routes — KZ to every other country */}
          {cityMarkers
            .filter((m) => m.code !== "KZ")
            .map((m) => (
              <line
                key={`route-${m.code}`}
                x1={cityMarkers[0].x}
                y1={cityMarkers[0].y}
                x2={m.x}
                y2={m.y}
                stroke="rgba(176,75,47,0.45)"
                strokeWidth="0.4"
                strokeDasharray="1.2 2"
              />
            ))}

          {cityMarkers.map((m) => {
            const isHover = hover === m.code;
            const r = m.hub ? 2.6 : 1.8;
            return (
              <g
                key={m.code}
                onMouseEnter={() => setHover(m.code)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                {/* halo */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={r + (isHover ? 5 : 3)}
                  fill={isHover ? "rgba(224,160,57,0.35)" : "rgba(224,160,57,0.18)"}
                  className="transition-all duration-500"
                />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={r}
                  fill={m.hub ? "#b14a2e" : "#1a1410"}
                  stroke="#fbf8f1"
                  strokeWidth="0.6"
                />
                <text
                  x={m.x}
                  y={m.y + r + 4.2}
                  textAnchor="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize={m.hub ? 4.4 : 3.6}
                  letterSpacing="0.12em"
                  fill="rgba(26,20,16,0.85)"
                >
                  {m.code}
                </text>
                {isHover && (
                  <g>
                    <rect
                      x={m.x - m.name.length * 1.4}
                      y={m.y - r - 9.5}
                      width={m.name.length * 2.8}
                      height={6}
                      rx={1}
                      fill="#1a1410"
                    />
                    <text
                      x={m.x}
                      y={m.y - r - 5}
                      textAnchor="middle"
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fontSize="4"
                      fill="#fbf8f1"
                      fontWeight="500"
                    >
                      {m.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Top-left legend */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 rounded-sm bg-brand-paper/85 px-3 py-2 backdrop-blur">
          <div className="text-[9.5px] uppercase tracking-[0.32em] text-brand-charcoal/55">
            Where we operate
          </div>
          <div className="flex items-center gap-3 text-[10.5px] text-brand-ink">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-terracotta" />
              Hub
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-ink" />
              Operating
            </span>
          </div>
        </div>

        {/* Bottom-right caption */}
        <div className="absolute bottom-3 right-3 rounded-sm bg-brand-paper/85 px-2.5 py-1 font-mono text-[9.5px] tracking-widest text-brand-charcoal/55 backdrop-blur">
          ASIA · EQUIRECTANGULAR
        </div>
      </div>
    </div>
  );
}

/* ───────── Air-mail envelope ───────── */

function AirMailEnvelope() {
  // Two extra polaroid props to scatter around the envelope
  const accents = [
    { src: photos.canyon.src, top: -30, left: -20, rotate: -10, caption: "Hidden canyon" },
    { src: photos.lake.src,    top: -10, right: -30, rotate: 8,  caption: "Mountain lake" },
    { src: photos.steppe.src,  bottom: -30, left: -10, rotate: 6, caption: "Open steppe" },
    { src: photos.yurt.src,    bottom: -20, right: -30, rotate: -8, caption: "Inside the yurt" },
  ] as const;

  return (
    <div className="relative mx-auto max-w-[820px]">
      {/* Floating polaroids around the envelope */}
      {accents.map((a, i) => (
        <div
          key={i}
          style={{
            top: "top" in a ? a.top : undefined,
            left: "left" in a ? a.left : undefined,
            right: "right" in a ? a.right : undefined,
            bottom: "bottom" in a ? a.bottom : undefined,
            transform: `rotate(${a.rotate}deg)`,
          }}
          className="pointer-events-none absolute hidden h-32 w-24 rounded-sm bg-brand-paper p-1.5 pb-3 shadow-[0_12px_36px_-14px_rgba(20,15,10,0.35)] md:block"
        >
          <div className="relative h-full w-full overflow-hidden bg-brand-mist">
            <Image
              src={`/photos/${a.src}`}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* Paper plane top-right */}
      <svg
        viewBox="0 0 80 30"
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-4 hidden h-8 w-20 text-brand-terracotta md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 28 C 18 12, 38 6, 62 8" strokeDasharray="2 3" />
        <path d="M58 2 L72 10 L58 14 L60 10 Z" fill="currentColor" />
      </svg>

      {/* Envelope card */}
      <div className="relative overflow-hidden rounded-md bg-brand-paper shadow-[0_30px_80px_-40px_rgba(20,15,10,0.4)]">
        {/* Air-mail diagonal stripes border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md"
          style={{
            padding: "10px",
            background:
              "repeating-linear-gradient(45deg, #b14a2e 0 10px, transparent 10px 20px, #1f3a8a 20px 30px, transparent 30px 40px)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: 0.55,
          }}
        />

        <div className="relative grid gap-8 p-7 md:grid-cols-12 md:gap-10 md:p-12">
          {/* Left — the letter */}
          <div className="md:col-span-7">
            {/* Letter header */}
            <div className="flex items-baseline justify-between border-b border-brand-charcoal/10 pb-3 text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
              <span className="font-mono">Par Avion · Air Mail</span>
              <span className="font-mono text-brand-terracotta">
                ASTANA · KZ
              </span>
            </div>

            <div className="mt-5 font-serif text-2xl italic leading-tight text-brand-ink md:text-3xl">
              Dear traveler,
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-brand-charcoal/70 md:text-[14px]">
              Tell us the kind of adventure you&apos;re dreaming of, and
              we&apos;ll take care of the rest — from the first flight to the
              last yurt. Reach us any time:
            </p>

            {/* Contact lines */}
            <dl className="mt-5 grid gap-3 text-[13.5px] text-brand-ink">
              <div className="flex items-baseline gap-3">
                <dt className="w-16 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium hover:text-brand-terracotta"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="w-16 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                  Phone
                </dt>
                <dd>
                  <a
                    href={site.whatsapp}
                    className="font-medium hover:text-brand-terracotta"
                  >
                    {site.phone}
                  </a>
                  <span className="ml-2 text-[11.5px] text-brand-charcoal/55">
                    WhatsApp · Telegram
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="w-16 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                  Office
                </dt>
                <dd className="leading-snug">{site.address}</dd>
              </div>
            </dl>

            {/* Signature */}
            <div className="mt-7 flex items-end justify-between">
              <div>
                <div className="font-serif text-[24px] italic leading-none text-brand-ink md:text-[28px]">
                  Mohammad
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                  Founder · Ozge Tourism
                </div>
              </div>
              <a
                href="#book"
                data-cursor="hover"
                className="hidden items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-[12.5px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta sm:inline-flex"
              >
                Write back
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right — stamp wall */}
          <div className="relative md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
              Postage
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {/* Stamp 1 — round customs */}
              <div className="col-span-1 flex h-24 items-center justify-center rounded-md border border-brand-charcoal/15 bg-brand-paper">
                <div className="flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border-[2px] border-brand-terracotta/70 text-center font-mono text-[8px] uppercase tracking-widest text-brand-terracotta/85">
                  <span>Ozge</span>
                  <span>2025</span>
                  <span>KZ</span>
                </div>
              </div>
              {/* Stamp 2 — rectangular value */}
              <div className="col-span-2 rounded-md border border-brand-charcoal/15 bg-brand-mist p-3">
                <div className="flex h-full items-end justify-between">
                  <div>
                    <div className="font-display text-3xl font-light leading-none text-brand-terracotta md:text-4xl">
                      ∞
                    </div>
                    <div className="mt-2 text-[9.5px] uppercase tracking-widest text-brand-charcoal/60">
                      Anytime
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[9px] tracking-widest text-brand-charcoal/55">
                      OZGE
                    </div>
                    <div className="font-mono text-[9px] tracking-widest text-brand-charcoal/55">
                      AIRMAIL
                    </div>
                  </div>
                </div>
              </div>
              {/* Stamp 3 — wide value */}
              <div className="col-span-2 rounded-md border border-brand-charcoal/15 bg-brand-ink p-3 text-brand-cream">
                <div className="flex h-full items-end justify-between">
                  <div>
                    <div className="font-display text-2xl font-light leading-none text-brand-saffron md:text-3xl">
                      24 / 7
                    </div>
                    <div className="mt-1.5 text-[9.5px] uppercase tracking-widest text-brand-cream/60">
                      On-call
                    </div>
                  </div>
                  <div className="text-right text-[9px] uppercase tracking-widest text-brand-cream/55">
                    Concierge
                  </div>
                </div>
              </div>
              {/* Stamp 4 — postmark */}
              <div className="col-span-1 flex h-20 items-center justify-center rounded-md border border-brand-charcoal/15 bg-brand-paper">
                <div className="rotate-[-12deg] rounded-sm border border-brand-saffron px-2 py-1 font-mono text-[9px] tracking-widest text-brand-saffron">
                  VISA-FREE
                </div>
              </div>
            </div>

            {/* Tiny route line */}
            <svg
              viewBox="0 0 200 30"
              className="mt-5 h-6 w-full text-brand-charcoal/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M5 25 C 50 5, 120 5, 180 22" strokeDasharray="2 4" />
              <circle cx="5" cy="25" r="2" fill="#b14a2e" stroke="none" />
              <circle cx="180" cy="22" r="2" fill="#b14a2e" stroke="none" />
            </svg>
            <div className="mt-1 flex justify-between text-[9px] uppercase tracking-widest text-brand-charcoal/55">
              <span>YOU</span>
              <span>OZGE · ASTANA</span>
            </div>

            <a
              href="#book"
              data-cursor="hover"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-[12.5px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta sm:hidden"
            >
              Write back
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
