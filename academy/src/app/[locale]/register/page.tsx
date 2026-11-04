import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck2, Lock, MailCheck, PhoneCall } from "lucide-react";
import Link from "next/link";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { formCatalog } from "@/content";
import { PageHero } from "@/components/PageHero";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = { title: "Register", description: "Register online for an Ozge Academy program.", robots: { index: true } };

type P = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (typeof v === "string" ? v.slice(0, 80) : undefined);

export default async function RegisterPage({ params, searchParams }: P) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const t = getDictionary(locale);
  const next = [
    { icon: MailCheck, title: "Instant acknowledgment", body: "You get a reference number straight away." },
    { icon: PhoneCall, title: "We contact you", body: "Our admissions team reviews your registration within one working day." },
    { icon: CalendarCheck2, title: "Confirm & begin", body: "We agree schedule, package and price — then you start learning." },
  ];

  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.register.title }]} eyebrow={t.register.eyebrow} title={t.register.title} lead={t.register.lead} />
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_320px]">
        <RegisterForm
          t={{ forms: t.forms, register: t.register, common: t.common, cta: t.cta }}
          catalog={formCatalog(locale)}
          initial={{ division: one(sp.division), course: one(sp.course), package: one(sp.package) }}
          links={{ privacy: href(locale, "/legal/privacy"), terms: href(locale, "/legal/enrollment"), programs: href(locale, "/programs"), home: href(locale) }}
        />
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">What happens next</p>
            <ol className="mt-5 space-y-5">
              {next.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand"><s.icon aria-hidden className="h-[18px] w-[18px]" /></span>
                  <div><p className="text-[14.5px] font-semibold">{s.title}</p><p className="mt-0.5 text-[13px] leading-relaxed text-ink/60">{s.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex gap-3 rounded-3xl bg-ink p-5 text-[13px] leading-relaxed text-white/70">
            <Lock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <p>Your details are sent over an encrypted connection and seen only by our admissions team. <Link href={href(locale, "/legal/privacy")} className="font-semibold text-white underline-offset-2 hover:underline">Privacy policy</Link></p>
          </div>
        </aside>
      </div>
    </>
  );
}
