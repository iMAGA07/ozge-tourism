"use client";
import { useEffect, useState } from "react";

/**
 * Detects weak / low-power devices (or a reduced-motion preference) so the UI
 * can serve a lighter version: fewer continuous animations, no blur filters,
 * no large image rotations. Capable devices keep the full experience.
 *
 * Heuristics (conservative — degrades gracefully if it guesses "low"):
 *  - prefers-reduced-motion: reduce
 *  - navigator.deviceMemory ≤ 4 GB   (Chrome / Android only)
 *  - navigator.hardwareConcurrency ≤ 3 cores
 */
export function useLowPower() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mem = (navigator as { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const weak =
      (typeof mem === "number" && mem <= 4) ||
      (typeof cores === "number" && cores <= 3);
    setLow(reduced || weak);
  }, []);
  return low;
}
