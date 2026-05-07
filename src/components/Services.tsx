"use client";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { services } from "@/data/content";

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-brand-mist py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Our services"
          title="Adventures of"
          italic="every kind."
          lead="From a quiet weekend in the mountains to fully managed corporate expeditions across five countries, every Ozge experience is built around you."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-md bg-brand-charcoal/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 6) * 0.04}>
              <article className="group relative h-full bg-brand-paper p-7 md:p-9 transition-colors duration-500 hover:bg-white">
                <div className="font-mono text-[11px] tracking-wider text-brand-charcoal/50">
                  {String(i + 1).padStart(2, "0")} —
                </div>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-brand-ink md:text-[22px]">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-charcoal/75">
                  {s.desc}
                </p>
                <div className="mt-6 h-px w-full bg-brand-charcoal/10" />
                <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-brand-terracotta opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Talk to us
                  <span>→</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
