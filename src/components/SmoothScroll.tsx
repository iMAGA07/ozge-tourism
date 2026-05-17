"use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only enable smooth scroll on devices with a fine pointer (desktop).
    // On touch devices the native momentum scroll works perfectly, and
    // wiring Lenis into touch can interfere with tap/click events
    // (notably the mobile hamburger on iOS Safari).
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReduced || !hasFinePointer) return;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      }) as unknown as { raf: (t: number) => void; destroy: () => void };

      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
