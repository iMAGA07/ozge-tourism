import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck2, Compass, Quote, Sparkles, UserRoundCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, href, type Dictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { featuredCourses, getContent, publishedDivisions } from "@/content";
import { HeroOrbit } from "@/components/home/HeroOrbit";
import { RotatingWord } from "@/components/home/RotatingWord";
import { CourseCard, DivisionCard, InstructorCard } from "@/components/Cards";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { Ornament } from "@/components/Ornament";

type Ctx = { locale: Locale; t: Dictionary; c: ReturnType<typeof getContent> };

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ctx: Ctx = { locale, t: getDictionary(locale), c: getContent(locale) };
  const sections: Record<(typeof ctx.c.home.sections)[number], (x: Ctx) => React.ReactNode> = {
    hero: Hero, marquee: Marquee, intro: Intro, divisions: Divisions, featured: Featured, why: Why,
    instructors: Instructors, how: How, stories: Stories, faq: Faq, cta: Cta,
  };
  return <>{ctx.c.home.sections.map((id) => <div key={id}>{sections[id](ctx)}</div>)}</>;
}

function Hero({ locale, t, c }: Ctx) {
  const h = c.home.hero;
  const divisions = publishedDivisions(locale);
  const languages = divisions.find((d) => d.slug === "languages")?.courses.length ?? 0;
  const exams = divisions.find((d) => d.slug === "exams")?.courses.length ?? 0;
  const facts = [
    { n: divisions.length, label: "program divisions" },
    { n: languages, label: "languages" },
    { n: exams, label: "international exams" },
    { n: 15, label: "min free intro call" },
  ];
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(36,112,189,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(237,190,58,0.16),transparent_50%)]" />
      <div className="container-site relative grid items-center gap-10 pb-16 pt-8 sm:pt-12 lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:pb-24">
        <div>
          <Reveal>
            <p className="eyebrow">{h.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[44px] font-medium leading-[1.02] text-ink sm:text-[64px] lg:text-[72px]">
              {h.titleTop}{" "}
              <RotatingWord words={h.words} className="italic text-brand [font-variation-settings:'SOFT'_100,'WONK'_1]" />
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/65 sm:text-[18px]">{h.lead}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={href(locale, "/programs")} className="btn-primary">{t.cta.explore} <ArrowRight aria-hidden className="h-4 w-4" /></Link>
            <Link href={href(locale, "/consultation")} className="btn-gold"><CalendarCheck2 aria-hidden className="h-4 w-4" />{t.cta.consult}</Link>
            <Link href={href(locale, "/register")} className="btn px-3 text-ink/70 underline-offset-4 hover:text-brand hover:underline">{t.cta.apply}</Link>
          </Reveal>
          <Reveal delay={0.26}>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-7 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[34px] leading-none text-ink">{f.n}</dd>
                  <dd className="mt-1.5 text-[12.5px] leading-snug text-ink/55">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <HeroOrbit />
      </div>
    </section>
  );
}

function Marquee({ c }: Ctx) {
  const items = [...c.home.marquee, ...c.home.marquee];
  return (
    <div className="relative overflow-hidden border-y border-ink/[0.08] bg-white py-5" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[22px] text-ink/70">
            {m}
            <span className="h-2 w-2 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white" />
    </div>
  );
}

