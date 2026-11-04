import { Plus } from "lucide-react";
import type { FAQ } from "@/content/types";

// Native <details>: keyboard and screen-reader friendly, works without JS.
export function FaqList({ items }: { items: FAQ[] }) {
  return (
    <div className="divide-y divide-ink/[0.08] rounded-3xl border border-ink/[0.08] bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-7">
          <summary className="flex items-center justify-between gap-6 py-5 text-left">
            <span className="text-[16px] font-semibold text-ink group-hover:text-brand">{f.q}</span>
            <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand transition-transform duration-300">
              <Plus aria-hidden className="h-4 w-4" />
            </span>
          </summary>
          <div className="faq-body pb-6 pr-12 text-[15px] leading-relaxed text-ink/70">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
