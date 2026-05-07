"use client";
import { Reveal, RevealText } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  italic?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  italic,
  lead,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.34em] text-brand-terracotta">
          <span className="h-[1px] w-8 bg-brand-terracotta/60" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="fluid-h2 mt-5 font-display font-light text-brand-ink">
        <RevealText text={title} />
        {italic && (
          <>
            <br />
            <span className="font-serif italic font-normal text-brand-terracotta">
              <RevealText text={italic} delay={0.1} />
            </span>
          </>
        )}
      </h2>
      {lead && (
        <Reveal delay={0.2}>
          <p className="fluid-lead mt-6 max-w-[58ch] text-brand-charcoal/80">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
