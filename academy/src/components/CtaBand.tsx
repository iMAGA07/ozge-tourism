import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/content/site";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function CtaBand({ t, consultHref, applyHref, title, lead }: { t: Dictionary; consultHref: string; applyHref: string; title?: string; lead?: string }) {
  return (
    <section className="container-site mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="ornament-bg absolute inset-0 opacity-[0.08]" />
          <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative">
            <Ornament className="mx-auto h-6 w-36 text-gold" />
            <h2 className="mx-auto mt-6 max-w-2xl text-[34px] font-medium leading-[1.1] sm:text-[48px]">
              {title ?? (<>Not sure which course is right? <em className="font-normal italic text-gold">Let’s talk.</em></>)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              {lead ?? "Book a free 15-minute call with an instructor. Ask anything, get an honest view of your level, and decide with confidence."}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={consultHref} className="btn-gold">{t.cta.consult} <ArrowRight aria-hidden className="h-4 w-4" /></Link>
              <Link href={applyHref} className="btn-ghost-light">{t.cta.apply}</Link>
              <a href={whatsappLink("Hello Ozge Academy! I have a question about your programs.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium text-white/75 hover:text-white">
                <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
