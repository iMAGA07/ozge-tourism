import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Check, Eye, HeartHandshake, Target } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { getContent } from "@/content";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Ornament } from "@/components/Ornament";

export const metadata: Metadata = { title: "About us", description: "Ozge Academy’s story, mission, values and approach to quality education." };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const a = getContent(locale).about;
  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.about }]} eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      <section className="container-site grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <h2 className="text-[32px] font-medium">{a.story.title}</h2>
          <div className="prose-academy mt-5 space-y-4 text-[16.5px]">{a.story.body.map((p) => <p key={p}>{p}</p>)}</div>
        </Reveal>
        <div className="grid gap-4">
          {[{ icon: Target, ...a.mission }, { icon: Eye, ...a.vision }].map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08} className={i === 0 ? "rounded-3xl bg-ink p-7 text-white" : "card p-7"}>
              <m.icon aria-hidden className={i === 0 ? "h-7 w-7 text-gold" : "h-7 w-7 text-brand"} strokeWidth={1.6} />
              <h3 className="mt-4 text-[22px] font-medium">{m.title}</h3>
              <p className={i === 0 ? "mt-2 text-[15.5px] leading-relaxed text-white/75" : "mt-2 text-[15.5px] leading-relaxed text-ink/70"}>{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site mt-24">
        <SectionHeading eyebrow="Values" title="What we stand for" align="center" />
        <Ornament className="mx-auto mt-6 h-6 w-36 text-gold" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07} className="card p-6">
              <span className="font-display text-[42px] leading-none text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-[20px] font-medium">{v.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mt-24 overflow-hidden bg-ink py-20 text-white">
        <div aria-hidden className="ornament-bg absolute inset-0 opacity-[0.06]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Philosophy" title={a.philosophy.title} />
            <ul className="mt-8 space-y-6">
              {a.philosophy.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <li><h3 className="text-[19px] font-medium text-gold">{p.title}</h3><p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{p.body}</p></li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading dark eyebrow="Quality" title={a.quality.title} />
            <ul className="mt-8 space-y-3">
              {a.quality.points.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[15px] text-white/85"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{p}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-site mt-24 grid gap-5 lg:grid-cols-2">
        <Reveal className="card p-8">
          <HeartHandshake aria-hidden className="h-8 w-8 text-ruby" strokeWidth={1.6} />
          <h2 className="mt-4 text-[26px] font-medium">{a.commitment.title}</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink/70">{a.commitment.body}</p>
        </Reveal>
        <Reveal delay={0.08} className="card p-8">
          <Building2 aria-hidden className="h-8 w-8 text-brand" strokeWidth={1.6} />
          <h2 className="mt-4 text-[26px] font-medium">{a.parent.title}</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink/70">{a.parent.body}</p>
          <p className="mt-4 text-[13px] text-ink/50">{site.legalName} · {site.registration}</p>
        </Reveal>
      </section>

      <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} />
    </>
  );
}
