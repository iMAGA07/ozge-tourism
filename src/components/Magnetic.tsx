"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wraps a child so it subtly pulls toward the cursor when hovered (desktop
 * only). Adds the kind of high-end micro-interaction that separates premium
 * sites from templates. Hidden behavior on touch devices.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 200, mass: 0.5 });
  const sy = useSpring(y, { damping: 18, stiffness: 200, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
