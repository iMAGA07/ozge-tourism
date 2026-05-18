"use client";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions, regionViewBox, type Region } from "@/data/regions";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

// ─────────────── Country metadata ─────────────────────────────────────────

type Country = {
  code: "KZ" | "UZ" | "KG" | "TJ" | "TM" | "AF" | "IR";
  name: string;
  blurb: string;
  highlights: string[];
  hasRegions?: boolean;
};

const countries: Country[] = [
  {
    code: "KZ",
    name: "Kazakhstan",
    blurb:
      "Twenty regions, every landscape — from Mangystau's surreal chalk desert to the Tian Shan's alpine lakes.",
    highlights: ["Burabay", "Mangystau", "Charyn", "Altai"],
    hasRegions: true,
  },
  {
    code: "UZ",
    name: "Uzbekistan",
    blurb:
      "Silk Road jewels — Samarkand's azure tiles, Bukhara's caravanserais, Khiva's walled old town.",
    highlights: ["Samarkand", "Bukhara", "Khiva", "Tashkent"],
  },
  {
    code: "KG",
    name: "Kyrgyzstan",
    blurb:
      "Yurts, alpine lakes and nomadic life — Issyk-Kul, Song-Kul and the wide-open Tian Shan.",
    highlights: ["Issyk-Kul", "Song-Kul", "Tian Shan", "Bishkek"],
  },
  {
    code: "TJ",
    name: "Tajikistan",
    blurb:
      "The Pamir Highway — the world's most spectacular high-altitude road trip — plus the turquoise Iskanderkul.",
    highlights: ["Pamir Hwy", "Wakhan", "Iskanderkul", "Dushanbe"],
  },
  {
    code: "TM",
    name: "Turkmenistan",
    blurb:
      "White-marble Ashgabat, ancient Merv, and the eternal Door to Hell flame in the Karakum desert.",
    highlights: ["Ashgabat", "Merv", "Karakum", "Darvaza"],
  },
  {
    code: "AF",
    name: "Afghanistan",
    blurb:
      "Wakhan corridor, the impossibly blue lakes of Band-e-Amir, the cliffs of Bamiyan.",
    highlights: ["Wakhan", "Band-e-Amir", "Bamiyan"],
  },
  {
    code: "IR",
    name: "Iran",
    blurb:
      "Isfahan's tiled mosques, Persepolis ruins, Yazd's adobe alleys, Tehran's pulse.",
    highlights: ["Isfahan", "Persepolis", "Yazd", "Tehran"],
  },
];

const countryByCode = Object.fromEntries(countries.map((c) => [c.code, c]));

// ─────────────── Top-level component ──────────────────────────────────────

