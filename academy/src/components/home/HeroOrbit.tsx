"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, CalendarCheck2, PenLine, Users } from "lucide-react";
import { useEffect, type CSSProperties } from "react";

// The hero illustration: the logo's gold crescent and dotted arc become
// orbits, with languages and exams circling an open book. Continuous
// rotation is pure CSS (cheap, GPU-composited); the pointer parallax and
// entrance use Framer Motion. All of it stops for reduced-motion users.
const outer = ["English", "中文", "Қазақша", "Français", "Русский", "AI"];
const inner = ["IELTS", "SAT", "TOEFL", "GRE", "GMAT"];

/** `radius` is a fraction (0–1) of the container's half-width. */
function Ring({ items, radius, duration, reverse, tone }: { items: string[]; radius: number; duration: number; reverse?: boolean; tone: "light" | "dark" }) {
  return (
    <div className="orbit-ring absolute inset-0" data-reverse={reverse ? "" : undefined} style={{ "--orbit-dur": `${duration}s` } as CSSProperties}>
      {items.map((label, i) => (
        <span key={label} className="orbit-item" style={{ "--a": `${(360 / items.length) * i}deg`, "--r": `${radius * 50}cqw` } as CSSProperties}>
          <span
            className={
              tone === "light"
                ? "inline-flex whitespace-nowrap rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-[0_10px_24px_-14px_rgba(10,31,56,0.5)]"
                : "inline-flex whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[11.5px] font-bold tracking-wide text-gold"
            }
          >
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

export function HeroOrbit() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const backX = useTransform(sx, (v) => v * -14);
  const backY = useTransform(sy, (v) => v * -14);
  const frontX = useTransform(sx, (v) => v * 22);
  const frontY = useTransform(sy, (v) => v * 22);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative mx-auto aspect-square w-[84%] max-w-[560px] sm:w-full"
      aria-hidden
    >
      {/* soft glow */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(237,190,58,0.35),rgba(36,112,189,0.12)_45%,transparent_70%)] blur-2xl" />

      <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
        {/* crescent — from the logo */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-orbit" style={{ animationDuration: "80s" }}>
          <defs>
            <linearGradient id="crescent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F6D978" />
              <stop offset="1" stopColor="#D9A51C" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="148" fill="none" stroke="url(#crescent)" strokeWidth="16" strokeLinecap="round" strokeDasharray="560 370" transform="rotate(110 200 200)" />
        </svg>
        {/* dotted arc — from the logo */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-orbit-rev">
          <circle cx="200" cy="200" r="186" fill="none" stroke="#1559A0" strokeOpacity=".45" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.5 11" />
          <circle cx="200" cy="200" r="104" fill="none" stroke="#0A1F38" strokeOpacity=".12" strokeWidth="1" />
        </svg>
      </motion.div>

      <Ring items={outer} radius={0.93} duration={70} tone="light" />
      <Ring items={inner} radius={0.52} duration={55} reverse tone="dark" />

      {/* the open book */}
      {/* centred by grid, not translate — Framer's parallax owns the transform */}
      <motion.div style={{ x: frontX, y: frontY }} className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative grid h-28 w-28 place-items-center rounded-[2rem] bg-white shadow-[0_30px_60px_-24px_rgba(10,31,56,0.55)] ring-1 ring-ink/5 sm:h-32 sm:w-32">
          <BookOpen className="h-12 w-12 text-brand sm:h-14 sm:w-14" strokeWidth={1.6} />
          <PenLine className="absolute -right-2 -top-2 h-9 w-9 rotate-12 rounded-full bg-ink p-2 text-gold shadow-lg" strokeWidth={2} />
        </div>
      </motion.div>

      {/* floating facts */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute -left-2 bottom-[14%] hidden sm:left-0 sm:block">
        <div className="card flex animate-floaty items-center gap-3 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-100 text-gold-600"><CalendarCheck2 className="h-5 w-5" /></span>
          <span className="text-left">
            <span className="block text-[13px] font-bold text-ink">Free intro call</span>
            <span className="block text-[11.5px] text-ink/55">15 min · with an instructor</span>
          </span>
        </div>
      </motion.div>
      <motion.div style={{ x: backX, y: backY }} className="absolute -right-2 top-[10%] hidden sm:right-0 sm:block">
        <div className="card flex animate-floaty items-center gap-3 px-4 py-3" style={{ animationDelay: "-3s" }}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand"><Users className="h-5 w-5" /></span>
          <span className="text-left">
            <span className="block text-[13px] font-bold text-ink">Groups of 8 max</span>
            <span className="block text-[11.5px] text-ink/55">or one-to-one</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
