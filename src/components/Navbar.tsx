"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // When at the very top of the page we sit on top of the dark hero photo —
  // use light text. After scroll, we switch to a light cream surface and
  // use the dark ink color.
  const onHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-smooth",
        scrolled
          ? "backdrop-blur-md bg-brand-paper/85 border-b border-brand-mist/60"
          : "bg-gradient-to-b from-black/30 via-black/10 to-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-10">
        <a href="#home" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ozge Tourism"
            width={44}
            height={44}
            className="h-9 w-9 md:h-10 md:w-10 object-contain"
            priority
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-[15px] font-semibold tracking-tight transition-colors duration-500",
                onHero ? "text-white" : "text-brand-ink"
              )}
            >
              Ozge Tourism
            </span>
            <span
              className={cn(
                "mt-1.5 text-[10px] uppercase tracking-[0.32em] transition-colors duration-500",
                onHero ? "text-white/70" : "text-brand-charcoal/55"
              )}
            >
              Central Asia
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-500",
                onHero
                  ? "text-white/85 hover:text-white"
                  : "text-brand-charcoal/80 hover:text-brand-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-medium tracking-wide transition-colors duration-500",
              onHero
                ? "bg-white text-brand-ink hover:bg-brand-saffron"
                : "bg-brand-ink text-brand-cream hover:bg-brand-terracotta"
            )}
          >
            Book an adventure
            <span className="text-brand-terracotta">→</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className={cn(
              "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500",
              onHero
                ? "border-white/40 text-white"
                : "border-brand-charcoal/15 text-brand-ink"
            )}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-[64px] bg-brand-paper/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-6 py-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-brand-mist/70 py-4 font-display text-2xl tracking-tight text-brand-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-8 flex flex-col gap-2 text-sm text-brand-charcoal/80">
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={site.whatsapp}>{site.phone}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
