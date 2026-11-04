import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "How to apply", description: "Ozge Academy’s simple enrollment process, from choosing a course to your first class." };

export default async function AdmissionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const steps = [
    { title: "Explore the programs", body: "Browse our six divisions and compare courses, formats and packages.", link: { href: href(locale, "/programs"), label: t.cta.explore } },
    { title: "Choose a suitable course", body: "Pick the course that matches your goal — a language, an exam, an admission service or a skill." },
    { title: "Review the course details", body: "Read objectives, levels, curriculum, formats and packages on the course page." },
    { title: "Book a free 15-minute call", body: "Optional, but recommended: meet an instructor, ask questions, check your level.", link: { href: href(locale, "/consultation"), label: t.cta.consultShort }, tag: "optional" },
    { title: "Complete the online registration", body: "About three minutes. Nothing is charged at this step.", link: { href: href(locale, "/register"), label: t.cta.register } },
    { title: "Receive confirmation", body: "You get a reference number immediately, and our team contacts you within one working day with next steps." },
    { title: "Complete payment", body: "Once your schedule and terms are confirmed. Secure online payment is coming soon.", tag: "soon" },
    { title: "Begin your course", body: "Meet your instructor and start learning — online, in person or hybrid." },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.admissions }]}
        eyebrow="Admissions"
        title={<>Simple, clear, <em className="italic text-brand">no surprises.</em></>}
        lead="Eight short steps from your first look to your first class. Most students are learning within a week."
      />
      <section className="container-site">
        <ol className="relative mx-auto max-w-3xl">
          <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-brand via-gold to-ruby opacity-40" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li className="relative flex gap-6 pb-6">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white font-display text-[22px] text-brand shadow-[0_10px_24px_-14px_rgba(21,89,160,0.6)] ring-1 ring-brand/15">{i + 1}</span>
                <div className="card flex-1 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[20px] font-medium">{s.title}</h2>
                    {s.tag && <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-600">{s.tag}</span>}
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink/65">{s.body}</p>
                  {s.link && <Link href={s.link.href} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand hover:underline">{s.link.label}<ArrowRight aria-hidden className="h-4 w-4" /></Link>}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} />
    </>
  );
}
