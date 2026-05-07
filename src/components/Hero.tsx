"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "./Reveal";
import { photos } from "@/data/photos";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-brand-ink"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={`/photos/${photos.hero.src}`}
          alt="Horses on the Kazakh steppe"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: photos.hero.position }}
          quality={88}
        />
      </motion.div>
      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_85%)]" />

      {/* Headline */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]), opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-md sm:text-[10.5px] sm:tracking-[0.32em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-saffron animate-pulse" />
          Central Asia · Est. 2025
        </motion.span>
        <h1 className="fluid-h1 max-w-[18ch] font-display font-light text-white">
          <RevealText text="The Kazakhstan" delay={0.1} />
          <span className="block">
            <RevealText text="you've been" delay={0.18} />
            <span className="font-serif italic font-normal text-brand-saffron">
              {" "}
              <RevealText text="dreaming of." delay={0.26} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-[42ch] fluid-lead text-white/85"
        >
          Cinematic landscapes, Silk Road heritage and bespoke adventures —
          designed for travelers who expect more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#book"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-brand-ink transition-all duration-500 hover:bg-white"
          >
            <span>Begin your journey</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#map"
            className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-ink"
          >
            Explore the map
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom info row */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">In frame</div>
          <div className="mt-1 text-sm">Horseback on the Kazakh steppe</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-[10.5px] uppercase tracking-[0.32em]">Scroll</span>
          <div className="h-9 w-[1px] overflow-hidden bg-white/25">
            <span className="block h-3 w-[1px] animate-scroll-hint bg-brand-saffron" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col items-end text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">Since 2025</div>
          <div className="mt-1 text-sm">100+ tours · 5 countries</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
