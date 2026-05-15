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
          eyebrow="Upcoming Adventures"
          title="Scheduled Adventures"
          italic="of May 2026 — Choose Yours!"
          lead="Our major group adventures for May. We also run one-day & special outdoor activities (minor adventures) announced weekly or a few days in advance, and private & exclusive adventures any day, any week, any season — tailored just for you."
        />

        <div className="mt-14 grid gap-6 md:gap-10 lg:grid-cols-2 items-stretch">
          {/* Weekend adventures */}
          <Reveal className="h-full">
            <div className="relative h-full flex flex-col overflow-hidden rounded-md border border-brand-charcoal/10 bg-white p-7 md:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-saffron/15 blur-3xl" />
              <div className="relative flex flex-col h-full">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
                  Weekend Adventures
                </div>
                <h3 className="mt-3 font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                  Kazakhstan · 2–3 Days
                </h3>

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

                <div className="mt-auto pt-8">
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-brand-terracotta hover:text-brand-ink transition-colors"
                  >
                    Reserve a weekend
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Long adventures */}
          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full flex flex-col overflow-hidden rounded-md bg-brand-ink p-7 md:p-10 text-brand-cream">
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
              <div className="relative flex flex-col h-full">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                  Week-Long All-Inclusive Adventures
                </div>
                <h3 className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl">
                  Central Asia · 10 Days
                </h3>

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

                <div className="mt-auto pt-8">
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-saffron px-5 py-2.5 text-[13px] font-medium text-brand-ink transition-all hover:bg-white"
                  >
                    Reserve your place
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-md border border-brand-charcoal/10 bg-brand-paper p-6 md:p-8">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
              Please note
            </div>
            <ul className="mt-4 grid gap-4 text-[14px] leading-relaxed text-brand-charcoal/80 md:grid-cols-3">
              <li>
                These are ONLY our major group adventures for May. As usual, we
                will also have our one-day & special outdoor activities (minor
                adventures) which will be announced weekly or a few days in advance.
              </li>
              <li>
                We also organize private & exclusive adventures anytime and
                anywhere across Central Asia for you, your family, or organization
                — any day, any week, any season — tailored just for you.
              </li>
              <li>
                Choose your style: fully equipped camping under the stars or
                usual hotel accommodation — both available for all adventures.
              </li>
            </ul>
            <p className="mt-6 border-t border-brand-charcoal/10 pt-5 text-[14px] text-brand-charcoal/75">
              For reservations and more details of any of the adventures above,
              please contact us at{" "}
              <a href="mailto:info@ozgetourism.com" className="text-brand-terracotta hover:text-brand-ink">
                info@ozgetourism.com
              </a>{" "}
              or directly at{" "}
              <a href="https://wa.me/77757145327" className="text-brand-terracotta hover:text-brand-ink">
                +7 775 714 53 27
              </a>{" "}
              (WhatsApp & Telegram — Mohammad). See you soon on one — or maybe
              all — of our adventures! 😊
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
