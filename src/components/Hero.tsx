"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Mountain, Plane, CalendarCheck } from "lucide-react";
import { RevealText } from "./Reveal";
import { Magnetic } from "./Magnetic";

// The four things Ozge does, shown as glass chips under the hero copy.
const offerings = [
  { icon: Compass, label: "Tours" },
  { icon: Mountain, label: "Outdoor Adventures" },
  { icon: Plane, label: "Logistics & Transport" },
  { icon: CalendarCheck, label: "Bookings" },
];

// Five cinematic frames that crossfade slowly in the background. Each has
// its own object-position so the strongest part of the photo stays in view
// (smaller Y = show more of the top, which crops the people at the bottom).
const heroFrames = [
  { src: "IMG_0898.jpg", position: "center 30%", label: "Horseback · Kazakh steppe" },
  { src: "IMG_3882.jpg", position: "center 8%", label: "Burabay · Akmola" },
  { src: "IMG_2600_3.jpg", position: "center 8%", label: "Sacred lakes · Akmola" },
  { src: "IMG_6075.jpg", position: "center 10%", label: "Open steppe" },
  { src: "IMG_6585.jpg", position: "center 12%", label: "Karkaraly · Karaganda" },
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

      {/* Cinematic overlays — darker so the cream + saffron typography always
          reads cleanly. pointer-events-none ensures they never intercept taps. */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.65)_90%)]" />

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
        <h1 className="fluid-h1 max-w-[16ch] font-display font-light text-white">
          <RevealText text="Explore. Enjoy." delay={0.05} />
          <span className="block font-serif italic font-semibold text-brand-saffron">
            <RevealText text="Connect." delay={0.18} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[52ch] text-[14px] leading-[1.5] text-white/90 sm:mt-7 sm:text-[17px] sm:leading-[1.55] md:text-[18px] lg:text-[20px] xl:text-[22px]"
        >
          Join us to experience and enjoy the very best of{" "}
          <span className="whitespace-nowrap font-serif italic font-bold text-brand-saffron">
            Kazakhstan &amp; Central Asia
          </span>{" "}
          — from majestic landscapes and thrilling outdoor adventures to rich
          history and vibrant cultures.
        </motion.p>

        {/* Four offerings as glass chips. The label gets a fixed 78px
            width on mobile so every chip's icon+text group has the same
            width — that lets `justify-center` place the icon at the
            same x-offset whether the label is one line ("Tours") or
            two ("Outdoor Adventures"). */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid w-full max-w-[520px] grid-cols-2 gap-2.5 sm:mt-7 sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
        >
          {offerings.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.05 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-saffron/60 hover:bg-white/15 sm:min-h-[60px] sm:gap-3 sm:px-3.5 sm:py-2.5"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-saffron/90 text-brand-ink sm:h-8 sm:w-8">
                  <Icon strokeWidth={1.8} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <span className="w-[80px] text-center text-[12px] font-medium leading-tight tracking-wide text-white sm:w-auto sm:text-left sm:text-[12.5px]">
                  {o.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
        >
          <Magnetic strength={0.18} className="w-full max-w-[280px] sm:w-auto sm:max-w-none">
            <a
              href="#book"
              data-cursor="hover"
              data-cursor-label="Book"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-brand-ink transition-all duration-500 hover:bg-white sm:w-[240px]"
            >
              <span>Book an adventure</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.18} className="w-full max-w-[280px] sm:w-auto sm:max-w-none">
            <a
              href="#map"
              data-cursor="hover"
              data-cursor-label="Map"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-[13.5px] font-medium tracking-wide text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-brand-ink sm:w-[240px]"
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
          className="hidden md:flex flex-col items-end text-white/75"
        >
          <div className="text-[10.5px] uppercase tracking-[0.32em]">Since 2025</div>
          <div className="mt-1 text-sm">Kazakhstan &amp; Central Asia</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
