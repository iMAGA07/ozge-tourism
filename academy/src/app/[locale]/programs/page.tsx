import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { publishedDivisions } from "@/content";
import { PageHero } from "@/components/PageHero";
import { DivisionIcon } from "@/components/DivisionIcon";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Programs",
  description: "Language courses, IELTS/TOEFL/SAT/GRE/GMAT preparation, university admission guidance, academic advising, AI skills and professional development.",
};

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const divisions = publishedDivisions(locale);

  return (
    <>
      <PageHero
        crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.programs }]}
        eyebrow={t.nav.programs}
        title={<>Everything we teach, <em className="italic text-brand">in one place.</em></>}
        lead="Six divisions, each with its own courses, formats and packages. Pick a division to explore — or jump straight to a course."
      />
      <section className="container-site space-y-5">
        {divisions.map((d, i) => (
          <Reveal key={d.slug} delay={0.04 * i}>
            <article className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand"><DivisionIcon name={d.icon} className="h-6 w-6" /></span>
                  <span className="font-display text-[15px] text-ink/30">0{i + 1}</span>
                </div>
                <h2 className="mt-5 text-[30px] font-medium leading-tight">
                  <Link href={href(locale, `/programs/${d.slug}`)} className="hover:text-brand">{d.title}</Link>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{d.short}</p>
                <Link href={href(locale, `/programs/${d.slug}`)} className="btn-primary mt-6">{t.cta.learnMore} <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
              </div>
              <ul className="grid content-start gap-2 sm:grid-cols-2">
                {d.courses.map((c) => (
                  <li key={c.slug}>
                    <Link href={href(locale, `/programs/${d.slug}/${c.slug}`)} className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-ink/[0.07] p-4 transition-all duration-300 hover:border-brand/30 hover:bg-brand-50">
                      <span>
                        <span className="block text-[15.5px] font-semibold text-ink group-hover:text-brand">{c.title}</span>
                        <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-ink/60">{c.short}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
      <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} />
    </>
  );
}
