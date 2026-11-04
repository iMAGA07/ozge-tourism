import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { getContent } from "@/content";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "FAQ", description: "Answers about Ozge Academy courses, instructors, registration, consultations, exams, admissions and payments." };

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { faqCategories } = getContent(locale);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((c) => c.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.faq }]} eyebrow={t.nav.faq} title={t.common.faq} lead="Can’t find your answer? Message us on WhatsApp or book a free call." />
      <div className="container-site grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="FAQ categories" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {faqCategories.map((c) => (
              <li key={c.id}><a href={`#${c.id}`} className="block rounded-full px-4 py-2 text-[14px] font-medium text-ink/70 hover:bg-white hover:text-brand lg:rounded-xl">{c.title}</a></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12">
          {faqCategories.map((c) => (
            <Reveal key={c.id}>
              <section id={c.id} className="scroll-mt-28">
                <h2 className="mb-4 text-[26px] font-medium">{c.title}</h2>
                <FaqList items={c.items} />
              </section>
            </Reveal>
          ))}
        </div>
      </div>
      <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} />
      <script type="application/ld+json" nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
