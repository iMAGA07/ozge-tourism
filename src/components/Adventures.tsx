"use client";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { adventures } from "@/data/content";
import Image from "next/image";
import { photos } from "@/data/photos";

export function Adventures() {
  return (
    <section id="adventures" className="relative bg-brand-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Upcoming · May 2026"
          title="Scheduled adventures."
          italic="Choose yours."
          lead="Major group adventures across Kazakhstan and Central Asia. We also run private and exclusive trips any day, any season — fully tailored to you."
        />

        <div className="mt-14 grid gap-6 md:gap-10 lg:grid-cols-2">
          {/* Weekend adventures */}
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-brand-charcoal/10 bg-white p-7 md:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-saffron/15 blur-3xl" />
              <div className="relative">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
                  Weekend
                </div>
                <h3 className="mt-3 font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                  Kazakhstan · 2–3 days
                </h3>
                <p className="mt-3 text-[14px] text-brand-charcoal/70">
                  Quick escapes to the country's most spectacular regions.
                </p>

                <ul className="mt-7 divide-y divide-brand-charcoal/10">
                  {adventures.weekend.map((a) => (
                    <li
                      key={a.dates}
                      className="flex items-start justify-between gap-4 py-3.5"
                    >
                      <span className="font-display text-[15px] font-medium text-brand-ink">
                        {a.dates}
                      </span>
                      <span className="text-right text-[13px] text-brand-charcoal/70">
                        {a.regions.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Long adventures */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-md bg-brand-ink p-7 md:p-10 text-brand-cream">
              <div className="absolute inset-0 opacity-25">
                <Image
                  src={`/photos/${photos.golden.src}`}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                  style={{ objectPosition: photos.golden.position }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/80 to-brand-ink/55" />
              <div className="relative">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                  Week-long · all-inclusive
                </div>
                <h3 className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl">
                  Central Asia · 10 days
                </h3>
                <p className="mt-3 text-[14px] text-brand-cream/75">
                  The grand journey across five Silk Road countries.
                </p>

                <ul className="mt-7 divide-y divide-brand-cream/10">
                  {adventures.longform.map((a) => (
                    <li
                      key={a.dates}
                      className="flex items-start justify-between gap-4 py-3.5"
                    >
                      <span className="font-display text-[15px] font-medium">
                        {a.dates}
                      </span>
                      <span className="text-right text-[13px] text-brand-cream/75">
                        {a.regions.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#book"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-saffron px-5 py-2.5 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                >
                  Reserve your place
                  <span>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-6 rounded-md border border-brand-charcoal/10 bg-brand-paper p-6 md:grid-cols-3 md:p-8">
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-terracotta">
                Minor adventures
              </div>
              <p className="mt-2 text-sm text-brand-charcoal/80">
                One-day & special outdoor activities are announced weekly or a few days in advance.
              </p>
            </div>
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-terracotta">
                Private & exclusive
              </div>
              <p className="mt-2 text-sm text-brand-charcoal/80">
                Tailored adventures any day, any week, any season — for you, your family, or organization.
              </p>
            </div>
            <div>
              <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-terracotta">
                Two ways to stay
              </div>
              <p className="mt-2 text-sm text-brand-charcoal/80">
                Fully equipped camping under the stars, or premium hotel accommodation — your choice.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
