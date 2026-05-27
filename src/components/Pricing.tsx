"use client";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/lib/utils";

// Killer phrase + bullets per option. Kept here (not in content.ts) so the
// pricing data file stays as the docx wording; this file owns the
// presentation layer.
type Card = {
  headline: string;        // big phrase, plain
  headlineItalic: string;  // serif-italic continuation
  bullets: string[];
  accent: "terracotta" | "saffron" | "ink";
  badge?: string;
};
const cards: Card[] = [
  {
    headline: "The standard",
    headlineItalic: "rate.",
    bullets: [
      "Fully transparent — no surprises",
      "Best value for the package provided",
      "Pay once, travel worry-free",
    ],
    accent: "terracotta",
  },
  {
    headline: "Always",
    headlineItalic: "−10% off market.",
    bullets: [
      "Send us the competing price",
      "We match it and take 10% off",
      "Confirmed on the spot",
    ],
    accent: "saffron",
    badge: "Market beater",
  },
  {
    headline: "Pay only if",
    headlineItalic: "you love it.",
    bullets: [
      "No upfront commitment",
      "Pay as you experience the trip",
      "Don't love it? Don't pay.",
    ],
    accent: "ink",
    badge: "Boldest promise",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-brand-paper py-24 md:py-36"
    >
      {/* Faint decorative arc */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1400 180"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden h-24 max-w-[1400px] text-brand-terracotta/15 md:block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 C260,40 540,180 720,90 S1180,30 1400,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="How our pricing works"
          title="Three flexible options"
          italic="ahead of you."
          lead="Luckily for you, pricing is the last thing you need to worry about. Pick the one that suits you — we'll make sure it's worth it."
          align="center"
          className="text-center"
        />

        {/* Three statement cards */}
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {pricing.map((p, i) => (
            <PricingCard
              key={p.label}
              index={i}
              label={p.label}
              fullTitle={p.title}
              desc={p.desc}
              card={cards[i]}
            />
          ))}
        </div>

        {/* Closing manifesto */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-[72ch] text-center md:mt-20">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
              Why do we do this?
            </div>
            <p className="mt-5 font-serif text-xl italic text-brand-charcoal/70 md:text-2xl">
              Our primary purpose is not to make money. Our main objective is to
              bring diverse people together — from different communities,
              cultures, and backgrounds — and help them explore together, enjoy
              together, and create lifelong memories and lasting connections…
              together.
            </p>
            <div className="mt-5 text-[12.5px] text-brand-charcoal/55">
              That&apos;s all we&apos;re here for. Full stop.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingCard({
  index,
  label,
  fullTitle,
  desc,
  card,
}: {
  index: number;
  label: string;
  fullTitle: string;
  desc: string;
  card: Card;
}) {
  const isDark = card.accent === "ink";
  const accentText = isDark
    ? "text-brand-saffron"
    : card.accent === "saffron"
    ? "text-brand-saffron"
    : "text-brand-terracotta";
  const accentBg = isDark
    ? "bg-brand-saffron"
    : card.accent === "saffron"
    ? "bg-brand-saffron"
    : "bg-brand-terracotta";

  return (
    <Reveal delay={Math.min(index, 4) * 0.06}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group relative isolate h-full overflow-hidden rounded-2xl border p-7 md:p-9",
          isDark
            ? "border-brand-saffron/40 bg-brand-ink text-brand-cream shadow-[0_30px_80px_-40px_rgba(20,15,10,0.55)]"
            : "border-brand-charcoal/12 bg-brand-paper text-brand-ink hover:border-brand-charcoal/30"
        )}
      >
        {/* Ghost numeral in the back */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-6 right-2 z-0 select-none font-display font-light leading-none md:-top-8 md:right-4",
            "text-[180px] md:text-[240px]",
            isDark
              ? "text-brand-cream/[0.06]"
              : "text-brand-charcoal/[0.06]"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Saffron blur orb on the featured card */}
        {isDark && (
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-saffron/20 blur-3xl" />
        )}

        <div className="relative z-10 flex h-full flex-col">
          {/* Top row: label + optional badge */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-[10.5px] uppercase tracking-[0.32em]",
                accentText
              )}
            >
              {label}
            </span>
            {card.badge && (
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[9.5px] uppercase tracking-[0.22em]",
                  isDark
                    ? "border-brand-saffron/60 text-brand-saffron"
                    : "border-brand-terracotta/60 text-brand-terracotta"
                )}
              >
                {card.badge}
              </span>
            )}
          </div>

          {/* Killer headline */}
          <h3
            className={cn(
              "mt-6 font-display text-[34px] font-light leading-[1.05] tracking-tight md:text-[42px]",
              isDark ? "text-brand-cream" : "text-brand-ink"
            )}
          >
            {card.headline}{" "}
            <span
              className={cn(
                "block font-serif italic font-normal md:mt-0.5",
                accentText
              )}
            >
              {/* Animated -10% rendered inline for option 2 */}
              {index === 1 ? (
                <span className="inline-flex items-baseline gap-1">
                  <span>−</span>
                  <AnimatedNumber to={10} duration={1200} />
                  <span>% off market.</span>
                </span>
              ) : (
                card.headlineItalic
              )}
            </span>
          </h3>

          {/* Long-form title (smaller, supporting) */}
          <p
            className={cn(
              "mt-5 text-[13px] font-medium leading-snug",
              isDark ? "text-brand-cream/85" : "text-brand-charcoal/85"
            )}
          >
            {fullTitle}
          </p>

          {/* Description */}
          <p
            className={cn(
              "mt-2 text-[13px] leading-relaxed",
              isDark ? "text-brand-cream/65" : "text-brand-charcoal/65"
            )}
          >
            {desc}
          </p>

          {/* Bullets */}
          <ul className="mt-6 space-y-2.5">
            {card.bullets.map((b) => (
              <li
                key={b}
                className={cn(
                  "flex items-start gap-3 text-[13px] leading-snug",
                  isDark ? "text-brand-cream/85" : "text-brand-charcoal/80"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                    isDark
                      ? "bg-brand-saffron/15 text-brand-saffron"
                      : card.accent === "saffron"
                      ? "bg-brand-saffron/15 text-brand-saffron"
                      : "bg-brand-terracotta/12 text-brand-terracotta"
                  )}
                >
                  <svg
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 6 L5 8.5 L9.5 3.5" />
                  </svg>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Divider + CTA pinned to bottom */}
          <div className="mt-auto pt-7">
            <div
              className={cn(
                "h-px w-full",
                isDark ? "bg-brand-cream/15" : "bg-brand-charcoal/10"
              )}
            />
            <a
              href="#book"
              className={cn(
                "group/cta mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-medium transition-all",
                isDark
                  ? "bg-brand-saffron text-brand-ink hover:bg-white"
                  : card.accent === "saffron"
                  ? "bg-brand-ink text-brand-cream hover:bg-brand-saffron hover:text-brand-ink"
                  : "bg-brand-ink text-brand-cream hover:bg-brand-terracotta"
              )}
            >
              Choose this option
              <span className="transition-transform group-hover/cta:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Bottom accent line — grows on hover */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-7 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-smooth group-hover:scale-x-100 md:inset-x-9",
              accentBg
            )}
          />
        </div>
      </motion.article>
    </Reveal>
  );
}
