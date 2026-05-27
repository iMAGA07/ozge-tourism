"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Tent } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { adventures, type GroupTour } from "@/data/content";
import { cn } from "@/lib/utils";

// Photo backdrop per destination. The five group-tour destinations use
// dedicated adv-*.jpg shots supplied by the client. Kazakhstan regions
// keep the existing in-house photography.
const regionPhoto: Record<string, string> = {
  Mangystau: "IMG_3858.jpg",
  Almaty: "IMG_2799.jpg",
  "Almaty Region": "IMG_2799.jpg",
  "South Kazakhstan": "IMG_8134.jpg",
  "East Kazakhstan": "IMG_3873.jpg",
  Burabay: "IMG_3882.jpg",
  Zerenda: "IMG_2600_3.jpg",
  Buiratau: "IMG_6585.jpg",
  Bayanaul: "IMG_6075.jpg",
  Kazakhstan: "adv-summer-camp.jpg",
  Uzbekistan: "adv-uzbekistan.jpg",
  Kyrgyzstan: "adv-kyrgyzstan.jpg",
  Tajikistan: "adv-tajikistan.jpg",
  Turkmenistan: "adv-turkmenistan.jpg",
};

function parseDayRange(label: string): {
  d1: string;
  d2?: string;
  month1: string;
  month2?: string;
} {
  // Handles "June 1–8" and "June 26 – July 4"
  const m = label.match(/^(\w+)\s+(\d+)\s*[-–]\s*(?:(\w+)\s+)?(\d+)/);
  if (!m) return { d1: "—", month1: label };
  return {
    month1: m[1],
    d1: m[2],
    month2: m[3] || m[1],
    d2: m[4],
  };
}

