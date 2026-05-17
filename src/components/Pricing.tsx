"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";
import { cn } from "@/lib/utils";

// Travel-pass visuals per option. `position` moved up (lower Y) so the
// people at the bottom of each photo are cropped out and the cinematic
// landscape fills the frame.
const passes = [
  {
    photo: "IMG_2799.jpg",
    position: "center 10%",
    statement: "The standard.",
    italic: "Best value, always.",
    stamp: { label: "Standard\nrate", color: "saffron", rotate: -8 },
    pricing: "Most affordable for the value",
    flightCode: "OZG 001",
    seat: "01A",
    gate: "A1",
    classLabel: "ECONOMY",
    bullets: [
      "Transparent — no surprises",
      "Best value for the package",
      "Pay once, travel worry-free",
    ],
  },
  {
    photo: "IMG_3858.jpg",
    position: "center 8%",
    statement: "10% less\nthan the market.",
    italic: "Whatever you find, we beat it.",
    stamp: { label: "−10%\noff", color: "terracotta", rotate: 6 },
    pricing: "Beat any competitor by 10%",
    flightCode: "OZG 010",
    seat: "10B",
    gate: "B7",
    classLabel: "BUSINESS",
    bullets: [
      "Send us the competing price",
      "We match it and take 10% off",
      "Confirmed on the spot",
    ],
  },
  {
    photo: "IMG_3873.jpg",
    position: "center 8%",
    statement: "Pay only if\nyou love it.",
    italic: "Don't enjoy it? Don't pay.",
    stamp: { label: "Pay as you\nenjoy", color: "ink", rotate: -5 },
    pricing: "Zero upfront commitment",
    flightCode: "OZG ∞",
    seat: "01F",
    gate: "F0",
    classLabel: "FIRST",
    bullets: [
      "No upfront commitment",
      "Pay as you experience",
      "Don't love it? Don't pay.",
    ],
  },
];

// Deterministic barcode for the pass side strip
function makeBarcode(seed: number, length = 28) {
  const out: number[] = [];
  let x = seed * 1313 + 17;
  for (let i = 0; i < length; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    out.push((x % 3) + 1);
  }
  return out;
}
const barcodes = pricing.map((_, i) => makeBarcode(i + 7));

