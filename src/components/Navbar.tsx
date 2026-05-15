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

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navItems.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors duration-500",
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-[64px] z-40 overflow-y-auto"
            style={{ backgroundColor: "#fbf8f1" }}
          >
            {/* Subtle ambient accent */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-saffron/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-brand-terracotta/15 blur-3xl" />

            <nav className="relative flex flex-col px-6 py-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6 flex items-baseline justify-between"
              >
                <span className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                  Menu
                </span>
                <span className="font-mono text-[10px] tracking-widest text-brand-charcoal/40">
                  01 / {String(navItems.length).padStart(2, "0")}
                </span>
              </motion.div>

              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + 0.05 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between border-b border-brand-charcoal/12 py-5 active:bg-brand-mist/50"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-widest text-brand-terracotta/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[26px] font-light tracking-tight text-brand-ink">
                      {item.label}
                    </span>
                  </span>
                  <span className="text-xl text-brand-charcoal/40 transition-all group-active:translate-x-1 group-active:text-brand-terracotta">
                    →
                  </span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 rounded-md border border-brand-charcoal/10 bg-white p-5"
              >
                <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                  Contact us
                </div>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="mt-2 block text-[14px] font-medium text-brand-ink"
                >
                  {site.email}
                </a>
                <a
                  href={site.whatsapp}
                  onClick={() => setOpen(false)}
                  className="mt-1 block text-[14px] font-medium text-brand-ink"
                >
                  {site.phone}
                </a>
                <div className="mt-3 text-[12px] text-brand-charcoal/55">
                  WhatsApp · Telegram · Email
                </div>
              </motion.div>

              <motion.a
                href="#book"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.55 }}
                className="mt-5 inline-flex items-center justify-center gap-3 rounded-full bg-brand-ink py-4 text-[14px] font-medium text-brand-cream"
              >
                Book an adventure
                <span>→</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
