import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck2, Check } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { findDivision, getContent, instructorsFor } from "@/content";
import { PageHero } from "@/components/PageHero";
import { DivisionIcon } from "@/components/DivisionIcon";
import { CourseCard, InstructorCard, PackageCard } from "@/components/Cards";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";

type P = { params: Promise<{ locale: string; division: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, division } = await params;
  const d = isLocale(locale) ? findDivision(locale, division) : undefined;
  return d ? { title: d.title, description: d.short, alternates: { canonical: `/${locale}/programs/${d.slug}` } } : {};
}

export default async function DivisionPage({ params }: P) {
  const { locale, division } = await params;
  if (!isLocale(locale)) notFound();
  const d = findDivision(locale, division);
  if (!d) notFound();
  const t = getDictionary(locale);
  const ids = [...new Set(d.courses.flatMap((c) => c.instructorIds ?? []))];
  const team = instructorsFor(locale, ids);
  const packages = d.packages?.filter((p) => !p.hidden);

  return (
    <>
      <PageHero
        dark
        crumbs={[
          { href: href(locale), label: t.common.breadcrumbHome },
          { href: href(locale, "/programs"), label: t.nav.programs },
          { label: d.title },
        ]}
        eyebrow={`${d.courses.length} ${d.courses.length === 1 ? d.courseNoun.one : d.courseNoun.many}`}
        title={d.title}
        lead={d.description}
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-ink"><DivisionIcon name={d.icon} className="h-7 w-7" /></span>
            <ul className="mt-6 space-y-3">
              {d.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] text-white/85"><Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{h}</li>
              ))}
            </ul>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href={href(locale, `/register?division=${d.slug}`)} className="btn-gold">{t.cta.apply}</Link>
              <Link href={href(locale, `/consultation?division=${d.slug}`)} className="btn-ghost-light"><CalendarCheck2 aria-hidden className="h-4 w-4" />{t.cta.consultShort}</Link>
            </div>
          </div>
        }
      />

      <section className="container-site mt-16">
        <SectionHeading eyebrow={d.courseNoun.many} title={`Choose your ${d.courseNoun.one}`} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.courses.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.07}>
              <CourseCard c={c} t={t} link={href(locale, `/programs/${d.slug}/${c.slug}`)} />
            </Reveal>
          ))}
        </div>
      </section>

      {packages && packages.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading eyebrow={t.common.packages} title="Choose your level of support" lead="Every package can be combined with individual services. We confirm exactly what’s included before you enroll." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PackageCard p={p} t={t} registerHref={href(locale, `/register?division=${d.slug}&package=${p.id}`)} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading eyebrow={t.common.instructors} title="Who you’ll learn with" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((i, n) => <Reveal key={i.id} delay={n * 0.06}><InstructorCard i={i} t={t} /></Reveal>)}
          </div>
        </section>
      )}

      <section className="container-site mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={t.nav.faq} title={t.common.faq} />
        <Reveal><FaqList items={getContent(locale).courseFaqFallback} /></Reveal>
      </section>

      <CtaBand t={t} consultHref={href(locale, `/consultation?division=${d.slug}`)} applyHref={href(locale, `/register?division=${d.slug}`)} />
    </>
  );
}
