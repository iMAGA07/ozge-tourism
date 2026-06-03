"use client";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./icons";

/**
 * Always-on contact dock for phones (the desktop header already shows a
 * fixed contact cluster). Fixed to the bottom-right so visitors can reach
 * us on WhatsApp or email at any point while scrolling. White, outlined
 * buttons so they read clearly over any section background.
 */
export function ContactDock() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2.5 sm:hidden">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-ink/12 bg-white text-[#25D366] shadow-lg shadow-brand-ink/15 active:scale-95"
      >
        <WhatsAppIcon className="h-[24px] w-[24px]" />
      </a>
      <a
        href={`mailto:${site.email}`}
        aria-label="Email us"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-ink/12 bg-white text-brand-terracotta shadow-lg shadow-brand-ink/15 active:scale-95"
      >
        <Mail className="h-[22px] w-[22px]" />
      </a>
    </div>
  );
}
