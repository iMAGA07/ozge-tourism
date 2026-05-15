"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "map", label: "Discover" },
  { id: "adventures", label: "Adventures" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why us" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about", label: "About" },
  { id: "book", label: "Book" },
];

/**
 * Vertical section progress indicator on the right edge of desktop viewports.
 * Click a dot to jump to that section. The active dot expands and shows the
 * section label. Hidden on mobile.
 */
export function SectionProgress() {
  const [active, setActive] = useState("home");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.4);
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the upper third of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.3) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.3)
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.3, 0.6, 1] }
    );
    targets.forEach((t) => io.observe(t));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.aside
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
          aria-hidden="true"
        >
          <ul className="pointer-events-auto flex flex-col gap-2.5">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-cursor="hover"
                    className="group flex items-center gap-2"
                  >
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-[0.28em] text-brand-ink/0 transition-colors duration-300",
                        isActive && "text-brand-ink/70",
                        "group-hover:text-brand-ink/70"
                      )}
                    >
                      {s.label}
                    </span>
                    <span
                      className={cn(
                        "h-[1px] transition-all duration-500 ease-smooth",
                        isActive
                          ? "w-7 bg-brand-terracotta"
                          : "w-3 bg-brand-ink/35 group-hover:w-5 group-hover:bg-brand-ink/70"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/**
 * Sticky bottom "Book" CTA visible on mobile after scrolling past the hero.
 * Hides when the lead form is in view so it doesn't overlap the form itself.
 */
export function StickyBookCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const beyondHero = window.scrollY > window.innerHeight * 0.6;
      const form = document.getElementById("book");
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      const formInView = formTop < window.innerHeight - 80;
      setShown(beyondHero && !formInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-4 z-40 mx-auto flex justify-center px-4 lg:hidden"
        >
          <a
            href="#book"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-ink px-6 py-3.5 text-[13px] font-medium text-brand-cream shadow-[0_10px_40px_rgba(20,15,10,0.25)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-saffron opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-saffron" />
            </span>
            Book an adventure
            <span className="transition-transform duration-500 group-active:translate-x-0.5">→</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
