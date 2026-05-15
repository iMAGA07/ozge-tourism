"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { whyUs } from "@/data/content";

// Hand-picked photo for each reason — revealed on row hover (desktop) or
// when the row is in view on mobile.
const reasonPhotos = [
  "IMG_2799.jpg",  // 24/7
  "IMG_5616_2.jpg",// multilingual guides
  "IMG_7140.jpg",  // comprehensive packages (yurt meal)
  "IMG_6919.jpg",  // any adventure (yurt at sunset)
  "IMG_6160.jpg",  // track record (large group)
  "IMG_3797.jpg",  // institutions (museum)
  "IMG_3858.jpg",  // authentic experiences (deer/group)
];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
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
        {/* Section header */}
        <div className="grid gap-6 md:grid-cols-12 md:gap-12">
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
                adventures, we are at your service. Here are some of the reasons
                why you should choose us:
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial list with hover-reveal preview */}
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ul className="border-t border-brand-charcoal/15">
              {whyUs.map((w, i) => {
                const isActive = active === i;
                return (
                  <li
                    key={w.title}
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive((a) => (a === i ? null : a))}
                    onFocus={() => setActive(i)}
                    className="group border-b border-brand-charcoal/15"
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      aria-label={w.title}
                      className="flex w-full items-start gap-6 py-7 text-left md:py-9"
                      data-cursor="hover"
                    >
                      <span
                        className={[
                          "shrink-0 font-display text-3xl font-light leading-none transition-all duration-500 md:text-4xl",
                          isActive
                            ? "text-brand-terracotta translate-x-1"
                            : "text-brand-charcoal/40",
                        ].join(" ")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={[
                            "font-display text-xl font-medium tracking-tight transition-colors duration-500 md:text-2xl",
                            isActive ? "text-brand-ink" : "text-brand-charcoal/85",
                          ].join(" ")}
                        >
                          {w.title}
                        </h3>
                        {w.desc && (
                          <p
                            className={[
                              "mt-2 max-w-[58ch] text-[14px] leading-relaxed transition-all duration-500 md:text-[14.5px]",
                              isActive
                                ? "opacity-100 max-h-[200px] mt-3"
                                : "opacity-60 max-h-[60px] overflow-hidden",
                              "text-brand-charcoal/75",
                            ].join(" ")}
                          >
                            {w.desc}
                          </p>
                        )}
                      </div>
                      <span
                        className={[
                          "shrink-0 self-center text-2xl transition-all duration-500 md:text-3xl",
                          isActive
                            ? "text-brand-terracotta translate-x-1 opacity-100"
                            : "text-brand-charcoal/30 opacity-50",
                        ].join(" ")}
                      >
                        →
                      </span>
                    </button>

                    {/* Mobile inline image preview */}
                    <div
                      className={[
                        "md:hidden overflow-hidden transition-all duration-700 ease-smooth",
                        isActive ? "max-h-[420px] mb-6 opacity-100" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                        <Image
                          src={`/photos/${reasonPhotos[i % reasonPhotos.length]}`}
                          alt=""
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop sticky preview column */}
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <motion.div
                style={{ y: previewY }}
                className="relative aspect-[3/4] overflow-hidden rounded-md bg-brand-mist"
              >
                <AnimatePresence mode="wait">
                  {active !== null ? (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                  ) : (
                    <motion.div
                      key="resting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`/photos/${reasonPhotos[0]}`}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-5">
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-white/80">
                    Reason · {String((active ?? 0) + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-sm text-white">
                    {whyUs[active ?? 0].title}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bold promise */}
        <Reveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-md border border-brand-terracotta/30 bg-gradient-to-br from-brand-saffron/12 via-transparent to-brand-terracotta/10 p-7 md:p-10">
            <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4 font-display text-3xl font-light tracking-tight text-brand-ink md:text-5xl">
                Our bold{" "}
                <span className="font-serif italic text-brand-terracotta">promise.</span>
              </div>
              <p className="md:col-span-8 max-w-[62ch] text-[14.5px] leading-relaxed text-brand-charcoal/85">
                We want you to feel completely confident in choosing us. If at any
                point you genuinely feel that your experience does not meet your
                expectations or is not worth what you paid, we will gladly provide
                a <strong>full refund — no questions asked</strong>.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
