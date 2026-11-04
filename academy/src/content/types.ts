// Content model. Everything editable lives in data shaped by these types, so
// adding a course, package, division or instructor is a data change — no new
// page code. These shapes map 1:1 onto CMS collections for phase 2.

export type Format = "online" | "offline" | "hybrid";
export type Mode = "individual" | "group";
export type Currency = "KZT" | "USD" | "EUR";

export type Price = { amount: number; currency: Currency; per?: string } | null;

export type Package = {
  id: string;
  name: string;
  description: string;
  includes: string[];
  duration?: string;
  sessions?: string;
  formats: Format[];
  /** null → "Price on request". Ready for online payment: amount + currency. */
  price: Price;
  enrollment?: string;
  startDates?: string[];
  highlight?: boolean;
  /** Temporarily hidden without deleting it. */
  hidden?: boolean;
};

export type FAQ = { q: string; a: string };

export type Course = {
  slug: string;
  title: string;
  /** Name in its own script, e.g. 中文 — shown as a decorative accent. */
  native?: string;
  short: string;
  description: string;
  objectives: string[];
  audience: string;
  requirements?: string;
  levels?: string[];
  formats: Format[];
  modes: Mode[];
  duration: string;
  schedule?: string;
  curriculum: { title: string; items: string[] }[];
  packages?: Package[];
  faqs?: FAQ[];
  instructorIds?: string[];
  featured?: boolean;
  published: boolean;
  /** Registration asks for the student's current level. */
  asksLevel?: boolean;
};

export type IconName = "languages" | "exams" | "admissions" | "advising" | "ai" | "growth";

export type Division = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  /** Visual accent used on cards and the division hero. */
  accent: "brand" | "gold" | "ruby" | "ink";
  highlights: string[];
  courseNoun: { one: string; many: string };
  courses: Course[];
  /** Division-wide packages, e.g. admission support tiers. */
  packages?: Package[];
  published: boolean;
};

export type Instructor = {
  id: string;
  /** null until the real person's profile is approved for publication. */
  name: string | null;
  role: string;
  languages: string[];
  expertise: string[];
  bio: string;
  photo?: string;
};

export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};
