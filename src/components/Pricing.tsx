"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";
import { cn } from "@/lib/utils";

// Each option gets a cinematic destination photo + a typographic statement
// overlaid in the top corner. No cheap symbols, no faded backdrops.
const visuals = [
  {
    photo: "IMG_2799.jpg",
    position: "center 28%",
    statement: "The standard.",
    sub: "Most affordable for the value.",
    accent: "brand-saffron",
  },
  {
    photo: "IMG_3858.jpg",
    position: "center 30%",
    statement: "10% less\nthan the market.",
    sub: "Whatever you find, we beat it.",
    accent: "brand-saffron",
  },
  {
    photo: "IMG_3873.jpg",
    position: "center 30%",
    statement: "Pay only if\nyou love it.",
    sub: "Don't enjoy it? Don't pay.",
    accent: "brand-saffron",
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

        {/* Option selector */}
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

        {/* Cinematic editorial spread */}
        <Reveal delay={0.15}>
          <div className="relative mt-8 overflow-hidden rounded-md border border-brand-charcoal/10 bg-brand-ink md:mt-10">
            <div className="grid md:grid-cols-12">
              {/* Photo half — cinematic, no faded overlay */}
              <div className="relative col-span-12 h-[320px] overflow-hidden md:col-span-6 md:h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`photo-${active}`}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/photos/${visual.photo}`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: visual.position }}
                    />
                    {/* Cinematic gradients, never wash the photo out */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/35 via-transparent to-brand-ink/55" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/30 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Typographic statement overlaid */}
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
                      {visual.statement.split("\n").map((line, idx) =>
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
                    <div className="mt-4 text-[13px] uppercase tracking-[0.28em] text-brand-cream/75 md:text-[14px]">
                      {visual.sub}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Discrete frame indicator */}
                <div className="absolute bottom-5 left-6 z-10 flex gap-1.5 md:left-10 md:bottom-7">
                  {pricing.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-[2px] transition-all duration-500",
                        i === active ? "w-7 bg-brand-saffron" : "w-3 bg-brand-cream/30"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Copy half — clean cream surface, generous whitespace */}
              <div className="col-span-12 flex flex-col bg-brand-paper p-7 text-brand-ink md:col-span-6 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`copy-${active}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-1 flex-col"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] tracking-widest text-brand-terracotta/80">
                        How it works
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-brand-charcoal/40">
                        0{active + 1} / 03
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-light leading-tight tracking-tight md:text-4xl">
                      {current.title}
                    </h3>

                    <p className="mt-5 max-w-[58ch] text-[14.5px] leading-relaxed text-brand-charcoal/80 md:text-[15.5px]">
                      {current.desc}
                    </p>

                    {/* Visual reinforcement: 3 nano-features per option */}
                    <ul className="mt-7 grid gap-2 border-t border-brand-charcoal/10 pt-5 text-[13px] text-brand-charcoal/75">
                      {(
                        [
                          // Option 1
                          [
                            "Fully transparent — no surprises",
                            "Best value for the package provided",
                            "Pay once, travel worry-free",
                          ],
                          // Option 2
                          [
                            "Send us the competing price",
                            "We match it and take 10% off",
                            "Confirmed on the spot",
                          ],
                          // Option 3
                          [
                            "No upfront commitment",
                            "Pay as you experience the trip",
                            "Don't enjoy? Don't pay. Simple.",
                          ],
                        ] as const
                      )[active].map((line) => (
                        <li key={line} className="flex items-start gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-terracotta" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <a
                        href="#book"
                        data-cursor="hover"
                        data-cursor-label="Choose"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-[13px] font-medium text-brand-cream transition-all hover:bg-brand-terracotta"
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

            {/* Slim active-section slider rail */}
            <div className="flex h-1 bg-brand-paper">
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
              That&apos;s all we&apos;re here for. Full stop.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
