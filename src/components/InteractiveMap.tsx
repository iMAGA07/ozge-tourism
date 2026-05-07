"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { regions, regionViewBox, type Region } from "@/data/regions";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function InteractiveMap() {
  const [active, setActive] = useState<Region | null>(null);
  const [pinned, setPinned] = useState<Region | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  // On mobile, default-select Almaty so the panel is never empty
  useEffect(() => {
    if (isMobile && !pinned) {
      const a = regions.find((r) => r.id === "KZ19") ?? regions[0];
      setPinned(a);
    }
  }, [isMobile, pinned]);

  const display = active ?? pinned;

  const ordered = useMemo(() => {
    // Render larger regions first so smaller cities sit on top
    return [...regions].sort((a, b) => b.d.length - a.d.length);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-brand-ink py-24 text-brand-cream md:py-36"
    >
      {/* subtle gold radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
              <span className="h-[1px] w-8 bg-brand-saffron/60" />
              Discover Kazakhstan
            </span>
            <h2 className="fluid-h2 mt-5 font-display font-light">
              One country.{" "}
              <span className="font-serif italic font-normal text-brand-saffron">
                Twenty wonders.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="fluid-lead text-brand-cream/75">
                Hover any region to discover what makes it unique. From cosmodromes
                to sacred mountains, every corner of Kazakhstan tells a different story.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div
            ref={wrapRef}
            onMouseMove={handleMove}
            className="relative lg:col-span-8"
          >
            <div className="relative rounded-md border border-brand-cream/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-3 md:p-6 backdrop-blur">
              <svg
                viewBox={regionViewBox}
                xmlns="http://www.w3.org/2000/svg"
                className="block w-full h-auto"
                role="img"
                aria-label="Interactive map of Kazakhstan"
              >
                <defs>
                  <filter id="glow">
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
                          "transition-all duration-500 ease-smooth",
                          "cursor-pointer"
                        )}
                        style={{
                          fill: isActive
                            ? "#e0a039"
                            : "rgba(245, 236, 220, 0.92)",
                          stroke: "#1a1410",
                          strokeWidth: 0.6,
                          filter: isActive ? "url(#glow)" : "none",
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

              {/* Floating tooltip on desktop */}
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

          {/* Side detail panel */}
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
                      <p className="mt-4 text-[14.5px] leading-relaxed text-brand-cream/80">
                        {display.blurb}
                      </p>
                      {display.highlights.length > 0 && (
                        <div className="mt-6">
                          <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-cream/60">
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
        </div>

        {/* Mobile region chips */}
        <div className="mt-8 lg:hidden">
          <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-cream/60">
            Tap to explore
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setPinned(r)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12.5px] transition",
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
    </section>
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
