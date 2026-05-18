"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { regions, regionViewBox, type Region } from "@/data/regions";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

// ─────────────── Country definitions ─────────────────────────────────────

type Country = {
  code: string;
  name: string;
  photo: string;
  photoPos?: string;
  blurb: string;
  highlights: string[];
  /** When true, tapping this country drills into the 20-region SVG map */
  hasRegions?: boolean;
};

const countries: Country[] = [
  {
    code: "KZ",
    name: "Kazakhstan",
    photo: "IMG_2600_3.jpg",
    photoPos: "center 15%",
    blurb:
      "Twenty regions, every landscape — from Mangystau's surreal chalk desert to the Tian Shan's alpine lakes.",
    highlights: ["Burabay", "Mangystau", "Charyn", "Altai"],
    hasRegions: true,
  },
  {
    code: "UZ",
    name: "Uzbekistan",
    photo: "IMG_6919.jpg",
    photoPos: "center 25%",
    blurb:
      "Silk Road jewels — Samarkand's azure tiles, Bukhara's caravanserais, Khiva's walled old town, Tashkent's pulse.",
    highlights: ["Samarkand", "Bukhara", "Khiva", "Tashkent"],
  },
  {
    code: "KG",
    name: "Kyrgyzstan",
    photo: "IMG_2799.jpg",
    photoPos: "center 18%",
    blurb:
      "Yurts, alpine lakes and nomadic life — Issyk-Kul, Song-Kul and the wide-open Tian Shan.",
    highlights: ["Issyk-Kul", "Song-Kul", "Tian Shan", "Bishkek"],
  },
  {
    code: "TJ",
    name: "Tajikistan",
    photo: "IMG_3873.jpg",
    photoPos: "center 12%",
    blurb:
      "The Pamir Highway — the world's most spectacular high-altitude road trip — plus the turquoise Iskanderkul.",
    highlights: ["Pamir Hwy", "Wakhan", "Iskanderkul", "Dushanbe"],
  },
  {
    code: "TM",
    name: "Turkmenistan",
    photo: "IMG_3858.jpg",
    photoPos: "center 8%",
    blurb:
      "White-marble Ashgabat, ancient Merv, and the eternal Door to Hell flame in the Karakum desert.",
    highlights: ["Ashgabat", "Merv", "Karakum", "Darvaza"],
  },
  {
    code: "AF",
    name: "Afghanistan",
    photo: "IMG_8134.jpg",
    photoPos: "center 15%",
    blurb:
      "Wakhan corridor, the impossibly blue lakes of Band-e-Amir, the cliffs of Bamiyan.",
    highlights: ["Wakhan", "Band-e-Amir", "Bamiyan"],
  },
  {
    code: "IR",
    name: "Iran",
    photo: "IMG_1751.jpg",
    photoPos: "center 30%",
    blurb:
      "Isfahan's tiled mosques, Persepolis ruins, Yazd's adobe alleys, the lively pulse of Tehran.",
    highlights: ["Isfahan", "Persepolis", "Yazd", "Tehran"],
  },
];

// ─────────────── Component ───────────────────────────────────────────────

