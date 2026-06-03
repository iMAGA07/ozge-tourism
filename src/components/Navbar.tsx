"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { navItems, site } from "@/data/site";
import { WhatsAppIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastToggleAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // iOS-safe scroll lock: save current scroll position, pin body via
  // position: fixed (NOT overflow:hidden, which iOS sometimes ignores or
  // resets to top), restore on unlock.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Stable toggle that ignores double-fires within 220 ms (iOS sometimes
  // fires pointerup AND click for the same physical tap).
  const toggle = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleAt.current < 220) return;
    lastToggleAt.current = now;
    setOpen((v) => !v);
  }, []);

  // Document-level capture handler — fires before any other element on top
  // could intercept. This is the bulletproof path for the hamburger when
  // scrolled, where some Safari builds drop the on-element click.
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const btn = buttonRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }
    };
    document.addEventListener("pointerup", handler, { capture: true });
    return () =>
      document.removeEventListener("pointerup", handler, { capture: true });
  }, [toggle]);

  const closeMenu = useCallback(() => setOpen(false), []);

  // When at the very top of the page we sit on top of the dark hero photo —
  // use light text. After scroll, we switch to a light cream surface and
  // use the dark ink color.
  const onHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ease-smooth",
        // NOTE: we deliberately avoid backdrop-blur on the scrolled state.
        // Some iOS Safari builds stop hit-testing children inside a
        // backdrop-filtered fixed element, which made the hamburger button
        // fail to register taps once the user scrolled.
        scrolled
          ? "bg-brand-paper border-b border-brand-mist/60"
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-2.5 py-2 text-[12.5px] font-medium transition-colors duration-500",
                onHero
                  ? "text-white/85 hover:text-white"
                  : "text-brand-charcoal/80 hover:text-brand-ink"
              )}
            >
              {item.short ?? item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Always-visible contact cluster (header is fixed) */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-1.5 rounded-full border py-1 pl-3 pr-1 transition-colors duration-500",
              onHero ? "border-white/30 bg-white/10" : "border-brand-charcoal/15 bg-brand-paper"
            )}
          >
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
                onHero ? "text-white/80" : "text-brand-charcoal/60"
              )}
            >
              Contact
            </span>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
                onHero
                  ? "bg-white/15 text-white hover:bg-brand-saffron hover:text-brand-ink"
                  : "bg-brand-ink/5 text-brand-ink hover:bg-brand-terracotta hover:text-brand-cream"
              )}
            >
              <WhatsAppIcon className="h-[17px] w-[17px]" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email us"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
                onHero
                  ? "bg-white/15 text-white hover:bg-brand-saffron hover:text-brand-ink"
                  : "bg-brand-ink/5 text-brand-ink hover:bg-brand-terracotta hover:text-brand-cream"
              )}
            >
              <Mail className="h-[17px] w-[17px]" />
            </a>
          </div>
          <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              cursor: "pointer",
            }}
            className={cn(
              "lg:hidden relative z-[80] inline-flex h-12 w-12 items-center justify-center rounded-full border",
              onHero
                ? "border-white/55 bg-white/15 text-white"
                : "border-brand-charcoal/25 bg-brand-paper text-brand-ink"
            )}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
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
            // overflow-x-hidden is critical: child links animate from x:30,
            // which would otherwise create a horizontal scroll axis the
            // user could swipe.
            className="lg:hidden fixed inset-0 top-[64px] z-40 overflow-x-hidden overflow-y-auto overscroll-contain"
            style={{
              backgroundColor: "#fbf8f1",
              WebkitOverflowScrolling: "touch",
            }}
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
                  WhatsApp · Email
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.55 }}
                className="mt-5 grid grid-cols-2 gap-3"
              >
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink py-4 text-[13.5px] font-medium text-brand-cream"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-charcoal/20 py-4 text-[13.5px] font-medium text-brand-ink"
                >
                  <Mail className="h-[18px] w-[18px]" />
                  Email
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
