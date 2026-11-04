"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe, Menu, PhoneCall, X } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { href } from "@/i18n";
import { localeLabels, upcomingLocales, type Locale } from "@/i18n/config";
import type { IconName } from "@/content/types";
import { DivisionIcon } from "./DivisionIcon";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

type NavDivision = { slug: string; title: string; short: string; icon: IconName; count: number };

export function Header({ locale, t, divisions }: { locale: Locale; t: Pick<Dictionary, "nav" | "cta">; divisions: NavDivision[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [mega, setMega] = useState(false); // programs menu
  const megaTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setMega(false));
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/instructors"), label: t.nav.instructors },
    { href: href(locale, "/admissions"), label: t.nav.admissions },
    { href: href(locale, "/faq"), label: t.nav.faq },
    { href: href(locale, "/contact"), label: t.nav.contact },
  ];
  const isActive = (h: string) => pathname === h || pathname.startsWith(`${h}/`);
  const programsActive = isActive(href(locale, "/programs"));

  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMega(false), 120);
  };

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-500", scrolled ? "bg-paper/85 shadow-[0_10px_30px_-24px_rgba(10,31,56,0.6)] backdrop-blur-xl" : "bg-paper/60 backdrop-blur")}>
      <div className={cn("container-site flex items-center justify-between gap-4 transition-all duration-500", scrolled ? "h-16" : "h-20")}>
        <Logo href={href(locale)} priority />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button
              type="button"
              aria-expanded={mega}
              aria-controls="mega-menu"
              onClick={() => setMega((m) => !m)}
              className={cn("inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors hover:text-brand", programsActive ? "text-brand" : "text-ink/80")}
            >
              {t.nav.programs}
              <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform duration-300", mega && "rotate-180")} />
            </button>

            <AnimatePresence>
              {mega && (
                <motion.div
                  id="mega-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3"
                >
                  <div className="card grid grid-cols-[1fr_220px] overflow-hidden p-0">
                    <ul className="grid grid-cols-2 gap-1 p-3">
                      {divisions.map((d) => (
                        <li key={d.slug}>
                          <Link href={href(locale, `/programs/${d.slug}`)} className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-50">
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                              <DivisionIcon name={d.icon} className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block text-[14px] font-semibold text-ink">{d.title}</span>
                              <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-ink/60">{d.short}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col justify-between bg-ink p-5 text-white">
                      <div>
                        <PhoneCall aria-hidden className="h-6 w-6 text-gold" />
                        <p className="mt-3 font-display text-[19px] leading-snug">Not sure where to start?</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-white/65">Talk to an instructor for 15 minutes — free.</p>
                      </div>
                      <div className="mt-5 space-y-2">
                        <Link href={href(locale, "/consultation")} className="btn-gold w-full py-2.5 text-[13px]">{t.cta.consultShort}</Link>
                        <Link href={href(locale, "/programs")} className="flex items-center justify-center gap-1 text-[13px] font-medium text-white/75 hover:text-white">
                          {t.nav.allPrograms} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={cn("relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors hover:text-brand", isActive(l.href) ? "text-brand" : "text-ink/80")}>
              {l.label}
              {isActive(l.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-gold" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} t={t} />
          <Link href={href(locale, "/consultation")} className="btn-ghost hidden px-4 py-2.5 text-[13px] xl:inline-flex">{t.cta.consultShort}</Link>
          <Link href={href(locale, "/register")} className="btn-primary hidden px-4 py-2.5 text-[13px] sm:inline-flex">{t.cta.apply}</Link>
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white lg:hidden" aria-label={t.nav.menu} aria-expanded={open} aria-controls="mobile-menu">
            <Menu aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise
          become the containing block and trap this fixed overlay inside it. */}
      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-paper"
            >
              <div className="flex h-20 items-center justify-between px-5">
                <Logo href={href(locale)} />
                <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white" aria-label={t.nav.close}>
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>
              <div className="px-5 pb-8">
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">{t.nav.programs}</p>
                <ul className="mt-3 space-y-1">
                  {divisions.map((d, i) => (
                    <motion.li key={d.slug} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                      <Link href={href(locale, `/programs/${d.slug}`)} className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-white">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand"><DivisionIcon name={d.icon} className="h-[18px] w-[18px]" /></span>
                        <span className="text-[15px] font-medium">{d.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="my-5 h-px bg-ink/10" />
                <ul className="space-y-1">
                  {[{ href: href(locale), label: t.nav.home }, ...links, { href: href(locale, "/feedback"), label: t.nav.feedback }].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-2.5 py-2.5 font-display text-[22px]">{l.label}</Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-2">
                  <Link href={href(locale, "/register")} className="btn-primary">{t.cta.apply}</Link>
                  <Link href={href(locale, "/consultation")} className="btn-ghost">{t.cta.consult}</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </header>
  );
}

function LanguageSwitcher({ locale, t }: { locale: Locale; t: Pick<Dictionary, "nav"> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t.nav.language} className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-ink/75 hover:bg-white">
        <Globe aria-hidden className="h-4 w-4" />
        {localeLabels[locale].short}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="card absolute right-0 top-full mt-2 w-48 p-1.5" role="menu">
            <li role="none">
              <span role="menuitemradio" aria-checked className="flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2 text-[13px] font-semibold text-brand">
                {localeLabels[locale].label} <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            </li>
            {upcomingLocales.map((l) => (
              <li key={l.code} role="none">
                <span role="menuitemradio" aria-checked={false} aria-disabled className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2 text-[13px] text-ink/45">
                  {l.label}
                  <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-600">{t.nav.soon}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
