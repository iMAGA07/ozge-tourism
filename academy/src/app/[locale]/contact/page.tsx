import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, MessageSquareWarning } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact", description: "Contact Ozge Academy by WhatsApp, email or our online form." };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: site.whatsappDisplay, href: whatsappLink("Hello Ozge Academy!"), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: t.contact.address, value: site.city },
    { icon: Clock, label: t.contact.hours, value: site.hours },
  ];
  return (
    <>
      <PageHero crumbs={[{ href: href(locale), label: t.common.breadcrumbHome }, { label: t.nav.contact }]} eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">{t.contact.channels}</p>
          {channels.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand transition-colors group-hover:bg-brand group-hover:text-white"><c.icon aria-hidden className="h-5 w-5" /></span>
                <span><span className="block text-[12.5px] text-ink/50">{c.label}</span><span className="block text-[16px] font-semibold text-ink">{c.value}</span></span>
              </>
            );
            return (
              <Reveal key={c.label} delay={i * 0.05}>
                {c.href ? (
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="card group flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">{inner}</a>
                ) : (
                  <div className="card group flex items-center gap-4 p-4">{inner}</div>
                )}
              </Reveal>
            );
          })}
          <Reveal delay={0.2}>
            <Link href={href(locale, "/feedback")} className="group flex items-center gap-4 rounded-3xl bg-ink p-5 text-white">
              <MessageSquareWarning aria-hidden className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.6} />
              <span className="flex-1">
                <span className="block text-[14px] text-white/65">{t.contact.feedbackPrompt}</span>
                <span className="block text-[15px] font-semibold">{t.contact.feedbackLink}</span>
              </span>
              <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <ContactForm t={{ forms: t.forms, contact: t.contact, common: t.common, cta: t.cta }} links={{ privacy: href(locale, "/legal/privacy"), home: href(locale), programs: href(locale, "/programs") }} />
      </div>
    </>
  );
}
