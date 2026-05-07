"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { photos } from "@/data/photos";

const stats = [
  { v: "2,724,900", k: "km² of wild beauty" },
  { v: "9th", k: "largest country on Earth" },
  { v: "80+", k: "nationalities visa-free" },
  { v: "5", k: "countries we cover" },
];

export function WhyKazakhstan() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why Kazakhstan"
              title="A country of"
              italic="impossible scale."
              lead="From the chalk valleys of Mangystau to the alpine lakes of the Tian Shan, Kazakhstan offers the kind of landscapes most travelers never knew existed — and a hospitality that feels straight from the Silk Road."
            />

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
              {stats.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.05}>
                  <div className="border-t border-brand-charcoal/15 pt-4">
                    <div className="font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[12.5px] uppercase tracking-[0.18em] text-brand-charcoal/60">
                      {s.k}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <Reveal className="col-span-7 row-span-2">
                <motion.div
                  style={{ y }}
                  className="relative aspect-[3/4] overflow-hidden rounded-md"
                >
                  <Image
                    src={`/photos/${photos.mountain.src}`}
                    alt="Burabay national park"
                    fill
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-cover"
                    style={{ objectPosition: photos.mountain.position }}
                  />
                </motion.div>
              </Reveal>
              <Reveal delay={0.1} className="col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={`/photos/${photos.desert.src}`}
                    alt="Granite peaks"
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: photos.desert.position }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.2} className="col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={`/photos/${photos.lake.src}`}
                    alt="Mountain lake"
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: photos.lake.position }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
