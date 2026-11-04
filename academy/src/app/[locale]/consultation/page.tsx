import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, Video } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { formCatalog } from "@/content";
import { PageHero } from "@/components/PageHero";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata: Metadata = { title: "Book a free 15-minute call", description: "Meet an instructor before you enroll — a free, no-obligation 15-minute introductory call." };

type P = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (typeof v === "string" ? v.slice(0, 80) : undefined);

export default async function ConsultationPage({ params, searchParams }: P) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.cta.consultShort }]} eyebrow={t.consultation.eyebrow} title={t.consultation.title} lead={t.consultation.lead} />
      <div className="container-site grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white">
            <div aria-hidden className="ornament-bg absolute inset-0 opacity-[0.07]" />
            <div className="relative">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold"><Clock aria-hidden className="h-3.5 w-3.5 text-gold" />15 min</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold"><Video aria-hidden className="h-3.5 w-3.5 text-gold" />Online</span>
              </div>
              <p className="mt-6 font-display text-[44px] leading-none text-gold">Free</p>
              <ul className="mt-6 space-y-3">
                {t.consultation.perks.map((p) => <li key={p} className="flex gap-2.5 text-[14.5px] text-white/85"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{p}</li>)}
              </ul>
            </div>
          </div>
        </aside>
        <ConsultationForm
          t={{ forms: t.forms, consultation: t.consultation, common: t.common, cta: t.cta }}
          catalog={formCatalog(locale)}
          initial={{ division: one(sp.division), course: one(sp.course) }}
          links={{ privacy: href(locale, "/legal/privacy"), programs: href(locale, "/programs"), home: href(locale) }}
        />
      </div>
    </>
  );
}
