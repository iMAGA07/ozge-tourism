import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { coursesTaughtBy, getContent } from "@/content";
import { PageHero } from "@/components/PageHero";
import { InstructorCard } from "@/components/Cards";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "Instructors & team", description: "Meet Ozge Academy’s instructors, native speakers and advisors." };

export default async function InstructorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const { instructors } = getContent(locale);
  return (
    <>
      <PageHero
        crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.instructors }]}
        eyebrow="Our team"
        title={<>The people behind <em className="italic text-brand">every lesson.</em></>}
        lead="Qualified professionals, experienced instructors and native speakers. Every instructor is selected for their qualifications, teaching experience and ability to bring a subject to life."
      />
      <section className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((i, n) => (
          <Reveal key={i.id} delay={(n % 3) * 0.06}>
            <InstructorCard i={i} t={t} courses={coursesTaughtBy(locale, i.id).map(({ course }) => course.title)} />
          </Reveal>
        ))}
      </section>
      <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} title="Meet an instructor — free." lead="Book a 15-minute call with an instructor before you enroll. No payment, no obligation." />
    </>
  );
}
