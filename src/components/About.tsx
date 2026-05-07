"use client";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { photos } from "@/data/photos";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="About us"
              title="Who we are."
              lead="Ozge Tourism is a division of Ozge LTD, registered in 2025 at the Astana International Financial Centre. We were founded with one mission: to help nature lovers and adventure seekers experience the very best of Kazakhstan and Central Asia."
            />
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                <Stat label="Founded" value="2025 · AIFC" />
                <Stat label="Tours run" value="100+" />
                <Stat label="Countries" value="5+ across Central Asia" />
                <Stat label="Languages" value="EN · RU · KZ + more" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <Reveal className="col-span-7">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={`/photos/${photos.family.src}`}
                    alt="Travel family"
                    fill
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-cover"
                    style={{ objectPosition: photos.family.position }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1} className="col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                  <Image
                    src={`/photos/${photos.cuisine.src}`}
                    alt="Authentic cuisine"
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: photos.cuisine.position }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.15} className="col-span-12">
                <div className="rounded-md border border-brand-charcoal/15 bg-white p-7 md:p-9">
                  <h3 className="font-display text-xl font-medium tracking-tight text-brand-ink md:text-2xl">
                    Where we operate
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-brand-charcoal/80 sm:grid-cols-3">
                    <li>· Kazakhstan</li>
                    <li>· Uzbekistan</li>
                    <li>· Kyrgyzstan</li>
                    <li>· Tajikistan</li>
                    <li>· Turkmenistan</li>
                    <li>· Afghanistan</li>
                    <li>· Iran</li>
                    <li>· & beyond</li>
                  </ul>
                  <div className="mt-6 grid gap-1 text-[13.5px] text-brand-charcoal/75 md:grid-cols-2">
                    <div>
                      <span className="text-brand-charcoal/50">Email · </span>
                      <a href={`mailto:${site.email}`} className="hover:text-brand-terracotta">
                        {site.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-brand-charcoal/50">Phone · </span>
                      <a href={site.whatsapp} className="hover:text-brand-terracotta">
                        {site.phone}
                      </a>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-brand-charcoal/50">Address · </span>
                      {site.address}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-brand-charcoal/15 pt-3">
      <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
        {label}
      </div>
      <div className="mt-1.5 font-display text-lg font-medium tracking-tight text-brand-ink md:text-[19px]">
        {value}
      </div>
    </div>
  );
}
