"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";
import { cn } from "@/lib/utils";

// Travel-pass visuals per option: a destination photo, a typographic
// statement, and a customs-style stamp (rotated, hand-printed).
const passes = [
  {
    photo: "IMG_2799.jpg",
    position: "center 28%",
    statement: "The standard.",
    italic: "Best value, always.",
    stamp: { label: "Standard\nrate", color: "saffron", rotate: -8 },
    pricing: "Most affordable for the value",
    bullets: [
      "Transparent — no surprises",
      "Best value for the package",
      "Pay once, travel worry-free",
    ],
  },
  {
    photo: "IMG_3858.jpg",
    position: "center 30%",
    statement: "10% less\nthan the market.",
    italic: "Whatever you find, we beat it.",
    stamp: { label: "−10%\noff", color: "terracotta", rotate: 6 },
    pricing: "Beat any competitor by 10%",
    bullets: [
      "Send us the competing price",
      "We match it and take 10% off",
      "Confirmed on the spot",
    ],
  },
  {
    photo: "IMG_3873.jpg",
    position: "center 30%",
    statement: "Pay only if\nyou love it.",
    italic: "Don't enjoy it? Don't pay.",
    stamp: { label: "Pay as you\nenjoy", color: "ink", rotate: -5 },
    pricing: "Zero upfront commitment",
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
          <div className="relative mt-8 overflow-hidden rounded-md border border-brand-charcoal/15 bg-brand-paper md:mt-10">
            {/* Top header strip — like a real boarding pass */}
            <header className="flex items-center justify-between border-b border-dashed border-brand-charcoal/30 px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55 md:px-8">
              <span className="font-mono">Ozge Tourism · Travel pass</span>
              <span className="font-mono text-brand-terracotta">
                № {String(active + 1).padStart(2, "0")} / 03
              </span>
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

              {/* Right info column — like a ticket stub */}
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
                    <div className="space-y-3 border-b border-dashed border-brand-charcoal/25 pb-5 text-[9px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                      <div className="flex items-baseline justify-between">
                        <span>From</span>
                        <span className="font-mono text-[12px] tracking-wider text-brand-ink">
                          YOU
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span>To</span>
                        <span className="font-mono text-[12px] tracking-wider text-brand-ink">
                          ADVENTURE
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span>Pricing</span>
                        <span className="font-mono text-[12px] tracking-wider text-brand-terracotta">
                          {pass.pricing}
                        </span>
                      </div>
                    </div>

                    <h4 className="mt-5 font-display text-lg font-medium leading-snug text-brand-ink md:text-xl">
                      {current.title}
                    </h4>

                    <p className="mt-3 text-[12.5px] leading-relaxed text-brand-charcoal/65 md:text-[13px]">
                      {current.desc}
                    </p>

                    <ul className="mt-5 space-y-2 text-[12.5px] text-brand-charcoal/70">
                      {pass.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-terracotta" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Barcode + CTA */}
                    <div className="mt-auto pt-6">
                      <div className="flex h-7 items-end gap-[1px]">
                        {barcodes[active].map((w, j) => (
                          <div
                            key={j}
                            style={{ width: `${w}px` }}
                            className="h-full bg-brand-ink"
                          />
                        ))}
                      </div>
                      <a
                        href="#book"
                        data-cursor="hover"
                        data-cursor-label="Choose"
                        className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-[13px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta"
                      >
                        Choose this option
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
