import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileWarning } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { getContent } from "@/content";
import { PageHero } from "@/components/PageHero";

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = isLocale(locale) ? getContent(locale).legalDocs.find((d) => d.slug === slug) : undefined;
  return doc ? { title: doc.title, description: doc.summary } : {};
}

export default async function LegalPage({ params }: P) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { legalDocs } = getContent(locale);
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: doc.title }]} eyebrow={t.footer.legal} title={doc.title} lead={doc.summary} />
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_260px]">
        <article className="min-w-0">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-100/60 p-4 text-[14px] text-ink/80">
            <FileWarning aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
            <p><strong>{t.common.draftNotice}</strong> {t.common.lastUpdated}: {doc.updated}</p>
          </div>
          <div className="space-y-10">
            {doc.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="text-[24px] font-medium"><span className="mr-2 text-gold-600">{i + 1}.</span>{s.heading}</h2>
                <div className="prose-academy mt-3 space-y-3 text-[16px]">{s.body.map((p) => <p key={p}>{p}</p>)}</div>
              </section>
            ))}
          </div>
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ul className="card space-y-1 p-3">
            {legalDocs.map((d) => (
              <li key={d.slug}>
                <Link href={href(locale, `/legal/${d.slug}`)} aria-current={d.slug === slug ? "page" : undefined} className={d.slug === slug ? "block rounded-xl bg-brand-50 px-3 py-2 text-[14px] font-semibold text-brand" : "block rounded-xl px-3 py-2 text-[14px] text-ink/70 hover:bg-paper hover:text-brand"}>
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
