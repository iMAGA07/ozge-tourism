// Contact & company details — one place to edit them.
// ⚠️ PLACEHOLDERS: confirm every value marked TODO before launch
// (the requirements ask that no unconfirmed contact details go live).

export const site = {
  name: "Ozge Academy",
  legalName: "Ozge Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ozgeacademy.com",
  founded: 2025,
  registration: "Astana International Financial Centre (AIFC), Kazakhstan",

  // TODO confirm: currently the Ozge group WhatsApp line.
  whatsapp: "+77757145327",
  whatsappDisplay: "+7 775 714 53 27",
  // TODO confirm: mailbox on the proposed domain.
  email: "info@ozgeacademy.com",
  // City only — no street address until a public office is confirmed.
  city: "Astana, Kazakhstan",
  // TODO confirm opening hours.
  hours: "Mon–Sat · 09:00–19:00 (GMT+5)",
  timezone: "Asia/Almaty",

  // Add profile URLs to show icons in the footer and contact page.
  socials: [] as { label: "Instagram" | "Facebook" | "TikTok" | "Telegram" | "LinkedIn" | "YouTube"; href: string }[],
  sister: { name: "Ozge Tourism", href: "https://ozgetourism.com" },
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