export function InteractiveMap() {
  // "world" = pick a country by clicking on the map.
  // "kz" = drilled into Kazakhstan to explore its 20 regions.
  const [view, setView] = useState<"world" | "kz">("world");
  const [activeCode, setActiveCode] = useState<Country["code"]>("KZ");

  const active = countryByCode[activeCode];

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-brand-ink py-24 text-brand-cream md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
              <span className="h-[1px] w-8 bg-brand-saffron/60" />
              {view === "kz" ? "Discover Kazakhstan" : "Discover Central Asia"}
            </span>
            <h2 className="fluid-h2 mt-5 font-display font-light">
              {view === "kz" ? (
                <>
                  Twenty regions.{" "}
                  <span className="font-serif italic font-normal text-brand-saffron">
                    One country.
                  </span>
                </>
              ) : (
                <>
                  Seven countries.{" "}
                  <span className="font-serif italic font-normal text-brand-saffron">
                    Tap to explore.
                  </span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <AnimatePresence mode="wait">
              {view === "kz" ? (
                <motion.button
                  key="back-cta"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  type="button"
                  onClick={() => setView("world")}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-cream/30 px-4 py-2 text-[12.5px] text-brand-cream/85 transition-colors hover:border-brand-cream/60 hover:text-brand-cream"
                >
                  <span>←</span> Back to Central Asia
                </motion.button>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-[13.5px] text-brand-cream/70 md:text-[14px]">
                    Click any highlighted country on the map. Kazakhstan opens
                    into all twenty of its regions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            {view === "world" ? (
              <motion.div
                key="world"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorldView
                  activeCode={activeCode}
                  active={active}
                  onPick={setActiveCode}
                  onDrillKZ={() => setView("kz")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="kz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <KazakhstanRegionsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─────────────── World view (the actual clickable Central Asia map) ──────

function WorldView({
  activeCode,
  active,
  onPick,
  onDrillKZ,
}: {
  activeCode: Country["code"];
  active: Country;
  onPick: (code: Country["code"]) => void;
  onDrillKZ: () => void;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Crop the equirectangular world to Central Asia + immediate neighbours.
  const cropViewBox = "550 60 280 200";

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

  // Single delegated handler — clicks/hovers on any path with data-code set
  // the active country.
  const onDelegated = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      const t = e.target as Element | null;
      if (!t || !t.getAttribute) return;
      const code = t.getAttribute("data-code") as Country["code"] | null;
      if (code && code !== activeCode) onPick(code);
    },
    [activeCode, onPick]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Map */}
      <div ref={wrapRef} className="relative lg:col-span-8">
        <div className="relative overflow-hidden rounded-md border border-brand-cream/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 md:p-6">
          <div className="mb-3 flex items-baseline justify-between md:mb-5">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
              Operating in
            </div>
            <div className="font-mono text-[10.5px] tracking-widest text-brand-cream/55">
              {countries.length} countries · click to pick
            </div>
          </div>

          {/* Map CSS — styles every country, brightens operating ones, and
              switches the active country to saffron. Hover state included. */}
          <style jsx global>{`
            .ozge-cmap svg {
              display: block;
              width: 100%;
              height: auto;
            }
            .ozge-cmap .c {
              fill: rgba(245, 236, 220, 0.10);
              stroke: rgba(255, 255, 255, 0.12);
              stroke-width: 0.35;
              transition: fill 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.45s cubic-bezier(0.22, 1, 0.36, 1);
              outline: none;
              -webkit-tap-highlight-color: transparent;
            }
            .ozge-cmap .op {
              fill: rgba(245, 236, 220, 0.85);
              cursor: pointer;
            }
            .ozge-cmap .op:hover {
              fill: rgba(224, 160, 57, 0.85);
            }
            .ozge-cmap.active-kz .kz,
            .ozge-cmap.active-uz .uz,
            .ozge-cmap.active-kg .kg,
            .ozge-cmap.active-tj .tj,
            .ozge-cmap.active-tm .tm,
            .ozge-cmap.active-af .af,
            .ozge-cmap.active-ir .ir {
              fill: #e0a039;
              filter: drop-shadow(0 0 6px rgba(224, 160, 57, 0.5));
            }
          `}</style>

          <div
            className={cn(
              "ozge-cmap relative",
              `active-${activeCode.toLowerCase()}`
            )}
            onClick={onDelegated}
            onPointerMove={onDelegated}
            onTouchEnd={onDelegated}
            role="application"
            aria-label="Clickable map of Central Asia"
          >
            {svg ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: svg.replace(
                    /viewBox="[^"]*"/,
                    `viewBox="${cropViewBox}"`
                  ),
                }}
              />
            ) : (
              <div className="flex aspect-[14/10] items-center justify-center text-[11px] uppercase tracking-[0.28em] text-brand-cream/40">
                Loading map…
              </div>
            )}

            {/* Floating country labels over each operating country */}
            <CountryLabels active={activeCode} />
          </div>

          {/* Bottom legend / mobile chip selector */}
          <div className="mt-5 flex flex-wrap gap-2">
            {countries.map((c) => {
              const isActive = c.code === activeCode;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => onPick(c.code)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] transition-all",
                    isActive
                      ? "border-brand-saffron bg-brand-saffron text-brand-ink"
                      : "border-brand-cream/20 text-brand-cream/80 hover:border-brand-cream/55 hover:text-brand-cream"
                  )}
                >
                  <span className="font-mono text-[10px] tracking-widest">
                    {c.code}
                  </span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side detail panel */}
      <div className="lg:col-span-4">
        <div className="sticky top-28 rounded-md border border-brand-cream/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                {active.code} · selected
              </div>
              <div className="mt-3 font-display text-3xl font-light leading-tight text-brand-cream md:text-4xl">
                {active.name}
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-brand-cream/75 md:text-[14px]">
                {active.blurb}
              </p>

              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
                  Highlights
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-brand-cream/15 px-3 py-1.5 text-[12px] text-brand-cream/85"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {active.hasRegions ? (
                <button
                  type="button"
                  onClick={onDrillKZ}
                  className="group mt-7 inline-flex w-full items-center justify-between gap-2 rounded-full bg-brand-saffron px-5 py-3 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                >
                  Explore all 20 regions
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              ) : (
                <a
                  href="#book"
                  className="group mt-7 inline-flex w-full items-center justify-between gap-2 rounded-full bg-brand-saffron px-5 py-3 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                >
                  Plan a trip to {active.name}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Approx label positions in the cropped viewBox (550 60 280 200, ie. centers
// over each country). Hand-tuned visually.
const labelCoords: Record<Country["code"], { x: number; y: number }> = {
  KZ: { x: 705, y: 115 },
  UZ: { x: 695, y: 142 },
  KG: { x: 720, y: 138 },
  TJ: { x: 707, y: 150 },
  TM: { x: 668, y: 152 },
  AF: { x: 700, y: 165 },
  IR: { x: 645, y: 165 },
};

function CountryLabels({ active }: { active: Country["code"] }) {
  return (
    <svg
      viewBox="550 60 280 200"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {countries.map((c) => {
        const p = labelCoords[c.code];
        const isActive = c.code === active;
        return (
          <g key={c.code} transform={`translate(${p.x} ${p.y})`}>
            <circle
              r={isActive ? 1.6 : 1.0}
              fill={isActive ? "#1a1410" : "rgba(26,20,16,0.6)"}
              stroke="#fbf8f1"
              strokeWidth="0.4"
            />
            <text
              y={4.4}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={isActive ? 3.8 : 3.2}
              letterSpacing="0.12em"
              fill={isActive ? "#1a1410" : "#fbf8f1"}
              fontWeight={isActive ? 700 : 500}
              style={{ paintOrder: "stroke", stroke: isActive ? "#fbf8f1" : "rgba(26,20,16,0.85)", strokeWidth: 0.8 }}
            >
              {c.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────── Kazakhstan regions drill-down ───────────────────────────

function KazakhstanRegionsView() {
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
        <div className="relative overflow-hidden rounded-md border border-brand-cream/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 md:p-6">
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
              <filter id="glow-kz-drill">
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
                      filter: isActive ? "url(#glow-kz-drill)" : "none",
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

      <div className="lg:col-span-12 lg:hidden">
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
