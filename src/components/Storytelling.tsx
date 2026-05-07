"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { storyTiles } from "@/data/photos";
import { Reveal } from "./Reveal";

export function Storytelling() {
  return (
    <section className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
              <span className="h-[1px] w-8 bg-brand-terracotta/60" />
              Field journal
            </span>
            <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
              Postcards from{" "}
              <span className="font-serif italic font-normal text-brand-terracotta">
                the road.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="fluid-lead text-brand-charcoal/80">
                Real moments from real adventures. No staged photoshoots — just the
                landscapes, people and quiet hours that make Kazakhstan unforgettable.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {storyTiles.map((tile, i) => (
            <StoryCard key={tile.title} {...tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  img,
  position,
  title,
  sub,
  index,
}: {
  img: string;
  position?: string;
  title: string;
  sub: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Reveal delay={index * 0.05}>
      <div
        ref={ref}
        className="group relative overflow-hidden rounded-md bg-brand-ink"
      >
        <motion.div style={{ y }} className="relative aspect-[4/5] w-full">
          <Image
            src={`/photos/${img}`}
            alt={title}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover transition-transform duration-[1500ms] ease-smooth group-hover:scale-[1.04]"
            style={{ objectPosition: position ?? "center" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-saffron">
            № {String(index + 1).padStart(2, "0")}
          </div>
          <div className="mt-2 font-display text-2xl font-light text-white">
            {title}
          </div>
          <div className="mt-1 text-[13px] text-white/80">{sub}</div>
        </div>
      </div>
    </Reveal>
  );
}
