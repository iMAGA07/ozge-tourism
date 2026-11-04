import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CalendarCheck2, Check, Clock, GraduationCap, Layers, MessageCircle, MonitorSmartphone, Target, Users } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { findCourse, getContent, instructorsFor } from "@/content";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { InstructorCard, PackageCard } from "@/components/Cards";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";

type P = { params: Promise<{ locale: string; division: string; course: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, division, course } = await params;
  const found = isLocale(locale) ? findCourse(locale, division, course) : undefined;
  if (!found) return {};
  return {
    title: `${found.course.title} — ${found.division.title}`,
    description: found.course.short,
    alternates: { canonical: `/${locale}/programs/${division}/${course}` },
  };
}

export default async function CoursePage({ params }: P) {
  const { locale, division, course } = await params;
  if (!isLocale(locale)) notFound();
  const found = findCourse(locale, division, course);
  if (!found) notFound();
  const { division: d, course: c } = found;
  const t = getDictionary(locale);
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const team = instructorsFor(locale, c.instructorIds);
  const packages = (c.packages ?? []).filter((p) => !p.hidden);
  const faqs = c.faqs?.length ? c.faqs : getContent(locale).courseFaqFallback;
  const q = `division=${d.slug}&course=${c.slug}`;
  const priced = packages.flatMap((p) => (p.price ? [p.price] : []));
  const cheapest = priced.sort((a, b) => a.amount - b.amount)[0];
  const fromPrice = cheapest ? `From ${new Intl.NumberFormat("en").format(cheapest.amount)} ${cheapest.currency}` : null;

  const facts = [
    { icon: Clock, label: t.common.duration, value: c.duration },
    { icon: MonitorSmartphone, label: t.common.formats, value: c.formats.map((f) => t.common.format[f]).join(" · ") },
    { icon: Users, label: t.common.modes, value: c.modes.map((m) => t.common.mode[m]).join(" · ") },
    ...(c.schedule ? [{ icon: CalendarCheck2, label: "Schedule", value: c.schedule }] : []),
  ];

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.description,
    provider: { "@type": "EducationalOrganization", name: site.name, sameAs: site.url },
    hasCourseInstance: c.formats.map((f) => ({ "@type": "CourseInstance", courseMode: f === "offline" ? "onsite" : f === "hybrid" ? "blended" : "online" })),
  };

  return (
    <>
      <PageHero
        crumbs={[
          { href: href(locale), label: t.common.breadcrumbHome },
          { href: href(locale, "/programs"), label: t.nav.programs },
          { href: href(locale, `/programs/${d.slug}`), label: d.title },
          { label: c.title },
        ]}
        eyebrow={d.title}
        title={
          <>
            {c.title}
            {c.native && c.native !== c.title && <span className="ml-3 align-middle font-display text-[0.55em] italic text-gold-600">{c.native}</span>}
          </>
        }
        lead={c.short}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={href(locale, `/register?${q}`)} className="btn-primary">{t.cta.apply}</Link>
          <Link href={href(locale, `/consultation?${q}`)} className="btn-gold"><CalendarCheck2 aria-hidden className="h-4 w-4" />{t.cta.consult}</Link>
        </div>
      </PageHero>

      <div className="container-site grid gap-12 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-16">
          <Reveal>
            <p className="text-[18px] leading-relaxed text-ink/80">{c.description}</p>
          </Reveal>

          <section>
            <h2 className="flex items-center gap-3 text-[28px] font-medium"><Target aria-hidden className="h-6 w-6 text-gold-600" />{t.common.objectives}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.objectives.map((o, i) => (
                <Reveal key={o} delay={i * 0.05}>
                  <li className="card flex h-full gap-3 p-5 text-[15px] text-ink/80"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{o}</li>
                </Reveal>
              ))}
            </ul>
          </section>

          <section className="grid gap-5 sm:grid-cols-2">
            <Reveal className="card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">{t.common.audience}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{c.audience}</p>
            </Reveal>
            {c.requirements && (
              <Reveal delay={0.06} className="card p-6">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">{t.common.requirements}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{c.requirements}</p>
              </Reveal>
            )}
          </section>

          {c.levels && c.levels.length > 0 && (
            <section>
              <h2 className="flex items-center gap-3 text-[28px] font-medium"><Layers aria-hidden className="h-6 w-6 text-gold-600" />{t.common.levels}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.levels.map((l) => <li key={l} className="rounded-full border border-brand/20 bg-brand-50 px-4 py-2 text-[14px] font-medium text-brand">{l}</li>)}
              </ul>
            </section>
          )}

          <section>
            <h2 className="flex items-center gap-3 text-[28px] font-medium"><GraduationCap aria-hidden className="h-6 w-6 text-gold-600" />{t.common.curriculum}</h2>
            <ol className="relative mt-8 space-y-5 border-l-2 border-dashed border-brand/20 pl-8">
              {c.curriculum.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.06}>
                  <li className="relative">
                    <span className="absolute -left-[45px] top-1 grid h-8 w-8 place-items-center rounded-full bg-brand font-display text-[14px] text-white ring-4 ring-paper">{i + 1}</span>
                    <h3 className="text-[20px] font-medium">{m.title}</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {m.items.map((it) => <li key={it} className="flex gap-2 text-[14.5px] text-ink/70"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{it}</li>)}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="card overflow-hidden">
            <div className="bg-ink p-6 text-white">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">{d.title}</p>
              <p className="mt-2 font-display text-[26px] leading-tight">{c.title}</p>
              <p className="mt-3 font-display text-[20px] text-gold">{fromPrice ?? t.common.priceOnRequest}</p>
            </div>
            <dl className="divide-y divide-ink/[0.07] px-6">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-3 py-4">
                  <f.icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div><dt className="text-[12px] text-ink/50">{f.label}</dt><dd className="text-[14.5px] font-semibold text-ink">{f.value}</dd></div>
                </div>
              ))}
            </dl>
            <div className="grid gap-2 p-6 pt-2">
              <Link href={href(locale, `/register?${q}`)} className="btn-primary">{t.cta.apply}</Link>
              <Link href={href(locale, `/consultation?${q}`)} className="btn-ghost"><CalendarCheck2 aria-hidden className="h-4 w-4" />{t.cta.consultShort}</Link>
              <a href={whatsappLink(`Hello! I have a question about ${c.title} (${d.title}).`)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center justify-center gap-2 text-[13px] font-medium text-ink/60 hover:text-brand">
                <MessageCircle aria-hidden className="h-4 w-4" /> {t.cta.whatsapp}
              </a>
            </div>
          </Reveal>
        </aside>
      </div>

      {packages.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading eyebrow={t.common.packages} title="Pick the way you learn best" lead="Not sure? Book the free call and we’ll recommend the right package for your goals." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PackageCard p={p} t={t} registerHref={href(locale, `/register?${q}&package=${p.id}`)} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading eyebrow={t.common.instructors} title="Your instructors" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((i, n) => <Reveal key={i.id} delay={n * 0.06}><InstructorCard i={i} t={t} /></Reveal>)}
          </div>
        </section>
      )}

      <section className="container-site mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={t.nav.faq} title={t.common.faq} />
        <Reveal><FaqList items={faqs} /></Reveal>
      </section>

      <CtaBand t={t} consultHref={href(locale, `/consultation?${q}`)} applyHref={href(locale, `/register?${q}`)} />
      <script type="application/ld+json" nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
    </>
  );
}
