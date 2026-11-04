import Link from "next/link";
import { ArrowUpRight, Check, Clock, MonitorSmartphone } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Course, Division, Instructor, Package } from "@/content/types";
import { DivisionIcon } from "./DivisionIcon";
import { cn } from "@/lib/utils";

const accents = {
  brand: { icon: "bg-brand-100 text-brand", bar: "from-brand to-brand-500", glow: "group-hover:shadow-[0_30px_60px_-30px_rgba(21,89,160,0.55)]" },
  gold: { icon: "bg-gold-100 text-gold-600", bar: "from-gold-600 to-gold-300", glow: "group-hover:shadow-[0_30px_60px_-30px_rgba(217,165,28,0.6)]" },
  ruby: { icon: "bg-ruby-100 text-ruby", bar: "from-ruby to-ruby-600", glow: "group-hover:shadow-[0_30px_60px_-30px_rgba(179,38,30,0.5)]" },
  ink: { icon: "bg-ink text-gold", bar: "from-ink to-ink-700", glow: "group-hover:shadow-[0_30px_60px_-30px_rgba(10,31,56,0.6)]" },
};

export function DivisionCard({ d, link, t, index }: { d: Division; link: string; t: Dictionary; index?: number }) {
  const a = accents[d.accent];
  return (
    <Link href={link} className={cn("card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1.5 sm:p-7", a.glow)}>
      <span className={cn("absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100", a.bar)} />
      <div className="flex items-start justify-between">
        <span className={cn("grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110", a.icon)}>
          <DivisionIcon name={d.icon} className="h-6 w-6" />
        </span>
        {index !== undefined && <span className="font-display text-[15px] text-ink/25">0{index + 1}</span>}
      </div>
      <h3 className="mt-6 text-[23px] font-medium leading-tight text-ink">{d.title}</h3>
      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink/65">{d.short}</p>
      <div className="mt-6 flex items-center justify-between border-t border-ink/[0.07] pt-4">
        <span className="text-[13px] font-medium text-ink/55">
          {d.courses.length} {d.courses.length === 1 ? d.courseNoun.one : d.courseNoun.many}
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
          {t.cta.learnMore}
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function CourseCard({ c, division, link, t }: { c: Course; division?: Division; link: string; t: Dictionary }) {
  return (
    <Link href={link} className="card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(10,31,56,0.5)]">
      {c.native && c.native !== c.title && (
        <span aria-hidden className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-[64px] font-semibold leading-none text-brand/[0.06] transition-colors duration-500 group-hover:text-gold/20">
          {c.native}
        </span>
      )}
      {division && <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brand">{division.title}</p>}
      <h3 className="mt-2 text-[22px] font-medium leading-tight text-ink">{c.title}</h3>
      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink/65">{c.short}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        <span className="chip"><Clock aria-hidden className="h-3.5 w-3.5 text-ink/45" />{c.duration}</span>
        <span className="chip"><MonitorSmartphone aria-hidden className="h-3.5 w-3.5 text-ink/45" />{c.formats.map((f) => t.common.format[f]).join(" · ")}</span>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
        {t.cta.viewCourse}
        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function PackageCard({ p, t, registerHref }: { p: Package; t: Dictionary; registerHref: string }) {
  return (
    <div className={cn("relative flex h-full flex-col rounded-3xl p-6 sm:p-7", p.highlight ? "bg-ink text-white shadow-[0_30px_60px_-30px_rgba(10,31,56,0.8)]" : "card")}>
      {p.highlight && <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">Most chosen</span>}
      <h3 className={cn("text-[22px] font-medium", p.highlight ? "text-white" : "text-ink")}>{p.name}</h3>
      <p className={cn("mt-2 text-[14px] leading-relaxed", p.highlight ? "text-white/70" : "text-ink/65")}>{p.description}</p>
      <p className={cn("mt-5 font-display text-[26px]", p.highlight ? "text-gold" : "text-ink")}>
        {p.price ? `${new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(p.price.amount)} ${p.price.currency}` : t.common.priceOnRequest}
        {p.price?.per && <span className="text-[14px] opacity-60"> / {p.price.per}</span>}
      </p>
      <dl className={cn("mt-4 grid grid-cols-2 gap-3 border-y py-4 text-[12.5px]", p.highlight ? "border-white/10" : "border-ink/[0.07]")}>
        {p.duration && (
          <div><dt className="opacity-55">{t.common.duration}</dt><dd className="mt-0.5 font-semibold">{p.duration}</dd></div>
        )}
        {p.sessions && (
          <div><dt className="opacity-55">{t.common.sessions}</dt><dd className="mt-0.5 font-semibold">{p.sessions}</dd></div>
        )}
        <div className="col-span-2"><dt className="opacity-55">{t.common.formats}</dt><dd className="mt-0.5 font-semibold">{p.formats.map((f) => t.common.format[f]).join(" · ")}</dd></div>
      </dl>
      <ul className="mt-4 flex-1 space-y-2.5">
        {p.includes.map((i) => (
          <li key={i} className="flex gap-2.5 text-[14px]">
            <Check aria-hidden className={cn("mt-0.5 h-4 w-4 shrink-0", p.highlight ? "text-gold" : "text-brand")} />
            <span className={p.highlight ? "text-white/85" : "text-ink/75"}>{i}</span>
          </li>
        ))}
      </ul>
      <Link href={registerHref} className={cn("mt-6", p.highlight ? "btn-gold" : "btn-primary")}>{t.cta.apply}</Link>
    </div>
  );
}

export function InstructorCard({ i, t, courses }: { i: Instructor; t: Dictionary; courses?: string[] }) {
  const initials = (i.name ?? i.role).split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  return (
    <article className="card group flex h-full flex-col p-6">
      <div className="flex items-center gap-4">
        <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-ink font-display text-[22px] text-gold">
          <span aria-hidden>{initials}</span>
          <span aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>
        <div>
          <h3 className="text-[18px] font-medium leading-snug text-ink">{i.name ?? i.role}</h3>
          {i.name ? <p className="text-[13px] text-ink/60">{i.role}</p> : <p className="text-[12px] font-medium text-gold-600">{t.common.profileSoon}</p>}
        </div>
      </div>
      <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink/70">{i.bio}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {i.expertise.map((e) => <span key={e} className="chip">{e}</span>)}
      </div>
      <p className="mt-4 border-t border-ink/[0.07] pt-3 text-[12.5px] text-ink/55">
        <span className="font-semibold text-ink/70">Languages:</span> {i.languages.join(", ")}
        {courses && courses.length > 0 && (<><br /><span className="font-semibold text-ink/70">Teaches:</span> {courses.join(", ")}</>)}
      </p>
    </article>
  );
}
