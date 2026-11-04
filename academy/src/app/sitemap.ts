import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getContent, publishedDivisions } from "@/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) => {
    const base = `${site.url}/${locale}`;
    const pages = ["", "/about", "/programs", "/instructors", "/admissions", "/consultation", "/register", "/contact", "/faq"];
    return [
      ...pages.map((p) => ({ url: `${base}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
      ...publishedDivisions(locale).flatMap((d) => [
        { url: `${base}/programs/${d.slug}`, lastModified: now, priority: 0.8 },
        ...d.courses.map((c) => ({ url: `${base}/programs/${d.slug}/${c.slug}`, lastModified: now, priority: 0.8 })),
      ]),
      ...getContent(locale).legalDocs.map((l) => ({ url: `${base}/legal/${l.slug}`, lastModified: now, priority: 0.2 })),
    ];
  });
}
