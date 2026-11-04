"use client";
import { MotionConfig } from "framer-motion";

// Animations automatically switch off for visitors who ask their OS for
// reduced motion — the site stays fully usable without them.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
