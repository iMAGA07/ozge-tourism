import Link from "next/link";
import { getDictionary, href } from "@/i18n";
import { defaultLocale } from "@/i18n/config";
import { Ornament } from "@/components/Ornament";

export default function NotFound() {
  const t = getDictionary(defaultLocale);
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-[120px] leading-none text-gold sm:text-[160px]">404</p>
      <Ornament className="mt-2 h-6 w-36 text-brand" />
      <h1 className="mt-6 text-[34px] font-medium sm:text-[44px]">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-[16px] text-ink/65">{t.notFound.body}</p>
      <div className="mt-8 flex gap-3">
        <Link href={href(defaultLocale)} className="btn-primary">{t.notFound.home}</Link>
        <Link href={href(defaultLocale, "/programs")} className="btn-ghost">{t.cta.explore}</Link>
      </div>
    </section>
  );
}
