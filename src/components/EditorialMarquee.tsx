"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const places = [
  { name: "Almaty", photo: "IMG_2799.jpg" },
  { name: "Mangystau", photo: "IMG_3858.jpg" },
  { name: "Burabay", photo: "IMG_3882.jpg" },
  { name: "Astana", photo: "IMG_2972.jpg" },
  { name: "Charyn", photo: "IMG_8134.jpg" },
  { name: "Altai", photo: "IMG_6919.jpg" },
  { name: "Karkaraly", photo: "IMG_6585.jpg" },
  { name: "Kolsai", photo: "IMG_3716.jpg" },
  { name: "Karagandy", photo: "IMG_2972.jpg" },
  { name: "Steppe", photo: "IMG_0898.jpg" },
];

/**
 * A massive editorial running marquee. On desktop, hovering a place
 * reveals a floating photograph of that destination. On mobile, the names
 * scroll continuously — a wordless, cinematic way to suggest scope.
 */
export function EditorialMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const items = [...places, ...places];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-hidden="true"
      className="relative overflow-hidden border-y border-brand-mist/70 bg-brand-paper py-10 md:py-14"
    >
      <div className="absolute inset-x-0 top-3 text-center text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/45 md:top-5">
        Across Kazakhstan &amp; Central Asia
      </div>
      <div className="flex w-max animate-marquee gap-8 will-change-transform md:gap-14">
        {items.map((p, i) => (
          <a
            key={i}
            href="#map"
            data-cursor="hover"
            data-cursor-label={p.name}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            className={cn(
              "group relative flex shrink-0 items-center gap-6 font-display font-light italic transition-colors duration-500",
              "text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight",
              hover !== null && hover !== i
                ? "text-brand-charcoal/30"
                : "text-brand-ink"
            )}
          >
            <span className="font-mono text-[10px] font-normal not-italic tracking-widest text-brand-terracotta/70">
              {String((i % places.length) + 1).padStart(2, "0")}
            </span>
            <span className="font-serif">{p.name}</span>
            <span className="h-2 w-2 rounded-full bg-brand-terracotta/70" />
          </a>
        ))}
      </div>

      <AnimatePresence>
        {hover !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              left: pointer.x,
              top: pointer.y,
            }}
            className="pointer-events-none absolute z-20 hidden h-[220px] w-[160px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md shadow-2xl lg:block"
          >
            <Image
              src={`/photos/${items[hover].photo}`}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
