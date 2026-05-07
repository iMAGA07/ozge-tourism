"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { faq } from "@/data/content";
import { Plus } from "lucide-react";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Questions"
          title="Quietly answered."
          align="center"
          className="text-center"
        />

        <div className="mt-12 divide-y divide-brand-charcoal/15 border-y border-brand-charcoal/15">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-brand-terracotta"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-medium tracking-tight text-brand-ink md:text-xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-charcoal"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[14.5px] leading-relaxed text-brand-charcoal/80">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
