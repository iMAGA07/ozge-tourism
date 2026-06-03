"use client";
import { MessageCircle, Mail } from "lucide-react";
import { site } from "@/data/site";

/**
 * Always-on contact dock for phones (the desktop header already shows a
 * fixed contact cluster). Fixed to the bottom-right so visitors can reach
 * us on WhatsApp or email at any point while scrolling.
 */
export function ContactDock() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2.5 sm:hidden">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-ink text-brand-cream shadow-lg shadow-brand-ink/25 active:scale-95"
      >
        <MessageCircle className="h-[22px] w-[22px]" />
      </a>
      <a
        href={`mailto:${site.email}`}
        aria-label="Email us"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-saffron text-brand-ink shadow-lg shadow-brand-ink/20 active:scale-95"
      >
        <Mail className="h-[22px] w-[22px]" />
      </a>
    </div>
  );
}