export function Pricing() {
  const [active, setActive] = useState(0);
  const current = pricing[active];
  const pass = passes[active];

  const stampColor =
    pass.stamp.color === "saffron"
      ? "border-brand-saffron text-brand-saffron"
      : pass.stamp.color === "terracotta"
      ? "border-brand-terracotta text-brand-terracotta"
      : "border-brand-cream text-brand-cream";

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      {/* Decorative dashed flight curve */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1400 180"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden h-24 max-w-[1400px] text-brand-terracotta/15 md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 C260,40 540,180 720,90 S1180,30 1400,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="How our pricing works"
          title="Three boarding passes,"
          italic="three ways to pay."
          lead="Luckily for you, pricing is the last thing you need to worry about. Pick the pass that suits you — we'll make sure it's worth it."
          align="center"
          className="text-center"
        />

        {/* Pass selector */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-3 md:mt-16">
            {pricing.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={cn(
                    "group relative flex h-full flex-col items-start gap-1 overflow-hidden rounded-md border p-4 text-left transition-all duration-500 md:p-5",
                    isActive
                      ? "border-brand-terracotta bg-brand-ink text-brand-cream"
                      : "border-brand-charcoal/15 bg-brand-paper text-brand-charcoal/80 hover:border-brand-charcoal/40"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10.5px] tracking-widest",
                      isActive ? "text-brand-saffron" : "text-brand-terracotta/80"
                    )}
                  >
                    {p.label}
                  </span>
                  <span className="font-display text-[13px] font-medium leading-snug md:text-[14.5px]">
                    {passes[i].italic}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* The actual travel pass */}
        <Reveal delay={0.15}>
          <div className="relative mt-8 overflow-hidden rounded-lg border border-brand-ink/15 bg-brand-paper shadow-[0_30px_80px_-40px_rgba(20,15,10,0.35)] md:mt-10">
            {/* Top airline-style band — solid dark with logo + flight code + class */}
            <header className="relative flex items-center justify-between gap-4 bg-brand-ink px-5 py-3 text-brand-cream md:px-8 md:py-4">
              {/* small triangular accents (like the ink-cut corners of real boarding passes) */}
              <div className="pointer-events-none absolute -bottom-3 left-12 h-6 w-6 rotate-45 bg-brand-paper" />
              <div className="pointer-events-none absolute -bottom-3 right-12 h-6 w-6 rotate-45 bg-brand-paper" />

              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-saffron text-brand-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 1 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16Z" />
                  </svg>
                </span>
                <div>
                  <div className="font-display text-[12px] font-medium uppercase tracking-[0.24em] leading-none text-brand-cream">
                    Ozge Air
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.32em] text-brand-cream/55">
                    Boarding Pass
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`flight-${active}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 text-right md:gap-7"
                >
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.28em] text-brand-cream/55">
                      Flight
                    </div>
                    <div className="font-mono text-[12px] tracking-widest text-brand-saffron">
                      {pass.flightCode}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-brand-cream/55">
                      Class
                    </div>
                    <div className="font-mono text-[12px] tracking-widest text-brand-cream">
                      {pass.classLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.28em] text-brand-cream/55">
                      Pass
                    </div>
                    <div className="font-mono text-[12px] tracking-widest text-brand-cream">
                      0{active + 1} / 03
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </header>

            <div className="grid md:grid-cols-[1fr_auto_360px]">
              {/* Photo half with overlaid statement + stamp */}
              <div className="relative h-[320px] overflow-hidden bg-brand-ink md:h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`photo-${active}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/photos/${pass.photo}`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: pass.position }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/35 via-transparent to-brand-ink/65" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/30 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Statement */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`statement-${active}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-6 top-6 z-10 max-w-[80%] text-brand-cream md:left-10 md:top-10"
                  >
                    <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                      Option {String(active + 1).padStart(2, "0")} · {current.label}
                    </div>
                    <h3 className="mt-4 whitespace-pre-line font-display text-[40px] font-light leading-[0.95] tracking-tight md:text-[72px]">
                      {pass.statement.split("\n").map((line, idx) =>
                        idx === 1 ? (
                          <span
                            key={idx}
                            className="block font-serif italic text-brand-saffron"
                          >
                            {line}
                          </span>
                        ) : (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        )
                      )}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                {/* Customs stamp */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`stamp-${active}`}
                    initial={{ opacity: 0, scale: 0.7, rotate: pass.stamp.rotate - 15 }}
                    animate={{ opacity: 1, scale: 1, rotate: pass.stamp.rotate }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="absolute bottom-6 right-6 z-10 md:bottom-10 md:right-10"
                  >
                    <div
                      className={cn(
                        "flex h-24 w-24 flex-col items-center justify-center rounded-full border-[3px] font-display text-center text-[13px] font-medium uppercase leading-tight tracking-[0.08em] md:h-32 md:w-32 md:text-[15px]",
                        stampColor
                      )}
                      style={{
                        background: "transparent",
                        textShadow: "0 1px 0 rgba(0,0,0,0.15)",
                      }}
                    >
                      <span className="whitespace-pre-line">
                        {pass.stamp.label}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Perforated divider (desktop only) */}
              <div className="relative hidden border-l border-dashed border-brand-charcoal/30 md:block">
                <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-brand-paper" />
                <span className="absolute -left-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-full bg-brand-paper" />
              </div>

              {/* Right info column — boarding-pass stub */}
              <div className="flex flex-col bg-brand-paper p-7 md:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`copy-${active}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-1 flex-col"
                  >
                    {/* Passenger row */}
                    <div className="grid grid-cols-2 gap-3 border-b border-dashed border-brand-charcoal/25 pb-4">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.28em] text-brand-charcoal/45">
                          Passenger
                        </div>
                        <div className="mt-1 font-mono text-[14px] tracking-widest text-brand-ink">
                          TRAVELER / YOU
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-[0.28em] text-brand-charcoal/45">
                          Issued
                        </div>
                        <div className="mt-1 font-mono text-[14px] tracking-widest text-brand-ink">
                          {new Date()
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })
                            .toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* From → To with airport-style codes */}
                    <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.28em] text-brand-charcoal/45">
                          From
                        </div>
                        <div className="mt-1 font-display text-3xl font-light leading-none tracking-tight text-brand-ink md:text-4xl">
                          YOU
                        </div>
                        <div className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                          home base
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-brand-terracotta">
                        <svg
                          viewBox="0 0 60 12"
                          className="h-3 w-16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        >
                          <path d="M2 6 H50" strokeDasharray="2 3" />
                          <path
                            d="M44 1 L52 6 L44 11 L46 6 Z"
                            fill="currentColor"
                            stroke="none"
                          />
                        </svg>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-brand-charcoal/45">
                          {active === 0
                            ? "DIRECT"
                            : active === 1
                            ? "BEST FARE"
                            : "OPEN"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-[0.28em] text-brand-charcoal/45">
                          To
                        </div>
                        <div className="mt-1 font-display text-3xl font-light leading-none tracking-tight text-brand-ink md:text-4xl">
                          CTA
                        </div>
                        <div className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                          central asia
                        </div>
                      </div>
                    </div>

                    {/* Boarding-pass metadata strip */}
                    <div className="mt-5 grid grid-cols-4 gap-2 rounded-md border border-brand-charcoal/15 bg-brand-mist/40 px-3 py-3 text-center">
                      <Cell label="Gate" value={pass.gate} />
                      <Cell label="Seat" value={pass.seat} />
                      <Cell label="Boards" value="ANY" />
                      <Cell label="Class" value={pass.classLabel.slice(0, 4)} />
                    </div>

                    {/* Fare statement */}
                    <div className="mt-5 border-y border-dashed border-brand-charcoal/25 py-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-terracotta">
                        Fare
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`fare-${active}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-2 flex items-end gap-3 font-display text-brand-ink"
                        >
                          {active === 0 && (
                            <>
                              <span className="text-4xl font-light leading-none md:text-5xl">
                                Standard
                              </span>
                              <span className="pb-1 font-serif text-base italic text-brand-charcoal/60">
                                rate
                              </span>
                            </>
                          )}
                          {active === 1 && (
                            <>
                              <span className="text-5xl font-light leading-none text-brand-terracotta md:text-6xl">
                                −10%
                              </span>
                              <span className="pb-1 font-serif text-base italic text-brand-charcoal/60">
                                vs market
                              </span>
                            </>
                          )}
                          {active === 2 && (
                            <>
                              <span className="text-5xl font-light leading-none md:text-6xl">
                                Pay
                              </span>
                              <span className="pb-1 font-serif text-base italic text-brand-terracotta">
                                if you love it
                              </span>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Included list */}
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                        Included
                      </div>
                      <ul className="mt-3 space-y-2 text-[12.5px] leading-snug text-brand-charcoal/75">
                        {pass.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-brand-terracotta/45 bg-brand-terracotta/10 text-brand-terracotta">
                              <svg
                                viewBox="0 0 12 12"
                                className="h-2.5 w-2.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2.5 6 L5 8.5 L9.5 3.5" />
                              </svg>
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom barcode block */}
                    <div className="mt-auto pt-7">
                      <div className="rounded-md bg-brand-ink p-4 text-brand-cream">
                        <div className="flex items-end justify-between gap-3">
                          <div className="flex h-9 items-end gap-[1px]">
                            {barcodes[active].map((w, j) => (
                              <div
                                key={j}
                                style={{ width: `${w}px` }}
                                className="h-full bg-brand-cream"
                              />
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-[9px] tracking-widest text-brand-cream/55">
                              Seq · {String(active + 1).padStart(3, "0")}
                            </div>
                            <div className="font-mono text-[10.5px] tracking-widest text-brand-saffron">
                              {pass.flightCode.replace(" ", "")} · {pass.seat}
                            </div>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#book"
                        data-cursor="hover"
                        data-cursor-label="Choose"
                        className="group mt-4 inline-flex w-full items-center justify-between gap-2 rounded-full bg-brand-ink px-6 py-3.5 text-[13px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta"
                      >
                        <span>Board this option</span>
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slim slider rail */}
            <div className="flex h-1 bg-brand-charcoal/5">
              {pricing.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Option ${i + 1}`}
                  className="relative flex-1"
                >
                  {i === active && (
                    <motion.span
                      layoutId="pricingSlide"
                      transition={{ type: "spring", damping: 26, stiffness: 280 }}
                      className="absolute inset-0 bg-brand-terracotta"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Why do we do this — quieter, smaller */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-[68ch] text-center md:mt-20">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
              Why do we do this?
            </div>
            <p className="mt-5 font-serif text-xl italic text-brand-charcoal/70 md:text-2xl">
              Our primary purpose is not to make money. Our main objective is to
              bring diverse people together — from different communities,
              cultures, and backgrounds — and help them explore together, enjoy
              together, and create lifelong memories and lasting connections…
              together.
            </p>
            <div className="mt-5 text-[12.5px] text-brand-charcoal/55">
              That&apos;s all we&apos;re here for. Full stop.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-brand-charcoal/15 first:border-l-0">
      <div className="text-[8.5px] uppercase tracking-[0.28em] text-brand-charcoal/45">
        {label}
      </div>
      <div className="mt-1 font-mono text-[12.5px] tracking-widest text-brand-ink">
        {value}
      </div>
    </div>
  );
}
