"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { AnimatedNumber } from "./AnimatedNumber";
import { whyUs } from "@/data/content";
import { cn } from "@/lib/utils";

const reasonPhotos = [
  "IMG_2799.jpg",
  "IMG_5616_2.jpg",
  "IMG_7140.jpg",
  "IMG_6919.jpg",
  "IMG_6160.jpg",
  "IMG_3797.jpg",
  "IMG_3858.jpg",
];

const metrics = [
  { v: 24, suffix: "/7", label: "On-call concierge" },
  { v: 100, suffix: "+", label: "Adventures delivered" },
  { v: 7, suffix: "+", label: "Countries covered" },
  { v: 5, suffix: "★", label: "Guest rating" },
];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
                <span className="h-[1px] w-8 bg-brand-terracotta/60" />
                Why choose us
              </span>
              <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
                A trusted partner,{" "}
                <span className="font-serif italic font-normal text-brand-terracotta">
                  at your service.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <p className="fluid-lead text-brand-charcoal/80">
                If you want to experience Central Asia at its best with a trusted
                partner committed to excellence, authenticity, and unforgettable
                adventures, we are at your service.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Metrics ticker */}
        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-brand-charcoal/10 sm:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className="bg-brand-paper p-5 md:p-7">
                <div className="font-display text-4xl font-light tracking-tight text-brand-ink md:text-6xl">
                  <AnimatedNumber to={m.v} duration={1400 + i * 100} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Editorial reasons */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-14">
          {/* Sticky preview column */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="mb-4 hidden items-center justify-between md:flex">
                  <span className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
                    Reason {String(active + 1).padStart(2, "0")} / {String(whyUs.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-widest text-brand-charcoal/40">
                    Hover to explore
                  </span>
                </div>

                <motion.div
                  style={{ y: previewY }}
                  className="relative aspect-[4/5] overflow-hidden rounded-md bg-brand-mist md:aspect-[3/4]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`/photos/${reasonPhotos[active % reasonPhotos.length]}`}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
                      In view
                    </div>
                    <div className="mt-1 max-w-[28ch] font-display text-base font-medium leading-snug text-brand-cream md:text-lg">
                      {whyUs[active].title}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>

          {/* Reasons list */}
          <div className="order-1 md:order-2 md:col-span-7">
            <ol className="border-t border-brand-charcoal/15">
              {whyUs.map((w, i) => {
                const isActive = active === i;
                return (
                  <li
                    key={w.title}
                    className="group border-b border-brand-charcoal/15"
                  >
                    <button
                      type="button"
                      onPointerEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      data-cursor="hover"
                      className="flex w-full items-start gap-5 py-6 text-left md:gap-7 md:py-8"
                    >
                      <span
                        className={cn(
                          "shrink-0 font-display font-light leading-none transition-all duration-700 ease-smooth",
                          "text-[44px] md:text-[64px]",
                          isActive
                            ? "translate-x-1 text-brand-terracotta"
                            : "text-brand-charcoal/30"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={cn(
                            "font-display font-medium leading-snug tracking-tight transition-colors duration-500",
                            "text-[18px] md:text-[22px]",
                            isActive ? "text-brand-ink" : "text-brand-charcoal/80"
                          )}
                        >
                          {w.title}
                        </h3>
                        <AnimatePresence initial={false}>
                          {w.desc && isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden text-[14px] leading-relaxed text-brand-charcoal/75 md:text-[14.5px]"
                            >
                              <span className="mt-2.5 block">{w.desc}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <span
                        className={cn(
                          "self-center text-xl transition-all duration-500 md:text-2xl",
                          isActive
                            ? "translate-x-1 text-brand-terracotta"
                            : "text-brand-charcoal/30"
                        )}
                      >
                        →
                      </span>
                    </button>

                    {/* Mobile inline preview */}
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden md:hidden"
                      >
                        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-md">
                          <Image
                            src={`/photos/${reasonPhotos[i % reasonPhotos.length]}`}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Bold promise as editorial pull-quote */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid items-center gap-8 md:mt-24 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
                Our bold promise
              </div>
              <div className="mt-4 font-display text-4xl font-light tracking-tight text-brand-ink md:text-7xl">
                Don't love it?{" "}
                <span className="block font-serif italic text-brand-terracotta md:mt-2">
                  Don't pay.
                </span>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="rounded-md border-l-2 border-brand-terracotta bg-brand-mist/40 p-6 md:p-8">
                <p className="text-[15.5px] leading-relaxed text-brand-charcoal/85 md:text-[16.5px]">
                  We want you to feel completely confident in choosing us. If at
                  any point you genuinely feel that your experience does not
                  meet your expectations or is not worth what you paid, we will
                  gladly provide a{" "}
                  <strong>full refund — no questions asked</strong>.
                </p>
                <div className="mt-5 flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                  <span className="h-[1px] w-8 bg-brand-charcoal/40" />
                  Mohammad · Founder
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
