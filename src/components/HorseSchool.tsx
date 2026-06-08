"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Languages,
  Package,
  Car,
  Users,
  Compass,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealText } from "./Reveal";

type Feature = {
  icon: LucideIcon;
  title: string;
  sub: string;
};

// Distilled from the client's brief — tight, scannable, on-brand.
const features: Feature[] = [
  {
    icon: Languages,
    title: "English-speaking instructor",
    sub: "Professional coaching, beginner to advanced.",
  },
  {
    icon: Package,
    title: "Fully all-inclusive kit",
    sub: "Helmet, boots, gloves — everything provided.",
  },
  {
    icon: Car,
    title: "Business-class door-to-door",
    sub: "Home pick-up & drop-off included.",
  },
  {
    icon: Users,
    title: "Every level · ages 7+",
    sub: "From your very first ride.",
  },
];

const WA_TEXT =
  "Hi! I'd like to learn more about the Professional Horse Riding School in Astana.";

export function HorseSchool() {
  return (
    <section
      id="horse-school"
      className="relative overflow-hidden bg-brand-ink py-20 text-brand-cream md:py-28"
    >
      {/* Warm radial glow + faint grain for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 bg-[radial-gradient(circle,rgba(177,74,46,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── Photo panel ─────────────────────────────────────────── */}
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[4/5]">
              <Image
                src="/photos/IMG_0898.jpg"
                alt="Riders on horseback across the Kazakh steppe"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center 35%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/30 to-transparent" />

              {/* Floating glass badge — top */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-md md:left-5 md:top-5">
                <span className="text-base leading-none">🏇</span>
                <span className="text-[11px] font-medium tracking-wide text-white">
                  Astana · All-inclusive
                </span>
              </div>

              {/* Floating "new location" tag — bottom */}
              <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-brand-ink/55 px-4 py-3 backdrop-blur-md">
                  <Compass strokeWidth={1.7} className="h-5 w-5 shrink-0 text-brand-saffron" />
                  <p className="text-[12.5px] leading-snug text-white/90">
                    A different riding location{" "}
                    <span className="font-medium text-white">every class</span> —
                    steppe to forest, all across Astana.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Content ─────────────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-saffron/40 bg-brand-saffron/10 px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.3em] text-brand-saffron">
                <Sparkles strokeWidth={1.8} className="h-3 w-3" />
                New · Professional School
              </span>
            </Reveal>

            <h2 className="fluid-h2 mt-6 font-display font-light text-brand-cream">
              <RevealText text="Horse Riding School" />
              <span className="block font-serif italic font-normal text-brand-saffron">
                <RevealText text="in the heart of Astana." delay={0.1} />
              </span>
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-brand-cream/75 md:text-base">
                Truly professional riding lessons — an experienced,
                English-speaking instructor and a fully all-inclusive package,
                designed for everyone from complete beginners to advanced riders,
                ages 7 and up.
              </p>
            </Reveal>

            {/* Feature rows */}
            <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={0.2 + i * 0.06}>
                    <div className="flex items-start gap-3.5">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-saffron/15 text-brand-saffron ring-1 ring-brand-saffron/25">
                        <Icon strokeWidth={1.7} className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium leading-snug text-brand-cream">
                          {f.title}
                        </div>
                        <div className="mt-0.5 text-[12.5px] leading-snug text-brand-cream/55">
                          {f.sub}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* CTAs */}
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#book"
                  data-cursor="hover"
                  data-cursor-label="Enroll"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-saffron px-7 py-3.5 text-[13.5px] font-medium text-brand-ink transition-all duration-500 hover:bg-white"
                >
                  Enroll now
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={`https://wa.me/77757145327?text=${encodeURIComponent(WA_TEXT)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-brand-cream/30 px-7 py-3.5 text-[13.5px] font-medium text-brand-cream/90 transition-all duration-500 hover:border-brand-cream/70 hover:text-brand-cream"
                >
                  Ask about the school
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
