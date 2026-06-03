"use client";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions as kzRegions, regionViewBox as kzViewBox } from "@/data/regions";
import { regionMaps } from "@/data/region-maps";
import { countryInfo, countryByCode, type CountryInfo } from "@/data/countries";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const MAP_VIEWBOX = "617.72 91.10 129.75 94.29";

// ─────────── Unified region shape for the drill-down view ────────────────
type ViewRegion = {
  id: string;
  name: string;
  d: string;
  blurb: string;
  population?: string;
  area?: string;
  destinations: string[];
  unesco: string[];
  adventure: string[];
};
type RegionMap = { viewBox: string; regions: ViewRegion[]; strokeWidth: number };

function fmtArea(km2: number): string {
  return `${km2.toLocaleString("en-US")} km²`;
}

// Build a region map for any country code.
function getRegionMap(code: CountryInfo["code"]): RegionMap {
  if (code === "KZ") {
    return {
      viewBox: kzViewBox,
      strokeWidth: 0.6,
      regions: kzRegions.map((r) => ({
        id: r.id,
        name: r.name,
        d: r.d,
        blurb: r.blurb,
        population: r.population,
        area: r.area,
        destinations: r.highlights,
        unesco: r.unesco ?? [],
        adventure: r.adventure ?? [],
      })),
    };
  }
  const cg = regionMaps[code];
  const vbW = parseFloat(cg.viewBox.split(" ")[2]);
  return {
    viewBox: cg.viewBox,
    strokeWidth: Math.max(0.6, vbW * 0.0006),
    regions: cg.regions.map((r) => ({
      id: r.id,
      name: r.name,
      d: r.d,
      blurb: r.blurb,
      area: r.area ? fmtArea(r.area) : undefined,
      destinations: r.destinations,
      unesco: r.unesco,
      adventure: r.adventure,
    })),
  };
}

const regionCount: Record<string, number> = {
  KZ: kzRegions.length,
  ...Object.fromEntries(
    Object.entries(regionMaps).map(([c, m]) => [c, m.regions.length])
  ),
};

// ─────────── Top-level ────────────────────────────────────────────────────

