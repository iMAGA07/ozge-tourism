"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { whyUs } from "@/data/content";
import { cn } from "@/lib/utils";

// Per-reason photo for the card top
const reasonPhotos = [
  "IMG_2799.jpg",   // 24/7
  "IMG_5616_2.jpg", // multilingual guides
  "IMG_7140.jpg",   // comprehensive packages
  "IMG_6919.jpg",   // every adventure
  "IMG_6160.jpg",   // track record
  "IMG_3797.jpg",   // institutions
  "IMG_3858.jpg",   // authentic value
];

// A super-short label to print under the title (not from the docx —
// internal-only)
const shortLabel = [
  "Always reachable",
  "Spoken in your language",
  "End to end",
  "Any season, any place",
  "100+ tours delivered",
  "Trusted by institutions",
  "Authentic, never staged",
];

export function WhyUs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      const cardW = el.clientWidth;
      setPages(Math.max(1, Math.ceil(el.scrollWidth / cardW)));
      setPage(Math.round(el.scrollLeft / cardW));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      {/* Faint dashed flight-path */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1400 200"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden h-28 max-w-[1400px] text-brand-terracotta/15 md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C220,40 520,200 720,120 S1180,40 1400,160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header + nav */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
                <span className="h-[1px] w-8 bg-brand-terracotta/60" />
                Why choose us
              </span>
              <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
                A trusted partner,{" "}
                <span className="font-serif italic font-normal text-brand-terracotta">
                  at your service.
                </span>
              </h2>
              <p className="mt-6 max-w-[58ch] text-[13.5px] leading-relaxed text-brand-charcoal/65 md:text-[14px]">
                If you want to experience Central Asia at its best with a
                trusted partner committed to excellence, authenticity, and
                unforgettable adventures — these are the reasons to fly with us.
              </p>
            </Reveal>
          </div>

          {/* Pager arrows + counter */}
          <div className="md:col-span-4">
            <div className="flex items-center justify-end gap-3">
              <span className="font-mono text-[11px] tracking-widest text-brand-charcoal/55">
                {String(Math.min(page + 1, pages)).padStart(2, "0")} ·{" "}
                {String(pages).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollByPage(-1)}
                data-cursor="hover"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-ink transition-all hover:border-brand-terracotta hover:text-brand-terracotta"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollByPage(1)}
                data-cursor="hover"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-charcoal/20 text-brand-ink transition-all hover:border-brand-terracotta hover:text-brand-terracotta"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Cinema reel — horizontal snap track */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 md:mt-16 md:gap-7"
        >
          {whyUs.map((w, i) => (
            <ReasonCard
              key={w.title}
              index={i}
              title={w.title}
              desc={w.desc}
              short={shortLabel[i]}
              photo={reasonPhotos[i]}
            />
          ))}
          {/* Trailing manifesto card so the reel ends with a punctuation mark */}
          <ManifestoCard />
        </div>

        {/* Progress rail */}
        <div className="mt-2 h-[2px] w-full bg-brand-charcoal/10">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "left" }}
            className="h-full w-full bg-brand-terracotta"
          />
        </div>

        {/* Bold promise — dark hero band, kept as climax */}
        <Reveal delay={0.1}>
          <div className="relative mt-20 overflow-hidden rounded-md bg-brand-ink text-brand-cream md:mt-28">
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-brand-saffron/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-brand-terracotta/20 blur-3xl" />

            <div className="relative grid items-center gap-10 px-7 py-12 md:grid-cols-12 md:gap-16 md:px-14 md:py-20">
              <div className="md:col-span-7">
                <div className="text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
                  Our bold promise
                </div>
                <h3 className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">
                  Don&apos;t love it?{" "}
                  <span className="block font-serif italic text-brand-saffron md:mt-2">
                    Don&apos;t pay.
                  </span>
                </h3>
              </div>
              <div className="md:col-span-5 md:border-l md:border-brand-cream/15 md:pl-10">
                <p className="text-[14px] leading-relaxed text-brand-cream/75 md:text-[14.5px]">
                  We want you to feel completely confident in choosing us. If at
                  any point you genuinely feel your experience does not meet
                  your expectations or is not worth what you paid, we will
                  gladly provide a{" "}
                  <span className="text-brand-saffron">
                    full refund — no questions asked
                  </span>
                  .
                </p>
                <div className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-brand-cream/60">
                  <span className="h-[1px] w-10 bg-brand-saffron/60" />
                  Mohammad · Founder, Ozge Tourism
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReasonCard({
  index,
  title,
  desc,
  short,
  photo,
}: {
  index: number;
  title: string;
  desc?: string;
  short: string;
  photo: string;
}) {
  return (
    <motion.article
      data-cursor="hover"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex shrink-0 snap-start flex-col overflow-hidden rounded-md border border-brand-charcoal/12 bg-brand-paper",
        "w-[80vw] sm:w-[360px] md:w-[400px]"
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-mist">
        <Image
          src={`/photos/${photo}`}
          alt=""
          fill
          sizes="(min-width: 768px) 400px, 80vw"
          className="object-cover transition-transform duration-[1200ms] ease-smooth hover:scale-[1.04]"
          style={{ objectPosition: "center 18%" }}
        />
        {/* Top overlay with number + readable filled chip */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/55 to-transparent px-4 py-3">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-cream/90">
            Reason {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center rounded-full bg-brand-saffron/95 px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.18em] text-brand-ink shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
            {short}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="font-display text-[42px] font-light leading-none text-brand-terracotta md:text-[56px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-3 font-serif text-[22px] italic leading-tight text-brand-ink md:text-[26px]">
          {title}
        </h3>
        {desc && (
          <p className="mt-4 text-[13px] leading-relaxed text-brand-charcoal/65">
            {desc}
          </p>
        )}
        <div className="mt-auto pt-6 text-[10.5px] uppercase tracking-[0.32em] text-brand-charcoal/45">
          Ozge Tourism · {String(index + 1).padStart(2, "0")} of 07
        </div>
      </div>
    </motion.article>
  );
}

function ManifestoCard() {
  return (
    <article
      className={cn(
        "relative flex shrink-0 snap-start flex-col justify-between overflow-hidden rounded-md bg-brand-ink p-7 text-brand-cream md:p-9",
        "w-[80vw] sm:w-[360px] md:w-[400px]"
      )}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-saffron/20 blur-3xl" />
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.34em] text-brand-saffron">
          And finally
        </div>
        <h3 className="mt-5 font-display text-[34px] font-light leading-[1.05] md:text-[44px]">
          We&apos;re in this{" "}
          <span className="font-serif italic text-brand-saffron">together.</span>
        </h3>
        <p className="mt-5 text-[13.5px] leading-relaxed text-brand-cream/70">
          Ozge isn&apos;t built to chase profit. It&apos;s built to bring
          travelers and locals together — to explore, enjoy, and connect across
          Kazakhstan and Central Asia.
        </p>
      </div>
      <div className="mt-8 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.32em] text-brand-cream/60">
        <span className="h-[1px] w-8 bg-brand-saffron/60" />
        That&apos;s our why.
      </div>
    </article>
  );
}
