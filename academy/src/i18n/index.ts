import { defaultLocale, type Locale } from "./config";
import en from "./dictionaries/en";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Prefix a site path with the locale: href("en", "/programs") → "/en/programs". */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
