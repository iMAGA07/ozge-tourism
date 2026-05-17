"use client";
import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { services, type ServiceIcon } from "@/data/content";
import { cn } from "@/lib/utils";

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

// One distinctive photo per service to back the hover/tap reveal.
const servicePhotos: Record<ServiceIcon, string> = {
  users: "IMG_6160.jpg",       // private group tours
  city: "IMG_2972.jpg",        // city tours (Karagandy sign)
  map: "IMG_6075.jpg",         // regional tours (group on steppe)
  mountain: "IMG_2600_3.jpg",  // outdoor activities (Burabay)
  landmark: "IMG_8742.jpg",    // cultural (yurt interior)
  car: "IMG_1751.jpg",         // transportation (open road)
  briefcase: "IMG_2957.jpg",   // corporate/embassy (formal building)
  graduation: "IMG_2799.jpg",  // university programs (group)
  plane: "IMG_3873.jpg",       // flights
  camera: "IMG_5398_2.jpg",    // content creation
  headset: "IMG_2332_3.jpg",   // 24/7 concierge
};

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-brand-mist py-24 md:py-36"
    >
      {/* Subtle radial accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(224,160,57,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Our services"
          title="Adventures of"
          italic="all kinds."
          lead="We offer adventures of all kinds across Kazakhstan and Central Asia — including but not limited to:"
        />

        {/* Desktop: image-reveal mosaic */}
        <div className="mt-14 hidden grid-cols-2 gap-3 sm:grid lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 6) * 0.04}>
              <ServiceTile service={s} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Mobile: vertical accordion list with image expand */}
        <MobileServicesList />
      </div>
    </section>
  );
}

function ServiceTile({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = iconMap[service.icon];
  const photo = servicePhotos[service.icon];

  return (
    <article
      data-cursor="hover"
      className={cn(
        "group relative isolate flex h-full min-h-[280px] flex-col overflow-hidden rounded-md border border-brand-charcoal/10 bg-brand-paper",
        "transition-all duration-700 ease-smooth hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(20,15,10,0.18)]"
      )}
    >
      {/* Background photo, revealed on hover */}
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-smooth group-hover:opacity-100">
        <Image
          src={`/photos/${photo}`}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover scale-110 transition-transform duration-1000 ease-smooth group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/65 to-brand-ink/30" />
      </div>

      <div className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500",
              "border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta",
              "group-hover:border-brand-saffron/40 group-hover:bg-brand-saffron/15 group-hover:text-brand-saffron"
            )}
          >
            <Icon strokeWidth={1.5} className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "font-mono text-[11px] tracking-wider transition-colors duration-500",
              "text-brand-charcoal/40 group-hover:text-brand-cream/60"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "mt-6 font-display text-[17px] font-medium leading-snug tracking-tight transition-colors duration-500",
            "text-brand-ink group-hover:text-brand-cream"
          )}
        >
          {service.title}
        </h3>

        {service.desc && (
          <p
            className={cn(
              "mt-3 text-[13px] leading-relaxed transition-colors duration-500",
              "text-brand-charcoal/70 group-hover:text-brand-cream/80"
            )}
          >
            {service.desc}
          </p>
        )}

        {/* Hover-only CTA pinned to bottom */}
        <div className="mt-auto pt-6">
          <div
            className={cn(
              "inline-flex translate-y-2 items-center gap-2 text-[12px] font-medium opacity-0 transition-all duration-500",
              "text-brand-saffron group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            Talk to us
            <span>→</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function MobileServicesList() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="mt-12 sm:hidden">
      <ul className="overflow-hidden rounded-md border border-brand-charcoal/15 divide-y divide-brand-charcoal/12">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon];
          const isOpen = open === i;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 bg-brand-paper px-4 py-4 text-left active:bg-white"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    isOpen
                      ? "border-brand-terracotta bg-brand-terracotta text-brand-paper"
                      : "border-brand-terracotta/25 bg-brand-terracotta/5 text-brand-terracotta"
                  )}
                >
                  <Icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1">
                  <span className="font-mono text-[10px] tracking-widest text-brand-charcoal/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block font-display text-[16px] font-medium leading-snug text-brand-ink">
                    {s.title}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 text-xl text-brand-charcoal/50"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="px-4 pb-5 pt-1">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                        <Image
                          src={`/photos/${servicePhotos[s.icon]}`}
                          alt=""
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/65 to-transparent p-4">
                          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-saffron">
                            Service · {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                      {s.desc && (
                        <p className="mt-4 text-[13.5px] leading-relaxed text-brand-charcoal/80">
                          {s.desc}
                        </p>
                      )}
                      <a
                        href="#book"
                        className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-brand-terracotta"
                      >
                        Talk to us
                        <span>→</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
