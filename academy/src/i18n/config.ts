// Locales that are live. To launch Russian or Kazakh:
//   1. add the code here,
//   2. add src/i18n/dictionaries/<code>.ts (UI strings),
//   3. add src/content/<code>/ (page copy — anything missing falls back to English).
// Routing, sitemap, <html lang>, hreflang links and the switcher pick it up automatically.
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Shown in the language switcher as "coming soon" until they go live.
export const upcomingLocales = [
  { code: "kk", label: "Қазақша", short: "KZ" },
  { code: "ru", label: "Русский", short: "RU" },
] as const;

export const localeLabels: Record<Locale, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
