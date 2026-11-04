import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, dark }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1 text-[13px]", dark ? "text-white/55" : "text-ink/50")}>
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
            {c.href ? (
              <Link href={c.href} className={cn("hover:underline", dark ? "hover:text-white" : "hover:text-brand")}>{c.label}</Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white/85" : "text-ink/80"}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ eyebrow, title, lead, crumbs, children, dark, aside }: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  dark?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-ink text-white" : "")}>
      {dark ? (
        <div aria-hidden className="ornament-bg absolute inset-0 opacity-[0.07]" />
      ) : (
        <div aria-hidden className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(237,190,58,0.25),transparent_65%)]" />
      )}
      <div className={cn("container-site relative pb-14 pt-10 sm:pb-20 sm:pt-14", aside && "grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]")}>
        <div>
          {crumbs && <Breadcrumbs items={crumbs} dark={dark} />}
          <Reveal className="mt-8 max-w-3xl">
            {eyebrow && <p className={cn("eyebrow", dark && "text-gold")}>{eyebrow}</p>}
            <h1 className={cn("mt-4 text-[40px] font-medium leading-[1.04] sm:text-[58px]", dark ? "text-white" : "text-ink")}>{title}</h1>
            {lead && <p className={cn("mt-6 max-w-2xl text-[17px] leading-relaxed sm:text-[18px]", dark ? "text-white/70" : "text-ink/65")}>{lead}</p>}
            {children}
          </Reveal>
        </div>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>
    </section>
  );
}
