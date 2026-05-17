"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/lib/utils";

// Visual decoration per option — a big stat or symbol that anchors each spread.
const visuals: Array<{
  big: React.ReactNode;
  legend: string;
  photo: string;
  tint: string;
}> = [
  {
    big: <span className="font-display text-[140px] leading-none md:text-[220px]">★</span>,
    legend: "Standard rate",
    photo: "IMG_2799.jpg",
    tint: "from-brand-cream",
  },
  {
    big: (
      <span className="flex items-end gap-1 font-display leading-none">
        <AnimatedNumber to={10} duration={1400} />
        <span className="pb-3 text-5xl md:pb-8 md:text-7xl">%</span>
        <span className="pb-4 text-2xl text-brand-terracotta md:pb-12 md:text-4xl">↓</span>
      </span>
    ),
    legend: "Market beating",
    photo: "IMG_3858.jpg",
    tint: "from-brand-saffron/10",
  },
  {
    big: (
      <span className="flex items-baseline gap-2 font-display leading-none">
        <AnimatedNumber to={0} duration={900} />
        <span className="text-5xl md:text-7xl">/100</span>
      </span>
    ),
    legend: "Pay as you enjoy",
    photo: "IMG_3873.jpg",
    tint: "from-brand-terracotta/15",
  },
];

export function Pricing() {
  const [active, setActive] = useState(0);
  const current = pricing[active];
  const visual = visuals[active];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="How our pricing works"
          title="Three flexible options"
          italic="ahead of you."
          lead="Luckily for you, pricing is the last thing you need to worry about when adventuring with us. Why? Simply because you have three very flexible options ahead of you."
          align="center"
          className="text-center"
        />

        {/* Option selector — vertical "tape" of three buttons */}
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
                  <span className="font-display text-[13.5px] font-medium leading-snug md:text-[15px]">
                    {p.title.split(" ").slice(0, 4).join(" ")}
                  </span>
                  <span
                    className={cn(
                      "mt-2 h-[2px] w-full origin-left transition-all duration-700",
                      isActive ? "scale-x-100 bg-brand-saffron" : "scale-x-0 bg-transparent"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Editorial spread */}
        <Reveal delay={0.15}>
          <div
            className={cn(
              "relative mt-8 overflow-hidden rounded-md border border-brand-charcoal/10 bg-brand-paper md:mt-10",
              "min-h-[420px] md:min-h-[520px]"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "grid md:grid-cols-12",
                  "bg-gradient-to-br",
                  visual.tint,
                  "to-transparent"
                )}
              >
                {/* Big symbol panel */}
                <div className="relative col-span-12 flex h-[200px] items-center justify-center overflow-hidden border-b border-brand-charcoal/10 md:col-span-5 md:h-auto md:border-b-0 md:border-r">
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src={`/photos/${visual.photo}`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center text-brand-ink"
                  >
                    {visual.big}
                    <span className="mt-3 text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                      {visual.legend}
                    </span>
                  </motion.div>
                </div>

                {/* Copy panel */}
                <div className="col-span-12 flex flex-col p-7 md:col-span-7 md:p-12">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-brand-terracotta/70">
                      {current.label}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest text-brand-charcoal/40">
                      0{active + 1} / 03
                    </span>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 font-display text-3xl font-light leading-tight tracking-tight text-brand-ink md:text-5xl"
                  >
                    {current.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 max-w-[58ch] text-[14.5px] leading-relaxed text-brand-charcoal/80 md:text-[15.5px]"
                  >
                    {current.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-auto pt-8"
                  >
                    <a
                      href="#book"
                      data-cursor="hover"
                      data-cursor-label="Choose"
                      className="group inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-[13px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta"
                    >
                      Choose this option
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle slider strip */}
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

        {/* Why do we do this? */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-[72ch] text-center md:mt-20">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
              Why do we do this?
            </div>
            <p className="mt-5 font-serif text-2xl italic text-brand-charcoal/85 md:text-3xl">
              Our logic is simple: through Ozge Tourism, our primary purpose is not
              to make money. Our main objective is to bring diverse people together
              — from different communities, cultures, and backgrounds — and help
              them explore together, enjoy together, and create lifelong memories
              and lasting connections… together.
            </p>
            <div className="mt-5 text-[14px] text-brand-charcoal/70">
              That's all we're here for. Full stop.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
