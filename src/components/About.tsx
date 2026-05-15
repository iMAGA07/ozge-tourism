"use client";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { AnimatedNumber } from "./AnimatedNumber";
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
              lead="Ozge Tourism is a division of Ozge LTD, officially registered in 2025 at the Astana International Financial Centre (AIFC), Kazakhstan. We were founded with a clear mission: to help nature lovers and adventure seekers discover and experience the very best of Kazakhstan and Central Asia. From majestic landscapes and thrilling adventures to rich history and vibrant cultures, our goal is to provide premium, safe, and meaningful travel experiences, fully customized for individuals and solo travelers, families and friends, groups and student communities, organizations and teams, and international guests."
            />
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="border-t border-brand-charcoal/15 pt-3">
                  <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                    Founded
                  </div>
                  <div className="mt-1.5 font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                    <AnimatedNumber to={2025} duration={1600} />{" "}
                    <span className="font-serif italic text-[0.6em] text-brand-terracotta">
                      AIFC
                    </span>
                  </div>
                </div>
                <div className="border-t border-brand-charcoal/15 pt-3">
                  <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                    Tours run
                  </div>
                  <div className="mt-1.5 font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                    <AnimatedNumber to={100} duration={1400} suffix="+" />
                  </div>
                </div>
                <div className="border-t border-brand-charcoal/15 pt-3">
                  <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                    Countries
                  </div>
                  <div className="mt-1.5 font-display text-3xl font-light tracking-tight text-brand-ink md:text-4xl">
                    <AnimatedNumber to={7} duration={1200} suffix="+" />
                  </div>
                </div>
                <div className="border-t border-brand-charcoal/15 pt-3">
                  <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-charcoal/55">
                    Languages
                  </div>
                  <div className="mt-1.5 font-display text-[19px] font-medium tracking-tight text-brand-ink md:text-[21px]">
                    EN · RU · KZ + more
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-md h-full">
                  <Image
                    src={`/photos/${photos.family.src}`}
                    alt="Travel family"
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: photos.family.position }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-md h-full">
                  <Image
                    src={`/photos/${photos.cuisine.src}`}
                    alt="Authentic cuisine"
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: photos.cuisine.position }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.12} className="col-span-2 mt-2">
                <div className="rounded-md border border-brand-charcoal/15 bg-brand-paper p-7 md:p-9">
                  <h3 className="font-display text-xl font-medium tracking-tight text-brand-ink md:text-2xl">
                    What can we help you with?
                  </h3>
                  <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-brand-charcoal/80">
                    <p>
                      At Ozge Tourism, we organize exceptional and fully customized
                      tours, trips, adventures, and retreats across Kazakhstan and
                      Central Asia. Whether you are looking for a one-day trip, a
                      weekend getaway, or a multi-day cultural or nature-focused
                      journey — such as visiting ancient cities or exploring
                      mountains, lakes, canyons, and national parks — we design
                      every experience according to your interests.
                    </p>
                    <p>
                      We also offer a wide range of exciting outdoor activities,
                      including, but not limited to, horse riding, archery, target
                      shooting, cycling, camping, hiking, paragliding, skiing,
                      snowboarding, and winter snow adventures, depending on the
                      season and location.
                    </p>
                    <p>
                      In addition, we organize professional retreats and
                      team-building programs, including corporate retreats,
                      leadership and academic retreats, student and youth camps,
                      and strategic off-site planning retreats for schools,
                      universities, and organizations. To ensure a smooth and
                      comfortable travel experience, we also assist with flight
                      bookings, reservations, and all necessary travel
                      arrangements across Kazakhstan and Central Asia.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15} className="col-span-2 mt-2">
                <div className="rounded-md border border-brand-charcoal/15 bg-white p-7 md:p-9">
                  <h3 className="font-display text-xl font-medium tracking-tight text-brand-ink md:text-2xl">
                    Where we operate
                  </h3>
                  <p className="mt-3 text-[13.5px] text-brand-charcoal/70">
                    We offer services across Central Asia, including:
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-brand-charcoal/80 sm:grid-cols-3">
                    <li>· Kazakhstan</li>
                    <li>· Uzbekistan</li>
                    <li>· Kyrgyzstan</li>
                    <li>· Tajikistan</li>
                    <li>· Turkmenistan</li>
                    <li>· Other regional destinations</li>
                    <li>· Afghanistan</li>
                    <li>· Iran</li>
                    <li>· & beyond</li>
                  </ul>
                  <div className="mt-8 grid gap-px overflow-hidden rounded-md bg-brand-charcoal/10 sm:grid-cols-3">
                    <div className="bg-white p-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                        Email
                      </div>
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-2 block break-all font-display text-[14.5px] font-medium text-brand-ink hover:text-brand-terracotta"
                      >
                        {site.email}
                      </a>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                        Phone · WhatsApp · Telegram
                      </div>
                      <a
                        href={site.whatsapp}
                        className="mt-2 block font-display text-[14.5px] font-medium text-brand-ink hover:text-brand-terracotta"
                      >
                        {site.phone}
                      </a>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                        Office · Astana
                      </div>
                      <div className="mt-2 text-[13.5px] leading-snug text-brand-ink">
                        {site.address}
                      </div>
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

