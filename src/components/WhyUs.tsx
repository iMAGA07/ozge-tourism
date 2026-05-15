"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { whyUs } from "@/data/content";
import { photos } from "@/data/photos";

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="why" ref={ref} className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why choose us"
              title="A trusted partner,"
              italic="at your service."
              lead="If you want to experience Central Asia at its best with a trusted partner committed to excellence, authenticity, and unforgettable adventures, we are at your service. Here are some of the reasons why you should choose us:"
            />

            <Reveal delay={0.2}>
              <div className="mt-10 overflow-hidden rounded-md">
                <motion.div style={{ y }} className="relative aspect-[4/5] w-full">
                  <Image
                    src={`/photos/${photos.guide.src}`}
                    alt="On a tour with our team"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: photos.guide.position }}
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-md bg-brand-charcoal/10 sm:grid-cols-2">
              {whyUs.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.04}>
                  <li className="h-full bg-brand-paper p-6 md:p-7">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-terracotta/40 text-[11px] font-semibold text-brand-terracotta">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[15px] font-medium tracking-tight text-brand-ink md:text-[16px] leading-snug">
                          {w.title}
                        </h3>
                        {w.desc && (
                          <p className="mt-1.5 text-[13.5px] leading-relaxed text-brand-charcoal/75">
                            {w.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-8 overflow-hidden rounded-md border border-brand-terracotta/30 bg-gradient-to-br from-brand-saffron/12 via-transparent to-brand-terracotta/10 p-7 md:p-9">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                  <div className="font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                    Our bold promise.
                  </div>
                  <p className="max-w-[60ch] text-[14.5px] leading-relaxed text-brand-charcoal/85">
                    We want you to feel completely confident in choosing us. If at
                    any point you genuinely feel that your experience does not meet
                    your expectations or is not worth what you paid, we will gladly
                    provide a <strong>full refund — no questions asked</strong>.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
