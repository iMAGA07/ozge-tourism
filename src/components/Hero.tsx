"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RevealText } from "./Reveal";
import { Magnetic } from "./Magnetic";

// Five cinematic frames that crossfade slowly in the background. Each has
// its own object-position so the strongest part of the photo stays in view.
const heroFrames = [
  { src: "IMG_0898.jpg", position: "center 38%", label: "Horseback · Steppe" },
  { src: "IMG_3882.jpg", position: "center 28%", label: "Burabay · Akmola" },
  { src: "IMG_2600_3.jpg", position: "center 22%", label: "Sacred lakes · Akmola" },
  { src: "IMG_7140.jpg", position: "center 50%", label: "Yurt · Family table" },
  { src: "IMG_6585.jpg", position: "center 30%", label: "Karkaraly · Karaganda" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  // Cross-fade between hero frames every 6s.
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((i) => (i + 1) % heroFrames.length), 6000);
    return () => clearInterval(id);
  }, []);
  const active = heroFrames[frame];

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-brand-ink"
    >
      {/* Cross-fading photo layers */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={frame}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={`/photos/${active.src}`}
              alt=""
              fill
              priority={frame === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: active.position }}
              quality={88}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.40)_85%)]" />

      {/* Frame-progress dots */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {heroFrames.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Hero frame ${i + 1}`}
            onClick={() => setFrame(i)}
            className="h-6 w-[2px] overflow-hidden rounded-full bg-white/25"
            data-cursor="hover"
          >
            <motion.span
              animate={{
                height: i === frame ? "100%" : "30%",
                backgroundColor: i === frame ? "#e0a039" : "rgba(255,255,255,0.6)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block w-full"
            />
          </button>
        ))}
      </motion.div>

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

        <h1 className="fluid-h1 max-w-[16ch] font-display font-light text-white">
          <RevealText text="Explore. Enjoy." delay={0.1} />
          <span className="block font-serif italic font-normal text-brand-saffron">
            <RevealText text="Connect." delay={0.22} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[60ch] text-[11.5px] uppercase tracking-[0.22em] text-white/80 sm:text-[13px] sm:tracking-[0.24em]"
        >
          Tours · Outdoor Adventures · Logistics &amp; Transportation · Bookings
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[58ch] fluid-lead text-white/85"
        >
          Join us to experience and enjoy the very best of Kazakhstan and
          Central Asia — from majestic landscapes and thrilling outdoor
          adventures to rich history and vibrant cultures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.18}>
            <a
              href="#book"
              data-cursor="hover"
              data-cursor-label="Book"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-brand-ink transition-all duration-500 hover:bg-white"
            >
              <span>Book an adventure</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href="#map"
              data-cursor="hover"
              data-cursor-label="Map"
              className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-ink"
            >
              Discover the map
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10"
      >
        <motion.div
          style={{ y: labelY }}
          className="hidden md:block text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">In frame</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1 text-sm"
            >
              {active.label}
            </motion.div>
          </AnimatePresence>
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
          <div className="mt-1 text-sm">Kazakhstan &amp; Central Asia</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
