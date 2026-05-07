"use client";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section className="relative bg-brand-mist py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="From travelers"
          italic="who've been with us."
          lead="Words from real guests after real adventures across Kazakhstan and Central Asia."
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {testimonials.map((t, i) => (
            <Reveal key={t} delay={Math.min(i, 5) * 0.05}>
              <figure className="mb-5 break-inside-avoid overflow-hidden rounded-md border border-brand-charcoal/10 bg-white shadow-[0_2px_30px_rgba(20,15,10,0.04)]">
                <div className="relative w-full">
                  <Image
                    src={`/testimonials/${t}`}
                    alt="Guest testimonial"
                    width={1200}
                    height={1200}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
