import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ href, className, priority }: { href: string; className?: string; priority?: boolean }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-3", className)} aria-label="Ozge Academy — home">
      <Image src="/logo.png" alt="" width={620} height={355} priority={priority} className="h-10 w-auto transition-transform duration-500 group-hover:scale-[1.03] sm:h-11" />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[19px] font-semibold tracking-tight text-ink">Academy</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">by Ozge Ltd.</span>
      </span>
    </Link>
  );
}
