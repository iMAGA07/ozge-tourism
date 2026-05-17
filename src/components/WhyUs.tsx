"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { whyUs } from "@/data/content";
import { cn } from "@/lib/utils";

const reasonPhotos = [
  "IMG_2799.jpg",   // 24/7
  "IMG_5616_2.jpg", // multilingual guides
  "IMG_7140.jpg",   // comprehensive packages
  "IMG_6919.jpg",   // every adventure
  "IMG_6160.jpg",   // track record
  "IMG_3797.jpg",   // institutions
  "IMG_3858.jpg",   // authentic value
];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);

  // Subtle parallax on the sticky preview column
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Manifesto-style opening */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
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
              <p className="mt-7 max-w-[58ch] fluid-lead text-brand-charcoal/80">
                If you want to experience Central Asia at its best with a trusted
                partner committed to excellence, authenticity, and unforgettable
                adventures, we are at your service.
              </p>
            </Reveal>
          </div>

          {/* Inline credibility line — single editorial bar, no badges */}
          <div className="md:col-span-5 md:self-end">
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-5 border-l-2 border-brand-terracotta/60 pl-5 md:pl-6">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                  Trusted by
                </div>
                <p className="font-serif text-xl italic leading-snug text-brand-ink md:text-2xl">
                  International students, embassies, international organizations,
                  and expat communities — across Kazakhstan & Central Asia since
                  2025.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Editorial reasons — the real heart of this section */}
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-14">
          {/* Sticky preview */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="mb-4 hidden items-baseline justify-between md:flex">
                  <span className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
                    Reasons to choose us
                  </span>
                  <span className="font-mono text-[10.5px] tracking-widest text-brand-charcoal/40">
                    {String(active + 1).padStart(2, "0")} / {String(whyUs.length).padStart(2, "0")}
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

                  {/* Tasteful caption strip */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent p-5 md:p-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
                          № {String(active + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-2 font-display text-lg font-medium leading-snug text-brand-cream md:text-xl">
                          {whyUs[active].title}
                        </div>
                      </motion.div>
                    </AnimatePresence>
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
                      className="flex w-full items-start gap-5 py-7 text-left md:gap-8 md:py-9"
                    >
                      <span
                        className={cn(
                          "shrink-0 font-display font-light leading-none transition-all duration-700 ease-smooth",
                          "text-[42px] md:text-[68px]",
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
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/65 to-transparent p-4">
                            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
                              № {String(i + 1).padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Bold promise — full-bleed dark band, signature-style */}
        <Reveal delay={0.1}>
          <div className="relative mt-24 overflow-hidden rounded-md bg-brand-ink text-brand-cream md:mt-32">
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-brand-saffron/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-brand-terracotta/20 blur-3xl" />

            <div className="relative grid items-center gap-10 px-7 py-12 md:grid-cols-12 md:gap-16 md:px-14 md:py-20">
              <div className="md:col-span-7">
                <div className="text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
                  Our bold promise
                </div>
                <h3 className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">
                  Don&apos;t love it?{" "}
                  <span className="block font-serif italic text-brand-saffron md:mt-2">
                    Don&apos;t pay.
                  </span>
                </h3>
              </div>
              <div className="md:col-span-5 md:border-l md:border-brand-cream/15 md:pl-10">
                <p className="text-[15px] leading-relaxed text-brand-cream/85 md:text-[15.5px]">
                  We want you to feel completely confident in choosing us. If at
                  any point you genuinely feel that your experience does not
                  meet your expectations or is not worth what you paid, we will
                  gladly provide a{" "}
                  <span className="text-brand-saffron">full refund — no questions asked</span>.
                </p>
                <div className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-brand-cream/60">
                  <span className="h-[1px] w-10 bg-brand-saffron/60" />
                  Mohammad · Founder, Ozge Tourism
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
