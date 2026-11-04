import { defaultLocale, type Locale } from "@/i18n/config";
import { divisions, courseFaqFallback } from "./en/programs";
import { instructors } from "./en/instructors";
import { about } from "./en/about";
import { faqCategories } from "./en/faq";
import { legalDocs } from "./en/legal";
import { home } from "./en/home";
import type { Course, Division } from "./types";

// Page copy per locale. A new language registers its own bundle here; any
// bundle (or part of one) it does not provide falls back to English.
const bundles = {
  en: { divisions, courseFaqFallback, instructors, about, faqCategories, legalDocs, home },
};
type Bundle = (typeof bundles)["en"];

export function getContent(locale: Locale): Bundle {
  return (bundles as Partial<Record<Locale, Bundle>>)[locale] ?? bundles[defaultLocale];
}

export function publishedDivisions(locale: Locale): Division[] {
  return getContent(locale)
    .divisions.filter((d) => d.published)
    .map((d) => ({ ...d, courses: d.courses.filter((c) => c.published) }));
}

export function findDivision(locale: Locale, slug: string) {
  return publishedDivisions(locale).find((d) => d.slug === slug);
}

export function findCourse(locale: Locale, divisionSlug: string, courseSlug: string) {
  const division = findDivision(locale, divisionSlug);
  const course = division?.courses.find((c) => c.slug === courseSlug);
  return division && course ? { division, course } : undefined;
}

export function featuredCourses(locale: Locale): { division: Division; course: Course }[] {
  return publishedDivisions(locale).flatMap((division) =>
    division.courses.filter((c) => c.featured).map((course) => ({ division, course })),
  );
}

export function instructorsFor(locale: Locale, ids: string[] = []) {
  const all = getContent(locale).instructors;
  return ids.map((id) => all.find((i) => i.id === id)).filter((i): i is NonNullable<typeof i> => !!i);
}

/** Courses taught by an instructor, derived from the course data. */
export function coursesTaughtBy(locale: Locale, instructorId: string) {
  return publishedDivisions(locale).flatMap((division) =>
    division.courses
      .filter((c) => c.instructorIds?.includes(instructorId))
      .map((course) => ({ division, course })),
  );
}

export type { Course, Division };

/** Serializable program tree for the client-side forms. */
export function formCatalog(locale: Locale) {
  return publishedDivisions(locale).map((d) => ({
    slug: d.slug,
    title: d.title,
    icon: d.icon,
    packages: (d.packages ?? []).filter((p) => !p.hidden).map((p) => ({ id: p.id, name: p.name })),
    courses: d.courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      formats: c.formats,
      modes: c.modes,
      asksLevel: !!c.asksLevel,
      packages: (c.packages ?? []).filter((p) => !p.hidden).map((p) => ({ id: p.id, name: p.name })),
    })),
  }));
}
export type FormCatalog = ReturnType<typeof formCatalog>;
