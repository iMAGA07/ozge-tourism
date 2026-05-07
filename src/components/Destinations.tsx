"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { featuredDestinations } from "@/data/photos";

export function Destinations() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Featured destinations"
          title="Six places that"
          italic="change everything."
          lead="A small, curated set of places we never get tired of returning to. Each one is enough to justify the entire trip."
        />

        {/* Desktop: large staged display */}
        <div className="mt-14 hidden lg:grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-brand-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredDestinations[active].img}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/photos/${featuredDestinations[active].img}`}
                    alt={featuredDestinations[active].name}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: featuredDestinations[active].position ?? "center" }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
                  {featuredDestinations[active].region}
                </div>
                <div className="mt-2 font-display text-4xl font-light text-white">
                  {featuredDestinations[active].name}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 flex flex-col">
            <div className="flex-1 rounded-md border border-brand-charcoal/15 bg-white p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredDestinations[active].name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
                    № {String(active + 1).padStart(2, "0")} of {featuredDestinations.length}
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-light text-brand-ink">
                    {featuredDestinations[active].name}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-brand-charcoal/80">
                    {featuredDestinations[active].blurb}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {featuredDestinations.map((d, i) => (
                <button
                  key={d.name}
                  onClick={() => setActive(i)}
                  className={[
                    "relative aspect-[4/3] overflow-hidden rounded-sm transition-all duration-500",
                    i === active
                      ? "ring-2 ring-brand-terracotta ring-offset-2 ring-offset-brand-cream opacity-100"
                      : "opacity-65 hover:opacity-100",
                  ].join(" ")}
                  aria-label={d.name}
                >
                  <Image
                    src={`/photos/${d.img}`}
                    alt={d.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal scroll cards */}
        <div className="mt-12 lg:hidden -mx-6 md:-mx-10">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-4 overflow-x-auto px-6 md:px-10 snap-x snap-mandatory pb-3"
          >
            {featuredDestinations.map((d, i) => (
              <Reveal key={d.name} delay={Math.min(i, 3) * 0.05}>
                <article className="snap-center w-[78vw] shrink-0 sm:w-[420px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                    <Image
                      src={`/photos/${d.img}`}
                      alt={d.name}
                      fill
                      sizes="80vw"
                      className="object-cover"
                      style={{ objectPosition: d.position ?? "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-saffron">
                        {d.region}
                      </div>
                      <div className="mt-1.5 font-display text-2xl font-light text-white">
                        {d.name}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-brand-charcoal/80">
                    {d.blurb}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
