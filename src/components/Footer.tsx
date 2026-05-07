"use client";
import Image from "next/image";
import { Instagram, Facebook, Mail, Send, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.6 6.7a5.6 5.6 0 0 1-3.3-1.1 5.5 5.5 0 0 1-2.2-3.2h-3v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.6V9.4a8.7 8.7 0 0 0 5.5 1.9V8.2a5.5 5.5 0 0 1 0-1.5z" />
  </svg>
);

const socials = [
  { Icon: Instagram, href: site.instagram, label: "Instagram" },
  { Icon: Facebook, href: site.facebook, label: "Facebook" },
  { Icon: TikTokIcon, href: site.tiktok, label: "TikTok" },
  { Icon: MessageCircle, href: site.whatsapp, label: "WhatsApp" },
  { Icon: Send, href: site.telegram, label: "Telegram" },
  { Icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-brand-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Ozge Tourism"
            width={120}
            height={120}
            className="h-20 w-20 object-contain md:h-24 md:w-24"
          />
          <div className="mt-5 font-display text-2xl font-light tracking-tight text-brand-ink md:text-3xl">
            Ozge Tourism
          </div>
          <div className="mt-2 text-[12px] uppercase tracking-[0.32em] text-brand-charcoal/55">
            Explore · Enjoy · Connect
          </div>

          <div className="mt-9 flex items-center gap-2.5 md:gap-3.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-charcoal/15 text-brand-charcoal/80 transition-all duration-500 hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-brand-cream"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-12 grid w-full max-w-[920px] gap-px overflow-hidden rounded-md border border-brand-charcoal/10 bg-brand-charcoal/10 text-left sm:grid-cols-3">
            <div className="bg-brand-paper p-5">
              <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                Email
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block break-all text-[13.5px] font-medium text-brand-ink hover:text-brand-terracotta"
              >
                {site.email}
              </a>
            </div>
            <div className="bg-brand-paper p-5">
              <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                WhatsApp · Telegram
              </div>
              <a
                href={site.whatsapp}
                className="mt-2 block text-[13.5px] font-medium text-brand-ink hover:text-brand-terracotta"
              >
                {site.phone}
              </a>
            </div>
            <div className="bg-brand-paper p-5">
              <div className="text-[10px] uppercase tracking-[0.32em] text-brand-charcoal/55">
                Office · Astana
              </div>
              <div className="mt-2 text-[13px] leading-snug text-brand-ink">
                {site.address}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-brand-charcoal/10 pt-7 text-[12px] text-brand-charcoal/55 md:flex-row">
          <span>© {new Date().getFullYear()} Ozge Tourism. All rights reserved.</span>
          <span>Designed with care in Astana · Kazakhstan</span>
        </div>
      </div>
    </footer>
  );
}
