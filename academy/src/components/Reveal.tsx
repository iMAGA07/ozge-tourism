"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

/** Fades content up as it scrolls into view. Disabled for reduced-motion users. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