export function InteractiveMap() {
  const [activeCode, setActiveCode] = useState<string>("KZ");
  const active = countries.find((c) => c.code === activeCode) ?? countries[0];
  const tabsRef = useRef<HTMLDivElement>(null);

  // Keep the active country's tab in view on mobile
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(
      `[data-tab="${activeCode}"]`
    );
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCode]);

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-brand-ink py-24 text-brand-cream md:py-36"
    >
      {/* Subtle saffron radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
              <span className="h-[1px] w-8 bg-brand-saffron/60" />
              Discover Central Asia
            </span>
            <h2 className="fluid-h2 mt-5 font-display font-light">
              Seven countries.{" "}
              <span className="font-serif italic font-normal text-brand-saffron">
                One journey.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="fluid-lead text-brand-cream/75">
                Tap a country to zoom in. Kazakhstan opens up into all twenty
                of its regions.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Country tabs — scale up on active */}
        <div
          ref={tabsRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 md:mt-14 md:gap-4"
        >
          {countries.map((c) => {
            const isActive = c.code === activeCode;
            const isOther = activeCode && c.code !== activeCode;
            return (
              <motion.button
                key={c.code}
                data-tab={c.code}
                type="button"
                onClick={() => setActiveCode(c.code)}
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.55,
                }}
                whileHover={!isActive ? { opacity: 0.85, scale: 0.96 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative h-[160px] w-[44vw] shrink-0 snap-center overflow-hidden rounded-md border text-left transition-colors duration-500 md:h-[200px] md:w-[200px]",
                  isActive
                    ? "border-brand-saffron/70"
                    : "border-brand-cream/15"
                )}
              >
                <Image
                  src={`/photos/${c.photo}`}
                  alt={c.name}
                  fill
                  sizes="(min-width: 768px) 200px, 50vw"
                  className="object-cover"
                  style={{ objectPosition: c.photoPos ?? "center" }}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-gradient-to-t from-brand-ink/85 via-brand-ink/15 to-transparent"
                      : "bg-brand-ink/55"
                  )}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-brand-saffron">
                      {c.code}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeTabDot"
                        className="h-2 w-2 rounded-full bg-brand-saffron"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-display text-lg font-light leading-tight text-brand-cream md:text-xl">
                      {c.name}
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-1 text-[10px] uppercase tracking-[0.32em] text-brand-saffron"
                      >
                        Selected
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active country content — switches between KZ regions map and country card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 md:mt-12"
          >
            {active.hasRegions ? (
              <KazakhstanRegionsMap />
            ) : (
              <CountryDetail country={active} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────── Kazakhstan regions sub-component ─────────────────────────

function KazakhstanRegionsMap() {
  const [active, setActive] = useState<Region | null>(null);
  const [pinned, setPinned] = useState<Region | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile && !pinned) {
      const a = regions.find((r) => r.id === "KZ19") ?? regions[0];
      setPinned(a);
    }
  }, [isMobile, pinned]);

  const display = active ?? pinned;
  const ordered = useMemo(
    () => [...regions].sort((a, b) => b.d.length - a.d.length),
    []
  );

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div ref={wrapRef} onMouseMove={handleMove} className="relative lg:col-span-8">
        <div className="relative rounded-md border border-brand-cream/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-3 md:p-6 backdrop-blur">
          <div className="mb-3 flex items-baseline justify-between md:mb-5">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
              Kazakhstan · 20 regions
            </div>
            <div className="font-mono text-[10.5px] tracking-widest text-brand-cream/55">
              Hover or tap a region
            </div>
          </div>
          <svg
            viewBox={regionViewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-auto"
            role="img"
            aria-label="Interactive map of Kazakhstan"
          >
            <defs>
              <filter id="glow-kz">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              {ordered.map((r) => {
                const isActive = display?.id === r.id;
                return (
                  <path
                    key={r.id}
                    d={r.d}
                    className={cn(
                      "transition-all duration-500 ease-smooth cursor-pointer",
                      "focus:outline-none focus-visible:outline-none",
                      "[-webkit-tap-highlight-color:transparent]"
                    )}
                    style={{
                      fill: isActive ? "#e0a039" : "rgba(245, 236, 220, 0.92)",
                      stroke: "#1a1410",
                      strokeWidth: 0.6,
                      filter: isActive ? "url(#glow-kz)" : "none",
                      outline: "none",
                    }}
                    onMouseEnter={() => setActive(r)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setPinned(r)}
                    onFocus={() => setActive(r)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={r.name}
                  >
                    <title>{r.name}</title>
                  </path>
                );
              })}
            </g>
          </svg>

          <AnimatePresence>
            {!isMobile && active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  left: Math.min(pointer.x + 18, (wrapRef.current?.clientWidth ?? 0) - 320),
                  top: Math.max(pointer.y - 12, 0),
                }}
                className="pointer-events-none absolute z-10 w-[300px] rounded-md border border-brand-cream/15 bg-brand-ink/95 p-4 shadow-2xl backdrop-blur"
              >
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                  {active.id}
                </div>
                <div className="mt-1 font-display text-xl font-light text-brand-cream">
                  {active.name}
                </div>
                <p className="mt-2 text-[13px] leading-snug text-brand-cream/75">
                  {active.blurb}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side detail */}
      <div className="lg:col-span-4">
        <div className="sticky top-28 rounded-md border border-brand-cream/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
          <AnimatePresence mode="wait">
            <motion.div
              key={display?.id ?? "empty"}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {display ? (
                <>
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                    Region · {display.id}
                  </div>
                  <div className="mt-3 font-display text-3xl font-light text-brand-cream">
                    {display.name}
                  </div>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-brand-cream/75">
                    {display.blurb}
                  </p>
                  {display.highlights.length > 0 && (
                    <div className="mt-6">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
                        Highlights
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {display.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-full border border-brand-cream/15 px-3 py-1.5 text-[12px] text-brand-cream/85"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href="#book"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-saffron hover:text-brand-cream transition-colors"
                  >
                    Plan a trip here
                    <span>→</span>
                  </a>
                </>
              ) : (
                <div className="text-brand-cream/70 text-sm">
                  Hover a region on the map to discover its story.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile chips */}
      <div className="mt-2 lg:hidden lg:col-span-12">
        <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
          Or jump straight to a region
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setPinned(r)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11.5px] transition",
                pinned?.id === r.id
                  ? "border-brand-saffron bg-brand-saffron text-brand-ink"
                  : "border-brand-cream/20 text-brand-cream/80 hover:border-brand-cream/50"
              )}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────── Country detail sub-component ─────────────────────────────

function CountryDetail({ country }: { country: Country }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      {/* Big photo with overlaid country code */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-md lg:col-span-8 lg:aspect-auto lg:min-h-[480px]">
        <Image
          src={`/photos/${country.photo}`}
          alt={country.name}
          fill
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="object-cover"
          style={{ objectPosition: country.photoPos ?? "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-ink/75 via-brand-ink/20 to-transparent" />
        <div className="absolute left-6 top-6 md:left-8 md:top-8">
          <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
            Operating in
          </div>
          <div className="mt-2 font-display text-[80px] font-light leading-none text-brand-cream md:text-[140px]">
            {country.code}
          </div>
          <div className="mt-3 font-display text-2xl font-light text-brand-cream md:text-3xl">
            {country.name}
          </div>
        </div>
      </div>

      {/* Detail card */}
      <div className="lg:col-span-4">
        <div className="rounded-md border border-brand-cream/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur">
          <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
            What we cover
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-brand-cream/80">
            {country.blurb}
          </p>

          <div className="mt-7">
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
              Highlights
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {country.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-brand-cream/15 px-3 py-1.5 text-[12px] text-brand-cream/85"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#book"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-saffron px-5 py-2.5 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
          >
            Plan a trip to {country.name}
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setM(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return m;
}
