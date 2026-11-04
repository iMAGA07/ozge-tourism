"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className={`relative inline-grid align-bottom ${className ?? ""}`}>
      {/* invisible longest word reserves width so the line doesn't jump */}
      <span aria-hidden className="invisible col-start-1 row-start-1">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          aria-hidden
          className="col-start-1 row-start-1"
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
