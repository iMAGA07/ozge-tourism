"use client";
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

        {/* Desktop / tablet: clean 2-up → 3-up grid */}
        <ul className="mt-14 hidden gap-px overflow-hidden rounded-md bg-brand-charcoal/15 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} delay={Math.min(i, 6) * 0.04}>
                <li
                  data-cursor="hover"
                  className="group relative flex h-full flex-col bg-brand-paper p-7 transition-colors duration-500 hover:bg-white md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-terracotta group-hover:text-brand-paper">
                      <Icon strokeWidth={1.5} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] tracking-wider text-brand-charcoal/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-medium leading-snug tracking-tight text-brand-ink md:text-[19px]">
                    {s.title}
                  </h3>
                  {s.desc && (
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-charcoal/75">
                      {s.desc}
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-brand-charcoal/10" />
                    <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-brand-terracotta opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Talk to us · <span>→</span>
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* Mobile: horizontal snap carousel */}
        <div className="mt-14 sm:hidden -mx-6">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <Reveal key={s.title} delay={Math.min(i, 3) * 0.04}>
                  <article className="relative flex w-[78vw] snap-center shrink-0 flex-col overflow-hidden rounded-md border border-brand-charcoal/15 bg-brand-paper p-6">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta">
                        <Icon strokeWidth={1.5} className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-brand-charcoal/40">
                        {String(i + 1).padStart(2, "0")} / {services.length}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[19px] font-medium leading-snug tracking-tight text-brand-ink">
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
