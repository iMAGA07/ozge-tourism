import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getDictionary, href } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { getContent, publishedDivisions } from "@/content";
import { site, whatsappLink } from "@/content/site";
import { Logo } from "./Logo";
import { Ornament } from "./Ornament";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { legalDocs } = getContent(locale);
  const divisions = publishedDivisions(locale);

  const cols = [
    { title: t.nav.programs, links: divisions.map((d) => ({ href: href(locale, `/programs/${d.slug}`), label: d.title })) },
    {
      title: t.footer.explore,
      links: [
        { href: href(locale, "/about"), label: t.nav.about },
        { href: href(locale, "/instructors"), label: t.nav.instructors },
        { href: href(locale, "/admissions"), label: t.nav.admissions },
        { href: href(locale, "/faq"), label: t.nav.faq },
      ],
    },
    {
      title: t.footer.support,
      links: [
        { href: href(locale, "/consultation"), label: t.cta.consultShort },
        { href: href(locale, "/register"), label: t.cta.register },
        { href: href(locale, "/contact"), label: t.nav.contact },
        { href: href(locale, "/feedback"), label: t.nav.feedback },
      ],
    },
    { title: t.footer.legal, links: legalDocs.map((d) => ({ href: href(locale, `/legal/${d.slug}`), label: d.title })) },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ink/10 bg-white">
      <Ornament className="mx-auto -mt-px h-6 w-40 text-gold" />
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo href={href(locale)} />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink/65">{t.footer.blurb}</p>
          <ul className="mt-6 space-y-2.5 text-[14px]">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink/80 hover:text-brand">
                <MessageCircle aria-hidden className="h-4 w-4 text-brand" /> {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-ink/80 hover:text-brand">
                <Mail aria-hidden className="h-4 w-4 text-brand" /> {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-ink/80">
              <MapPin aria-hidden className="h-4 w-4 text-brand" /> {site.city}
            </li>
          </ul>
          {site.socials.length > 0 && (
            <ul className="mt-5 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="chip">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/45">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] text-ink/75 transition-colors hover:text-brand">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[12.5px] text-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName} {t.footer.rights}</p>
          <p>
            {site.registration} ·{" "}
            <a href={site.sister.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brand hover:underline">{site.sister.name}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
