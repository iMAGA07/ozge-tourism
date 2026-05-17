"use client";
import { Reveal } from "./Reveal";
import { whyUs } from "@/data/content";
import { cn } from "@/lib/utils";

// Deterministic barcode bars (width 1px–3px) — one pattern per reason,
// generated once at module load so SSR + client agree.
function barcodePattern(seed: number, length = 36): number[] {
  const out: number[] = [];
  let x = seed * 1313 + 17;
  for (let i = 0; i < length; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    const w = (x % 3) + 1; // 1, 2, or 3 px
    out.push(w);
  }
  return out;
}
const barcodes = whyUs.map((_, i) => barcodePattern(i + 1));

// Flight-info-style metadata per reason — fully invented yet plausible.
const stamps = [
  { code: "OZG · 247", status: "ALWAYS-ON", classLabel: "FIRST" },
  { code: "OZG · MLG", status: "FLUENT", classLabel: "PRO" },
  { code: "OZG · ALL", status: "A → Z", classLabel: "FIRST" },
  { code: "OZG · ADV", status: "READY", classLabel: "ALL" },
  { code: "OZG · 100+", status: "PROVEN", classLabel: "GOLD" },
  { code: "OZG · INT", status: "TRUSTED", classLabel: "VIP" },
  { code: "OZG · VAL", status: "AUTHENTIC", classLabel: "FIRST" },
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-brand-mist py-24 md:py-36"
    >
      {/* Faint dashed flight-path illustration */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1400 240"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden h-32 max-w-[1400px] text-brand-terracotta/15 md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,180 C200,40 480,260 700,120 S1200,40 1400,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
                <span className="h-[1px] w-8 bg-brand-terracotta/60" />
                Why choose us
              </span>
              <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
                Seven boarding passes{" "}
                <span className="font-serif italic font-normal text-brand-terracotta">
                  to peace of mind.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-[13.5px] leading-relaxed text-brand-charcoal/65 md:text-[14px]">
                If you want to experience Central Asia at its best with a trusted
                partner committed to excellence, authenticity, and unforgettable
                adventures — here&apos;s every reason to fly with us.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Boarding-pass grid */}
        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {whyUs.map((w, i) => {
            const isPriority = i === 6; // the "exceptional value" one
            return (
              <Reveal key={w.title} delay={Math.min(i, 5) * 0.05}>
                <BoardingPass
                  index={i}
                  title={w.title}
                  desc={w.desc}
                  stamp={stamps[i]}
                  barcode={barcodes[i]}
                  emphasis={isPriority}
                />
              </Reveal>
            );
          })}
        </div>

        {/* Bold promise — dark full-bleed stamp */}
        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-md bg-brand-ink text-brand-cream md:mt-20">
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
                  <span className="text-brand-saffron">full refund — no questions asked</span>.
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

function BoardingPass({
  index,
  title,
  desc,
  stamp,
  barcode,
  emphasis,
}: {
  index: number;
  title: string;
  desc?: string;
  stamp: { code: string; status: string; classLabel: string };
  barcode: number[];
  emphasis?: boolean;
}) {
  return (
    <article
      data-cursor="hover"
      className={cn(
        "group relative overflow-hidden rounded-md border bg-brand-paper transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(20,15,10,0.18)]",
        emphasis
          ? "border-brand-terracotta/60"
          : "border-brand-charcoal/15"
      )}
    >
      {/* Top header strip */}
      <header className="flex items-center justify-between border-b border-dashed border-brand-charcoal/25 bg-brand-paper px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-brand-charcoal/55">
        <span className="font-mono">Ozge · Boarding</span>
        <span className="flex items-center gap-1.5 font-mono text-brand-terracotta">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
          № {String(index + 1).padStart(2, "0")}
        </span>
      </header>

      <div className="grid grid-cols-[1fr_auto]">
        {/* Left main */}
        <div className="p-5 md:p-6">
          <div className="text-[9.5px] uppercase tracking-[0.32em] text-brand-terracotta/80">
            Reason
          </div>
          <h3 className="mt-2 font-display text-[17px] font-medium leading-snug tracking-tight text-brand-ink md:text-[19px]">
            {title}
          </h3>
          {desc && (
            <p className="mt-3 text-[12.5px] leading-relaxed text-brand-charcoal/65">
              {desc}
            </p>
          )}
        </div>

        {/* Perforated divider with punch holes */}
        <div className="relative border-l border-dashed border-brand-charcoal/30">
          <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-brand-mist" />
          <span className="absolute -left-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-full bg-brand-mist" />
        </div>

        {/* Right metadata strip */}
        <aside className="flex w-[120px] flex-col justify-between bg-brand-paper p-4 md:w-[150px] md:p-5">
          <div className="space-y-3 text-[9px] uppercase tracking-[0.22em] text-brand-charcoal/55">
            <div>
              <div className="text-brand-charcoal/40">Flight</div>
              <div className="font-mono text-[11px] tracking-wider text-brand-ink">
                {stamp.code}
              </div>
            </div>
            <div>
              <div className="text-brand-charcoal/40">Status</div>
              <div className="font-mono text-[11px] tracking-wider text-brand-terracotta">
                {stamp.status}
              </div>
            </div>
            <div>
              <div className="text-brand-charcoal/40">Class</div>
              <div className="font-mono text-[11px] tracking-wider text-brand-ink">
                {stamp.classLabel}
              </div>
            </div>
          </div>

          {/* Barcode */}
          <div className="mt-5 flex h-7 items-end gap-[1px]">
            {barcode.map((w, j) => (
              <div
                key={j}
                style={{ width: `${w}px` }}
                className="h-full bg-brand-ink"
              />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
