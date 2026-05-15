"use client";
import Image from "next/image";
import {
  Users,
  Building2,
  Map,
  Mountain,
  Landmark,
  Car,
  Briefcase,
  GraduationCap,
  Plane,
  Camera,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { services, type ServiceIcon } from "@/data/content";
import { galleryStrip } from "@/data/photos";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  users: Users,
  city: Building2,
  map: Map,
  mountain: Mountain,
  landmark: Landmark,
  car: Car,
  briefcase: Briefcase,
  graduation: GraduationCap,
  plane: Plane,
  camera: Camera,
  headset: Headphones,
};

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-brand-mist py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Our services"
          title="Adventures of"
          italic="all kinds."
          lead="We offer adventures of all kinds across Kazakhstan and Central Asia — including but not limited to:"
        />

        {/* Desktop editorial grid */}
        <ul className="mt-14 hidden grid-cols-12 gap-px overflow-hidden rounded-md bg-brand-charcoal/15 md:grid">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            // Mixed-size grid: vary span across rows so cards feel editorial,
            // not template-y. The first row has a wide hero card.
            const span =
              i === 0
                ? "col-span-12 lg:col-span-6"
                : i === 1
                ? "col-span-12 lg:col-span-3"
                : i === 2
                ? "col-span-12 lg:col-span-3"
                : i % 4 === 3
                ? "col-span-6 lg:col-span-3"
                : "col-span-6 lg:col-span-3";
            const featured = i === 0;
            return (
              <Reveal key={s.title} delay={Math.min(i, 6) * 0.04}>
                <li
                  className={[
                    "group relative h-full overflow-hidden bg-brand-paper p-7 md:p-9",
                    "transition-colors duration-700 hover:bg-white",
                    span,
                  ].join(" ")}
                  data-cursor="hover"
                >
                  {featured && (
                    <div className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      <Image
                        src={`/photos/${galleryStrip[i % galleryStrip.length]}`}
                        alt=""
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-paper via-brand-paper/85 to-brand-paper/50" />
                    </div>
                  )}
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta transition-colors duration-500 group-hover:bg-brand-terracotta group-hover:text-brand-paper">
                        <Icon strokeWidth={1.5} className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-brand-charcoal/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={[
                        "mt-6 font-display font-medium tracking-tight text-brand-ink leading-snug",
                        featured ? "text-2xl md:text-3xl" : "text-lg md:text-[19px]",
                      ].join(" ")}
                    >
                      {s.title}
                    </h3>
                    {s.desc && (
                      <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-brand-charcoal/75">
                        {s.desc}
                      </p>
                    )}
                    {featured && (
                      <div className="mt-7 inline-flex items-center gap-2 text-[12.5px] font-medium text-brand-terracotta">
                        Talk to us · <span>→</span>
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* Mobile horizontal snap carousel */}
        <div className="mt-14 md:hidden -mx-6">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <Reveal key={s.title} delay={Math.min(i, 3) * 0.04}>
                  <article className="relative w-[78vw] snap-center shrink-0 overflow-hidden rounded-md border border-brand-charcoal/15 bg-brand-paper p-6">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta">
                        <Icon strokeWidth={1.5} className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-brand-charcoal/40">
                        {String(i + 1).padStart(2, "0")} / {services.length}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[19px] font-medium tracking-tight text-brand-ink leading-snug">
                      {s.title}
                    </h3>
                    {s.desc && (
                      <p className="mt-3 text-[13.5px] leading-relaxed text-brand-charcoal/75">
                        {s.desc}
                      </p>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-3 px-6 text-center text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/45">
            Swipe ←→
          </div>
        </div>
      </div>
    </section>
  );
}
