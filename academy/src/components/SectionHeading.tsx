import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, lead, align = "left", dark, className }: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", dark && "text-gold", align === "center" && "justify-center")}>{eyebrow}</p>}
      <h2 className={cn("mt-4 text-[34px] font-medium leading-[1.08] sm:text-[44px]", dark ? "text-white" : "text-ink")}>{title}</h2>
      {lead && <p className={cn("mt-5 text-[16px] leading-relaxed sm:text-[17px]", dark ? "text-white/70" : "text-ink/65")}>{lead}</p>}
    </Reveal>
  );
}
