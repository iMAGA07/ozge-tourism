"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { adventures } from "@/data/content";
import { cn } from "@/lib/utils";

type Track = "weekend" | "longform";

// Hand-picked region → photo pairings (used as background of the active
// detail card and as the small thumbnail on each date pill).
const regionPhoto: Record<string, string> = {
  Mangystau: "IMG_3858.jpg",
  Almaty: "IMG_2799.jpg",
  "South Kazakhstan": "IMG_8134.jpg",
  "East Kazakhstan": "IMG_3873.jpg",
  Kazakhstan: "IMG_2600_3.jpg",
  Uzbekistan: "IMG_6919.jpg",
  Kyrgyzstan: "IMG_3882.jpg",
  Tajikistan: "IMG_3865.jpg",
  Turkmenistan: "IMG_2972.jpg",
};

function parseDayRange(label: string): { d1: string; d2?: string; month: string } {
  // "May 1–3" → { d1: '1', d2: '3', month: 'May' }
  const m = label.match(/^(\w+)\s+(\d+)(?:[-–](\d+))?/);
  if (!m) return { d1: "—", month: label };
  return { month: m[1], d1: m[2], d2: m[3] };
}

export function Adventures() {
  const [track, setTrack] = useState<Track>("weekend");
  const [activeIndex, setActiveIndex] = useState(0);

  const list = track === "weekend" ? adventures.weekend : adventures.longform;
  const active = list[activeIndex] ?? list[0];

  // Photo for the hero panel: cycle the first region of the selected date
  const heroPhoto = useMemo(() => {
    const region = active?.regions?.[0];
    return (region && regionPhoto[region]) || "IMG_2600_3.jpg";
  }, [active]);

  return (
    <section
      id="adventures"
      className="relative overflow-hidden bg-brand-cream py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Upcoming Adventures"
          title="Scheduled Adventures"
          italic="of May 2026 — Choose Yours!"
          lead="Our major group adventures for May. We also run one-day & special outdoor activities (minor adventures) announced weekly or a few days in advance, and private & exclusive adventures any day, any week, any season — tailored just for you."
        />

        {/* Track toggle */}
        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-16">
            <div className="inline-flex rounded-full border border-brand-charcoal/15 bg-brand-paper p-1">
              {(["weekend", "longform"] as const).map((t) => {
                const isActive = track === t;
                return (
                  <button
                    key={t}
                    type="button"
                    data-cursor="hover"
                    onClick={() => {
                      setTrack(t);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[12px] font-medium transition-colors duration-500",
                      isActive
                        ? "text-brand-cream"
                        : "text-brand-charcoal/70 hover:text-brand-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="trackPill"
                        transition={{
                          type: "spring",
                          damping: 24,
                          stiffness: 320,
                        }}
                        className="absolute inset-0 rounded-full bg-brand-ink"
                      />
                    )}
                    <span className="relative">
                      {t === "weekend" ? "Weekend · 2–3 Days" : "Week-Long · 10 Days"}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
              {list.length} dates · {track === "weekend" ? "Kazakhstan" : "Central Asia"}
            </div>
          </div>
        </Reveal>

        {/* Hero detail panel */}
        <Reveal delay={0.1}>
          <div className="relative mt-8 grid overflow-hidden rounded-md bg-brand-ink text-brand-cream md:mt-10 md:grid-cols-12">
            {/* Photo half */}
            <div className="relative h-[260px] md:col-span-7 md:h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${track}-${activeIndex}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/photos/${heroPhoto}`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-transparent md:via-brand-ink/0 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-transparent md:from-brand-ink/35" />
                </motion.div>
              </AnimatePresence>

              {/* Floating date badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${track}-${activeIndex}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-6 top-6 z-10 md:left-9 md:top-9"
                >
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                    {track === "weekend" ? "Weekend" : "Week-Long"}
                  </div>
                  <div className="mt-1 flex items-end gap-3">
                    <span className="font-display text-7xl font-light leading-none text-brand-cream md:text-8xl">
                      {parseDayRange(active.dates).d1}
                    </span>
                    {parseDayRange(active.dates).d2 && (
                      <>
                        <span className="pb-2 text-3xl font-light text-brand-cream/70 md:text-4xl">
                          –
                        </span>
                        <span className="font-display text-7xl font-light leading-none text-brand-cream md:text-8xl">
                          {parseDayRange(active.dates).d2}
                        </span>
                      </>
                    )}
                    <span className="pb-3 ml-2 text-[11px] uppercase tracking-[0.32em] text-brand-cream/70">
                      {parseDayRange(active.dates).month} · 2026
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info half */}
            <div className="relative flex flex-col p-7 md:col-span-5 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${track}-${activeIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                    Regions on this trip
                  </div>
                  <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {active.regions.map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-3 rounded-full border border-brand-cream/15 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-brand-cream"
                      >
                        <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={`/photos/${regionPhoto[r] ?? "IMG_2600_3.jpg"}`}
                            alt=""
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#book"
                    data-cursor="hover"
                    data-cursor-label="Reserve"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-saffron px-6 py-3 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                  >
                    Reserve this date
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href={`https://wa.me/77757145327?text=${encodeURIComponent(
                      `Hi, I'd like to ask about the ${track === "weekend" ? "weekend" : "10-day"} adventure on ${active.dates}.`
                    )}`}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-cream/30 px-6 py-3 text-[13px] font-medium text-brand-cream/90 hover:border-brand-cream/60 hover:text-brand-cream"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Date tape (scrollable) */}
        <Reveal delay={0.15}>
          <div className="mt-6 md:mt-8 -mx-6 md:-mx-10">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 md:gap-4 md:px-10">
              {list.map((d, i) => {
                const isActive = i === activeIndex;
                const range = parseDayRange(d.dates);
                return (
                  <button
                    key={d.dates}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    data-cursor="hover"
                    className={cn(
                      "group relative shrink-0 snap-center overflow-hidden rounded-md border text-left transition-all duration-500 ease-smooth",
                      "w-[42vw] sm:w-[200px] md:w-[220px]",
                      isActive
                        ? "border-brand-terracotta bg-brand-ink text-brand-cream"
                        : "border-brand-charcoal/15 bg-brand-paper text-brand-ink hover:border-brand-charcoal/40"
                    )}
                  >
                    <div className="p-4 md:p-5">
                      <div
                        className={cn(
                          "text-[10px] uppercase tracking-[0.28em]",
                          isActive ? "text-brand-saffron" : "text-brand-terracotta/80"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")} · {range.month}
                      </div>
                      <div className="mt-2 flex items-end gap-1.5">
                        <span className="font-display text-3xl font-light leading-none md:text-4xl">
                          {range.d1}
                        </span>
                        {range.d2 && (
                          <>
                            <span
                              className={cn(
                                "pb-1 text-lg",
                                isActive ? "text-brand-cream/60" : "text-brand-charcoal/40"
                              )}
                            >
                              –
                            </span>
                            <span className="font-display text-3xl font-light leading-none md:text-4xl">
                              {range.d2}
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-3 text-[11px]",
                          isActive ? "text-brand-cream/70" : "text-brand-charcoal/55"
                        )}
                      >
                        {d.regions.length} regions
                      </div>
                    </div>
                    <div
                      className={cn(
                        "h-[3px] w-full transition-all duration-500",
                        isActive ? "bg-brand-terracotta" : "bg-transparent"
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 px-6 text-center text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/45 md:hidden">
              Swipe ←→
            </div>
          </div>
        </Reveal>

        {/* Please-note block stays for transparency */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-md border border-brand-charcoal/10 bg-brand-paper p-5 md:mt-14 md:p-7">
            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-terracotta/80">
              Please note
            </div>
            <ul className="mt-3 grid gap-3 text-[12.5px] leading-relaxed text-brand-charcoal/60 md:grid-cols-3 md:gap-5">
              <li>
                These are ONLY our major group adventures for May. As usual, we
                will also have one-day &amp; special outdoor activities (minor
                adventures) announced weekly or a few days in advance.
              </li>
              <li>
                We also organize private &amp; exclusive adventures anywhere
                across Central Asia for you, your family, or organization — any
                day, any week, any season.
              </li>
              <li>
                Choose your style: fully equipped camping under the stars or
                hotel accommodation — both available for all adventures.
              </li>
            </ul>
            <p className="mt-5 border-t border-brand-charcoal/10 pt-4 text-[12.5px] leading-relaxed text-brand-charcoal/60">
              For reservations &amp; details, write{" "}
              <a
                href="mailto:info@ozgetourism.com"
                className="text-brand-terracotta hover:text-brand-ink"
              >
                info@ozgetourism.com
              </a>{" "}
              or message{" "}
              <a
                href="https://wa.me/77757145327"
                className="text-brand-terracotta hover:text-brand-ink"
              >
                +7 775 714 53 27
              </a>{" "}
              (WhatsApp &amp; Telegram — Mohammad). See you soon on one — or
              maybe all — of our adventures! 😊
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
