import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { publishedDivisions } from "@/content";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "../globals.css";

const display = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-display", axes: ["SOFT", "WONK", "opsz"], display: "swap" });
const sans = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#FBF9F4", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${t.meta.siteName} — Languages, Exams, Admissions & AI`, template: `%s · ${t.meta.siteName}` },
    description: t.meta.description,
    applicationName: t.meta.siteName,
    alternates: { canonical: `/${locale}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
    openGraph: { type: "website", siteName: t.meta.siteName, locale, title: t.meta.siteName, description: t.meta.description, images: ["/logo.png"] },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // Reading the per-request nonce renders pages dynamically, which is what
  // lets the strict Content-Security-Policy in middleware.ts work.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const t = getDictionary(locale);
  const divisions = publishedDivisions(locale).map((d) => ({ slug: d.slug, title: d.title, short: d.short, icon: d.icon, count: d.courses.length }));

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    email: site.email,
    telephone: site.whatsapp,
    parentOrganization: { "@type": "Organization", name: site.legalName },
    address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
  };

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Providers>
          <Header locale={locale} t={{ nav: t.nav, cta: t.cta }} divisions={divisions} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </Providers>
        <script type="application/ld+json" nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