export function Adventures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = adventures.group[activeIndex] ?? adventures.group[0];

  const heroPhoto = useMemo(() => {
    return regionPhoto[active?.photoRegion ?? ""] ?? "IMG_2600_3.jpg";
  }, [active]);

  const range = parseDayRange(active.dates);

  return (
    <section
      id="adventures"
      className="relative overflow-hidden bg-brand-cream py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow={`Upcoming · ${adventures.month.label}`}
          title="Scheduled Adventures"
          italic={`of ${adventures.month.label} — Choose Yours!`}
          lead="Our major group adventures for June. We also run Kazakhstan weekend tours every Friday–Sunday, casual weekend getaways year-round, and fully private trips any day, any week, any season — tailored just for you."
        />

        {/* ─── Group Tours: hero + date tape ─────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-wrap items-baseline gap-3 md:mt-16">
            <div className="rounded-full bg-brand-ink px-4 py-1.5 text-[10.5px] uppercase tracking-[0.28em] text-brand-cream">
              Group Tours
            </div>
            <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
              {adventures.group.length} departures · Central Asia
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-6 grid overflow-hidden rounded-xl bg-brand-ink text-brand-cream md:mt-8 md:grid-cols-12">
            {/* Photo half */}
            <div className="relative h-[280px] md:col-span-7 md:h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${activeIndex}`}
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
                  key={`badge-${activeIndex}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-6 top-6 z-10 md:left-9 md:top-9"
                >
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                    Departure · {String(activeIndex + 1).padStart(2, "0")} / 0{adventures.group.length}
                  </div>
                  <div className="mt-1 flex items-end gap-2.5">
                    <span className="font-display text-6xl font-light leading-none text-brand-cream md:text-8xl">
                      {range.d1}
                    </span>
                    {range.d2 && (
                      <>
                        <span className="pb-2 text-2xl font-light text-brand-cream/70 md:text-4xl">
                          –
                        </span>
                        <span className="font-display text-6xl font-light leading-none text-brand-cream md:text-8xl">
                          {range.d2}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.32em] text-brand-cream/70">
                    {range.month1}
                    {range.month2 && range.month2 !== range.month1
                      ? ` → ${range.month2}`
                      : ""}{" "}
                    · 2026
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info half */}
            <div className="relative flex flex-col p-7 md:col-span-5 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                    Destination
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    {active.flag ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/flags/${active.flag}.svg`}
                        alt=""
                        className="h-9 w-12 shrink-0 rounded-[4px] object-cover ring-1 ring-brand-cream/20"
                        loading="lazy"
                      />
                    ) : (
                      <span className="inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-[4px] bg-brand-saffron/20 text-brand-saffron ring-1 ring-brand-saffron/40">
                        <Tent strokeWidth={1.6} className="h-5 w-5" />
                      </span>
                    )}
                    <div>
                      <div className="font-display text-2xl font-light leading-tight md:text-3xl">
                        {active.title}
                      </div>
                      {active.subtitle && (
                        <div className="mt-1 text-[12px] text-brand-cream/65">
                          {active.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 text-[13px] leading-relaxed text-brand-cream/70">
                    {active.flag
                      ? `Full ${active.title} group adventure — guided end-to-end. Camping under the stars or hotel stays, your choice.`
                      : "Outdoor camp for school students 10+ — hiking, archery, campfire nights, and team challenges. Run by our guides."}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#book"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-saffron px-6 py-3 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                  >
                    Reserve this date
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href={`https://wa.me/77757145327?text=${encodeURIComponent(
                      `Hi, I'd like to ask about the ${active.title} adventure on ${active.dates}.`
                    )}`}
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
          <div className="mt-5 md:mt-6 -mx-6 md:-mx-10">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 md:gap-4 md:px-10">
              {adventures.group.map((d, i) => {
                const isActive = i === activeIndex;
                const r = parseDayRange(d.dates);
                return (
                  <button
                    key={d.dates}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "group relative shrink-0 snap-center overflow-hidden rounded-xl border text-left transition-all duration-500 ease-smooth",
                      "w-[48vw] sm:w-[210px] md:w-[230px]",
                      isActive
                        ? "border-brand-terracotta bg-brand-ink text-brand-cream"
                        : "border-brand-charcoal/15 bg-brand-paper text-brand-ink hover:border-brand-charcoal/40"
                    )}
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex items-center gap-2">
                        {d.flag ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`/flags/${d.flag}.svg`}
                            alt=""
                            className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
                            loading="lazy"
                          />
                        ) : (
                          <span className={cn(
                            "inline-flex h-3.5 w-5 shrink-0 items-center justify-center rounded-[2px]",
                            isActive ? "bg-brand-saffron/20 text-brand-saffron" : "bg-brand-saffron/15 text-brand-terracotta"
                          )}>
                            <Tent strokeWidth={1.8} className="h-2.5 w-2.5" />
                          </span>
                        )}
                        <div
                          className={cn(
                            "text-[10px] uppercase tracking-[0.22em] truncate",
                            isActive ? "text-brand-saffron" : "text-brand-terracotta/80"
                          )}
                        >
                          {d.title}
                        </div>
                      </div>
                      <div className="mt-3 flex items-end gap-1.5">
                        <span className="font-display text-3xl font-light leading-none md:text-4xl">
                          {r.d1}
                        </span>
                        {r.d2 && (
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
                              {r.d2}
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-2 text-[11px]",
                          isActive ? "text-brand-cream/70" : "text-brand-charcoal/55"
                        )}
                      >
                        {r.month1}
                        {r.month2 && r.month2 !== r.month1 ? ` → ${r.month2}` : ""}
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

        {/* ─── Two recurring panels: KZ weekends + Getaways ───────────── */}
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          <RecurringPanel
            track="kzWeekend"
            data={adventures.kzWeekend}
            accent="terracotta"
          />
          <RecurringPanel
            track="getaways"
            data={adventures.getaways}
            accent="saffron"
          />
        </div>

        {/* ─── Private tours callout ──────────────────────────────────── */}
        <Reveal delay={0.15}>
          <a
            href="#book"
            className="group mt-5 flex items-center justify-between gap-4 rounded-xl border border-brand-charcoal/12 bg-brand-paper px-5 py-4 transition-all hover:border-brand-terracotta/40 hover:bg-white md:mt-6 md:px-7 md:py-5"
          >
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.32em] text-brand-terracotta">
                Private tours
              </div>
              <div className="mt-1 font-display text-lg font-medium text-brand-ink md:text-xl">
                {adventures.privateTours}
              </div>
              <div className="mt-0.5 text-[12px] text-brand-charcoal/60">
                Any day, any week, any season — designed around you.
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-[12.5px] font-medium text-brand-terracotta transition-transform group-hover:translate-x-1">
              Request
              <span>→</span>
            </span>
          </a>
        </Reveal>

        {/* Please-note */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-md border border-brand-charcoal/10 bg-brand-paper p-5 md:mt-14 md:p-7">
            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-terracotta/80">
              Please note
            </div>
            <ul className="mt-3 grid gap-3 text-[12.5px] leading-relaxed text-brand-charcoal/60 md:grid-cols-3 md:gap-5">
              <li>
                These are our major group adventures for June. We also have
                one-day &amp; special outdoor activities announced weekly or a
                few days in advance.
              </li>
              <li>
                Private &amp; exclusive adventures any day, any week, any
                season — tailored just for you, your family, or your
                organization across Central Asia.
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

// ─── Recurring (weekend tours / getaways) ─────────────────────────────────

function RecurringPanel({
  track,
  data,
  accent,
}: {
  track: "kzWeekend" | "getaways";
  data: { title: string; cadence: string; destinations: string[] };
  accent: "terracotta" | "saffron";
}) {
  const accentText =
    accent === "terracotta" ? "text-brand-terracotta" : "text-brand-saffron";

  return (
    <Reveal delay={track === "kzWeekend" ? 0.05 : 0.1}>
      <article className="group relative h-full overflow-hidden rounded-xl border border-brand-charcoal/12 bg-brand-paper p-6 transition-all hover:border-brand-charcoal/25 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className={cn("text-[10px] uppercase tracking-[0.32em]", accentText)}>
              {data.cadence}
            </div>
            <h3 className="mt-2 font-display text-xl font-medium leading-tight text-brand-ink md:text-2xl">
              {data.title}
            </h3>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest",
              accent === "terracotta"
                ? "bg-brand-terracotta/10 text-brand-terracotta"
                : "bg-brand-saffron/15 text-brand-saffron"
            )}
          >
            Weekly
          </span>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {data.destinations.map((d) => {
            const isBeyond = d === "& More";
            return (
              <li
                key={d}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] transition-all",
                  isBeyond
                    ? "border-dashed border-brand-charcoal/30 text-brand-charcoal/55"
                    : "border-brand-charcoal/15 bg-white text-brand-ink"
                )}
              >
                {!isBeyond && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/flags/kz.svg"
                    alt=""
                    className="h-3 w-[18px] rounded-[1.5px] object-cover ring-1 ring-black/10"
                    loading="lazy"
                  />
                )}
                {d}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-brand-charcoal/10 pt-4">
          <a
            href="#book"
            className={cn(
              "inline-flex items-center gap-2 text-[12.5px] font-medium transition-transform group-hover:translate-x-1",
              accentText
            )}
          >
            Reserve a weekend
            <span>→</span>
          </a>
        </div>
      </article>
    </Reveal>
  );
}
