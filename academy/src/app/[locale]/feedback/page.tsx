import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { publishedDivisions } from "@/content";
import { PageHero } from "@/components/PageHero";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export const metadata: Metadata = { title: "Complaints & feedback", description: "Submit a complaint, suggestion or feedback — confidentially, and anonymously if you wish.", robots: { index: false } };

export default async function FeedbackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const statuses = ["Received", "Under review", "In progress", "Resolved"];
  return (
    <>
      <PageHero dark crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.feedback }]} eyebrow={t.feedback.eyebrow} title={t.feedback.title} lead={t.feedback.lead} />
      <div className="container-site -mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <FeedbackForm t={{ forms: t.forms, feedback: t.feedback, common: t.common, cta: t.cta }} programs={publishedDivisions(locale).map((d) => ({ slug: d.slug, title: d.title }))} links={{ home: href(locale) }} />
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <ShieldCheck aria-hidden className="h-8 w-8 text-brand" strokeWidth={1.6} />
            <ul className="mt-5 space-y-3">
              {t.feedback.promises.map((p) => <li key={p} className="flex gap-2.5 text-[14px] text-ink/75"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{p}</li>)}
            </ul>
          </div>
          <div className="card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">How it’s handled</p>
            <ol className="mt-4 space-y-0">
              {statuses.map((s, i) => (
                <li key={s} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < statuses.length - 1 && <span aria-hidden className="absolute left-[11px] top-6 h-full w-px bg-brand/20" />}
                  <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[11px] font-bold text-brand">{i + 1}</span>
                  <span className="text-[14px] font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <Link href={href(locale, "/legal/complaints")} className="mt-5 inline-block text-[13px] font-semibold text-brand hover:underline">Complaints & feedback policy →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
