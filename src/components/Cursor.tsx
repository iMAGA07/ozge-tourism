"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Editorial cursor: a small ink dot that follows the pointer, and a soft
 * cream ring that magnetizes around hoverable targets (anchors, buttons,
 * elements with [data-cursor]). Auto-disables on touch devices.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [variant, setVariant] = useState<"default" | "hover" | "drag">("default");
  const [enabled, setEnabled] = useState(false);
  const labelRef = useRef("");

  const ringX = useSpring(x, { damping: 22, stiffness: 220, mass: 0.7 });
  const ringY = useSpring(y, { damping: 22, stiffness: 220, mass: 0.7 });
  const dotX = useSpring(x, { damping: 30, stiffness: 700, mass: 0.4 });
  const dotY = useSpring(y, { damping: 30, stiffness: 700, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || prefersReduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], [data-cursor='hover'], input, textarea, select"
      );
      if (interactive) {
        const label = (interactive as HTMLElement).dataset.cursorLabel;
        labelRef.current = label ?? "";
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };
    const down = () => setVariant("drag");
    const up = (e: PointerEvent) => {
      over(e);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      >
        <motion.div
          animate={{
            width: variant === "hover" ? 56 : variant === "drag" ? 22 : 32,
            height: variant === "hover" ? 56 : variant === "drag" ? 22 : 32,
            opacity: variant === "drag" ? 0.6 : 1,
            backgroundColor:
              variant === "hover" ? "rgba(176,75,47,0.12)" : "rgba(26,20,16,0)",
            borderColor:
              variant === "hover" ? "rgba(176,75,47,0.55)" : "rgba(26,20,16,0.5)",
          }}
          transition={{ type: "spring", damping: 24, stiffness: 240, mass: 0.6 }}
          className="-ml-4 -mt-4 rounded-full border backdrop-blur-[2px]"
          style={{ width: 32, height: 32 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      >
        <motion.div
          animate={{
            scale: variant === "hover" ? 0 : variant === "drag" ? 1.4 : 1,
            backgroundColor: "#1a1410",
          }}
          transition={{ type: "spring", damping: 24, stiffness: 380 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
        />
      </motion.div>
    </>
  );
}