export function InteractiveMap() {
  const [drill, setDrill] = useState<CountryInfo["code"] | null>(null);
  const [activeCode, setActiveCode] = useState<CountryInfo["code"]>("KZ");
  const active = countryByCode[activeCode] ?? countryInfo[0];
  const drillCountry = drill ? countryByCode[drill] : null;

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-brand-ink py-20 text-brand-cream md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
              <span className="h-[1px] w-8 bg-brand-saffron/60" />
              {drillCountry ? `Discover ${drillCountry.name}` : "Discover Central Asia"}
            </span>
            <h2 className="fluid-h2 mt-5 font-display font-light">
              {drillCountry ? (
                <>
                  {regionCount[drillCountry.code]} regions.{" "}
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
              {drillCountry ? (
                <motion.button
                  key="back"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  type="button"
                  onClick={() => setDrill(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-cream/30 px-4 py-2 text-[12.5px] text-brand-cream/85 transition-colors hover:border-brand-cream/60 hover:text-brand-cream"
                >
                  <span>←</span> Back to Central Asia
                </motion.button>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[13px] text-brand-cream/70 md:text-[13.5px]"
                >
                  Tap any country to{" "}
                  <span className="text-brand-saffron">zoom into its regions</span>
                  . Hover (on desktop) for a quick country preview first.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            {!drillCountry ? (
              <motion.div
                key="world"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformOrigin: "50% 35%" }}
              >
                <WorldView
                  activeCode={activeCode}
                  active={active}
                  onPick={setActiveCode}
                  onDrill={(c) => setDrill(c)}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`drill-${drillCountry.code}`}
                initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              >
                <RegionsView country={drillCountry} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─────────── World view ────────────────────────────────────────────────────

function WorldView({
  activeCode,
  active,
  onPick,
  onDrill,
}: {
  activeCode: CountryInfo["code"];
  active: CountryInfo;
  onPick: (code: CountryInfo["code"]) => void;
  onDrill: (code: CountryInfo["code"]) => void;
}) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/world-ca.svg")
      .then((r) => r.text())
      .then((t) => !cancelled && setSvg(t))
      .catch(() => !cancelled && setSvg(""));
    return () => {
      cancelled = true;
    };
  }, []);

  const validCodes = useMemo(() => new Set(countryInfo.map((c) => c.code)), []);
  const codeFrom = (t: EventTarget | null): CountryInfo["code"] | null => {
    const el = t as Element | null;
    if (!el || typeof el.getAttribute !== "function") return null;
    const raw = el.getAttribute("data-code");
    if (!raw) return null;
    const code = raw.toUpperCase() as CountryInfo["code"];
    return validCodes.has(code) ? code : null;
  };
  const onHover = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return;
      const code = codeFrom(e.target);
      if (code && code !== activeCode) onPick(code);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCode, onPick]
  );
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const code = codeFrom(e.target);
      if (!code) return;
      onPick(code);
      // Flash the saffron highlight, then drill into the region map.
      window.setTimeout(() => onDrill(code), 280);
    },
    [onPick, onDrill]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Map */}
      <div className="relative lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl border border-brand-cream/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 md:p-6">
          <div className="mb-3 flex items-baseline justify-between md:mb-5">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
              Operating in
            </div>
            <div className="font-mono text-[10.5px] tracking-widest text-brand-cream/55">
              7 countries · tap to pick
            </div>
          </div>

          <style jsx global>{`
            .ozge-cmap svg { display: block; width: 100%; height: auto; }
            .ozge-cmap .op {
              fill: rgba(245, 236, 220, 0.82);
              stroke: rgba(26, 20, 16, 0.55);
              stroke-width: 0.35;
              cursor: pointer;
              transition: fill 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.45s cubic-bezier(0.22, 1, 0.36, 1);
              -webkit-tap-highlight-color: transparent;
              outline: none;
            }
            .ozge-cmap .op:hover { fill: rgba(224, 160, 57, 0.85); }
            .ozge-cmap.active-kz .kz, .ozge-cmap.active-uz .uz,
            .ozge-cmap.active-kg .kg, .ozge-cmap.active-tj .tj,
            .ozge-cmap.active-tm .tm, .ozge-cmap.active-af .af,
            .ozge-cmap.active-ir .ir {
              fill: #e0a039;
              filter: drop-shadow(0 0 5px rgba(224, 160, 57, 0.55));
            }
          `}</style>

          <div
            className={cn("ozge-cmap relative", `active-${activeCode.toLowerCase()}`)}
            onClick={onClick}
            onPointerMove={onHover}
            role="application"
            aria-label="Clickable map of Central Asia"
          >
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
              <div className="flex aspect-[1.38] items-center justify-center text-[11px] uppercase tracking-[0.28em] text-brand-cream/40">
                Loading map…
              </div>
            )}
            <CountryLabels active={activeCode} />
          </div>

          {/* Chip selector */}
          <div className="mt-5 flex flex-wrap gap-2">
            {countryInfo.map((c) => {
              const isActive = c.code === activeCode;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onPick(c.code);
                    window.setTimeout(() => onDrill(c.code), 200);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-[11.5px] transition-all",
                    isActive
                      ? "border-brand-saffron bg-brand-saffron text-brand-ink"
                      : "border-brand-cream/20 text-brand-cream/80 hover:border-brand-cream/55 hover:text-brand-cream"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/flags/${c.flag}.svg`}
                    alt=""
                    className="h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
                    loading="lazy"
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country fact panel */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-brand-cream/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/flags/${active.flag}.svg`}
                  alt=""
                  className="h-8 w-12 shrink-0 rounded-[4px] object-cover ring-1 ring-brand-cream/20"
                />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
                    {active.code} · selected
                  </div>
                  <div className="font-display text-2xl font-light leading-tight text-brand-cream md:text-[28px]">
                    {active.name}
                  </div>
                </div>
              </div>
              <div className="mt-1.5 font-serif text-[13px] italic text-brand-cream/55">
                {active.official}
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-brand-cream/10">
                <Fact label="Capital" value={active.capital} />
                <Fact label="Population" value={active.population} />
                <Fact label="Area" value={active.area} />
                <Fact label="Currency" value={active.currency} />
              </dl>

              <div className="mt-5 space-y-3">
                <Row label="Languages" value={active.languages} />
                <Row label="Ethnic groups" value={active.ethnicGroups} />
                <Row label="Religions" value={active.religions} />
              </div>

              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
                  Famous destinations
                </div>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {active.destinations.map((d) => (
                    <li key={d} className="rounded-full border border-brand-cream/15 px-2.5 py-1 text-[11.5px] text-brand-cream/85">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
                  UNESCO heritage
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {active.unesco.map((u) => (
                    <li key={u} className="flex items-start gap-2 text-[12.5px] text-brand-cream/80">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-saffron" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onDrill(active.code)}
                className="group mt-7 inline-flex w-full items-center justify-between gap-2 rounded-full bg-brand-saffron px-5 py-3 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
              >
                Explore all {regionCount[active.code]} regions
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CountryLabels({ active }: { active: CountryInfo["code"] }) {
  return (
    <svg
      viewBox={MAP_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {countryInfo.map((c) => {
        const isActive = c.code === active;
        return (
          <g key={c.code} transform={`translate(${c.cx} ${c.cy})`}>
            <circle r={isActive ? 1.4 : 0.9} fill={isActive ? "#1a1410" : "rgba(26,20,16,0.55)"} stroke="#fbf8f1" strokeWidth="0.35" />
            <text y={3.4} textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize={isActive ? 3 : 2.6} letterSpacing="0.1em" fontWeight={isActive ? 700 : 500} fill={isActive ? "#1a1410" : "#fbf8f1"} style={{ paintOrder: "stroke", stroke: isActive ? "#fbf8f1" : "rgba(26,20,16,0.85)", strokeWidth: 0.7 }}>
              {c.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-ink/40 p-3">
      <div className="text-[9px] uppercase tracking-[0.24em] text-brand-cream/50">{label}</div>
      <div className="mt-1 text-[12.5px] font-medium leading-snug text-brand-cream">{value}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-brand-cream/10 pb-2.5 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="w-28 shrink-0 text-[9.5px] uppercase tracking-[0.24em] text-brand-cream/50">{label}</span>
      <span className="text-[12.5px] text-brand-cream/85">{value}</span>
    </div>
  );
}

// Country-level facts — shown as the default state of the region page,
// before any specific region is hovered/tapped.
function CountryOverview({ country }: { country: CountryInfo }) {
  return (
    <>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/flags/${country.flag}.svg`}
          alt=""
          className="h-8 w-12 shrink-0 rounded-[4px] object-cover ring-1 ring-brand-cream/20"
        />
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
            Country overview
          </div>
          <div className="font-display text-2xl font-light leading-tight text-brand-cream md:text-[28px]">
            {country.name}
          </div>
        </div>
      </div>
      <div className="mt-1.5 font-serif text-[13px] italic text-brand-cream/55">
        {country.official}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-brand-cream/10">
        <Fact label="Capital" value={country.capital} />
        <Fact label="Population" value={country.population} />
        <Fact label="Area" value={country.area} />
        <Fact label="Currency" value={country.currency} />
      </dl>

      <div className="mt-5 space-y-3">
        <Row label="Languages" value={country.languages} />
        <Row label="Ethnic groups" value={country.ethnicGroups} />
        <Row label="Religions" value={country.religions} />
      </div>

      <div className="mt-5">
        <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">
          UNESCO heritage
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {country.unesco.map((u) => (
            <li key={u} className="flex items-start gap-2 text-[12.5px] text-brand-cream/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-saffron" />
              {u}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-md border border-brand-cream/10 bg-brand-cream/[0.03] px-4 py-3 text-[12px] text-brand-cream/70">
        Hover or tap a region on the map to see its area, destinations,
        UNESCO sites and adventures.
      </div>
    </>
  );
}

// ─────────── Generic regions drill-down (works for all 7 countries) ───────

function RegionsView({ country }: { country: CountryInfo }) {
  const map = useMemo(() => getRegionMap(country.code), [country.code]);
  const [active, setActive] = useState<ViewRegion | null>(null);
  const [pinned, setPinned] = useState<ViewRegion | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // No auto-pin — landing on the region page shows the COUNTRY overview
  // first (level-1 facts), then a region's detail once you hover/tap it.
  const display = active ?? pinned;
  const ordered = useMemo(
    () => [...map.regions].sort((a, b) => b.d.length - a.d.length),
    [map]
  );
  const glowStd = useMemo(
    () => Math.max(2.5, parseFloat(map.viewBox.split(" ")[2]) * 0.0025),
    [map]
  );

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div ref={wrapRef} onMouseMove={handleMove} className="relative lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl border border-brand-cream/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 md:p-6">
          <div className="mb-3 flex items-baseline justify-between md:mb-5">
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/flags/${country.flag}.svg`} alt="" className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-brand-cream/20" />
              {country.name} · {map.regions.length} regions
            </div>
            <div className="font-mono text-[10.5px] tracking-widest text-brand-cream/55">
              Hover or tap a region
            </div>
          </div>
          <svg
            viewBox={map.viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-auto"
            role="img"
            aria-label={`Interactive map of ${country.name}`}
          >
            <defs>
              <filter id="glow-region">
                <feGaussianBlur stdDeviation={glowStd} result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g strokeLinejoin="round">
              {ordered.map((r) => {
                const isActive = display?.id === r.id;
                return (
                  <path
                    key={r.id}
                    d={r.d}
                    className="cursor-pointer transition-all duration-500 ease-smooth focus:outline-none focus-visible:outline-none [-webkit-tap-highlight-color:transparent]"
                    style={{
                      fill: isActive ? "#e0a039" : "rgba(245, 236, 220, 0.92)",
                      stroke: "#1a1410",
                      strokeWidth: map.strokeWidth,
                      filter: isActive ? "url(#glow-region)" : "none",
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
                  left: Math.min(pointer.x + 18, (wrapRef.current?.clientWidth ?? 0) - 300),
                  top: Math.max(pointer.y - 12, 0),
                }}
                className="pointer-events-none absolute z-10 w-[280px] rounded-md border border-brand-cream/15 bg-brand-ink/95 p-4 shadow-2xl backdrop-blur"
              >
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                  {active.area ?? "Region"}
                </div>
                <div className="mt-1 font-display text-xl font-light text-brand-cream">
                  {active.name}
                </div>
                <p className="mt-2 text-[12.5px] leading-snug text-brand-cream/75">{active.blurb}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Region fact panel */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 rounded-2xl border border-brand-cream/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
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
                    {country.name} · region
                  </div>
                  <div className="mt-2 font-display text-2xl font-light text-brand-cream md:text-3xl">
                    {display.name}
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-brand-cream/75">{display.blurb}</p>

                  {(display.population || display.area) && (
                    <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-brand-cream/10">
                      {display.population && <Fact label="Population" value={display.population} />}
                      {display.area && <Fact label="Total area" value={display.area} />}
                    </dl>
                  )}

                  {display.destinations.length > 0 && (
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">Famous destinations</div>
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {display.destinations.map((h) => (
                          <li key={h} className="rounded-full border border-brand-cream/15 px-2.5 py-1 text-[11.5px] text-brand-cream/85">{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {display.unesco.length > 0 && (
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">UNESCO heritage</div>
                      <ul className="mt-2.5 space-y-1.5">
                        {display.unesco.map((u) => (
                          <li key={u} className="flex items-start gap-2 text-[12.5px] text-brand-cream/80">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-saffron" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {display.adventure.length > 0 && (
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">Adventure opportunities</div>
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {display.adventure.map((a) => (
                          <li key={a} className="rounded-full bg-brand-saffron/15 px-2.5 py-1 text-[11.5px] text-brand-saffron">{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a href="#book" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-saffron transition-colors hover:text-brand-cream">
                    Plan a trip here <span>→</span>
                  </a>
                </>
              ) : (
                <CountryOverview country={country} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile region chips */}
      <div className="lg:col-span-12 lg:hidden">
        <div className="text-[10px] uppercase tracking-[0.28em] text-brand-cream/55">Or jump straight to a region</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {map.regions.map((r) => (
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
