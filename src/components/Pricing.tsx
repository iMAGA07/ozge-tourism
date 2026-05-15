"use client";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { pricing } from "@/data/content";

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-brand-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="How our pricing works"
          title="Three flexible options"
          italic="ahead of you."
          lead="Luckily for you, pricing is the last thing you need to worry about when adventuring with us. Why? Simply because you have three very flexible options ahead of you."
          align="center"
          className="text-center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pricing.map((p, i) => {
            const featured = i === 2;
            return (
              <Reveal key={p.label} delay={i * 0.07}>
                <article
                  className={[
                    "group relative h-full overflow-hidden rounded-md border p-7 md:p-8 transition-all duration-500",
                    featured
                      ? "border-brand-saffron/40 bg-brand-ink text-brand-cream"
                      : "border-brand-charcoal/15 bg-white",
                  ].join(" ")}
                >
                  {featured && (
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-saffron/30 blur-3xl" />
                  )}
                  <div
                    className={[
                      "relative text-[10.5px] uppercase tracking-[0.32em]",
                      featured ? "text-brand-saffron" : "text-brand-terracotta",
                    ].join(" ")}
                  >
                    {p.label}
                  </div>
                  <h3
                    className={[
                      "relative mt-4 font-display text-2xl font-light tracking-tight md:text-[28px]",
                      featured ? "text-brand-cream" : "text-brand-ink",
                    ].join(" ")}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={[
                      "relative mt-3 text-[14px] leading-relaxed",
                      featured ? "text-brand-cream/80" : "text-brand-charcoal/75",
                    ].join(" ")}
                  >
                    {p.desc}
                  </p>
                  <div
                    className={[
                      "relative mt-7 h-px w-full",
                      featured ? "bg-brand-cream/15" : "bg-brand-charcoal/10",
                    ].join(" ")}
                  />
                  <a
                    href="#book"
                    className={[
                      "relative mt-5 inline-flex items-center gap-2 text-[13px] font-medium",
                      featured
                        ? "text-brand-saffron hover:text-white"
                        : "text-brand-terracotta hover:text-brand-ink",
                    ].join(" ")}
                  >
                    Choose this · <span>→</span>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-14 max-w-[72ch] text-center">
            <div className="text-[10.5px] uppercase tracking-[0.32em] text-brand-terracotta">
              Why do we do this?
            </div>
            <p className="mt-5 font-serif text-2xl italic text-brand-charcoal/85 md:text-3xl">
              Our logic is simple: through Ozge Tourism, our primary purpose is not
              to make money. Our main objective is to bring diverse people together
              — from different communities, cultures, and backgrounds — and help
              them explore together, enjoy together, and create lifelong memories
              and lasting connections… together.
            </p>
            <div className="mt-5 text-[14px] text-brand-charcoal/70">
              That's all we're here for. Full stop.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