function Intro({ locale, t, c }: Ctx) {
  const i = c.home.intro;
  const icons = [UserRoundCheck, Compass, CalendarCheck2];
  return (
    <section className="container-site mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
      <div>
        <SectionHeading eyebrow={i.eyebrow} title={i.title} lead={i.lead} />
        <Reveal delay={0.1}>
          <Link href={href(locale, "/about")} className="btn-ghost mt-8">{t.nav.about} <ArrowRight aria-hidden className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <ul className="grid gap-4">
        {i.points.map((p, n) => {
          const Icon = icons[n % icons.length];
          return (
            <Reveal key={p.title} delay={n * 0.08}>
              <li className="card flex gap-5 p-6 transition-transform duration-500 hover:translate-x-1">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white"><Icon aria-hidden className="h-6 w-6" strokeWidth={1.7} /></span>
                <div>
                  <h3 className="text-[19px] font-medium text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/65">{p.body}</p>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

function Divisions({ locale, t, c }: Ctx) {
  const d = c.home.divisions;
  return (
    <section className="container-site mt-28" id="programs">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow={d.eyebrow} title={d.title} lead={d.lead} />
        <Reveal><Link href={href(locale, "/programs")} className="btn-ghost shrink-0">{t.nav.allPrograms} <ArrowRight aria-hidden className="h-4 w-4" /></Link></Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publishedDivisions(locale).map((div, i) => (
          <Reveal key={div.slug} delay={(i % 3) * 0.08}>
            <DivisionCard d={div} t={t} index={i} link={href(locale, `/programs/${div.slug}`)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured({ locale, t, c }: Ctx) {
  const f = c.home.featured;
  return (
    <section className="container-site mt-28">
      <SectionHeading eyebrow={f.eyebrow} title={f.title} lead={f.lead} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses(locale).map(({ division, course }, i) => (
          <Reveal key={course.slug} delay={(i % 3) * 0.08}>
            <CourseCard c={course} division={division} t={t} link={href(locale, `/programs/${division.slug}/${course.slug}`)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Why({ c }: Ctx) {
  const w = c.home.why;
  const icons = [BadgeCheck, Sparkles, UserRoundCheck, CalendarCheck2];
  return (
    <section className="relative mt-28 overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div aria-hidden className="ornament-bg absolute inset-0 opacity-[0.06]" />
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="container-site relative">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} dark align="center" />
        <Ornament className="mx-auto mt-8 h-6 w-36 text-gold" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {w.pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={p.title} delay={i * 0.08} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-700">
                <Icon aria-hidden className="h-8 w-8 text-gold transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
                <h3 className="mt-6 text-[21px] font-medium">{p.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Instructors({ locale, t, c }: Ctx) {
  const s = c.home.instructors;
  return (
    <section className="container-site mt-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        <Reveal><Link href={href(locale, "/instructors")} className="btn-ghost shrink-0">{t.cta.viewAll} <ArrowRight aria-hidden className="h-4 w-4" /></Link></Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.instructors.slice(0, 4).map((i, n) => (
          <Reveal key={i.id} delay={n * 0.06}><InstructorCard i={i} t={t} /></Reveal>
        ))}
      </div>
    </section>
  );
}

function How({ locale, t, c }: Ctx) {
  const h = c.home.how;
  return (
    <section className="container-site mt-28">
      <SectionHeading eyebrow={h.eyebrow} title={h.title} align="center" />
      <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
        <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(21,89,160,0.35)_10%,rgba(21,89,160,0.35)_90%,transparent)] md:block" />
        {h.steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1} className="relative text-center">
            <li>
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white font-display text-[22px] text-brand shadow-[0_12px_30px_-14px_rgba(21,89,160,0.6)] ring-1 ring-brand/15">
                {i + 1}
                {i === 1 && <span className="absolute -right-1 -top-1 rounded-full bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase text-ink">free</span>}
              </span>
              <h3 className="mt-5 text-[20px] font-medium text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-[14.5px] leading-relaxed text-ink/65">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-10 text-center">
        <Link href={href(locale, "/admissions")} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand hover:underline">
          {t.nav.admissions} <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function Stories({ locale, t, c }: Ctx) {
  const s = c.home.stories;
  return (
    <section className="container-site mt-28">
      <Reveal>
        <div className="card relative grid items-center gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto]">
          <Quote aria-hidden className="h-14 w-14 text-gold" strokeWidth={1.2} />
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 className="mt-3 text-[30px] font-medium leading-tight text-ink sm:text-[36px]">{s.title}</h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-ink/65">{s.body}</p>
          </div>
          <Link href={href(locale, "/register")} className="btn-primary">{t.cta.apply}</Link>
        </div>
      </Reveal>
    </section>
  );
}

function Faq({ locale, t, c }: Ctx) {
  const f = c.home.faq;
  const items = c.faqCategories.flatMap((cat) => cat.items.slice(0, 1)).slice(0, 6);
  return (
    <section className="container-site mt-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <SectionHeading eyebrow={f.eyebrow} title={f.title} lead={f.lead} />
        <Reveal delay={0.1}><Link href={href(locale, "/faq")} className="btn-ghost mt-8">{t.nav.faq} <ArrowRight aria-hidden className="h-4 w-4" /></Link></Reveal>
      </div>
      <Reveal delay={0.1}><FaqList items={items} /></Reveal>
    </section>
  );
}

function Cta({ locale, t }: Ctx) {
  return <CtaBand t={t} consultHref={href(locale, "/consultation")} applyHref={href(locale, "/register")} />;
}
