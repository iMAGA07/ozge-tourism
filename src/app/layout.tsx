import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { StickyBookCTA } from "@/components/SectionProgress";

// Per the brief, the brand corporate font is Futura. Apple devices have it
// installed system-wide; everywhere else we use Jost — the closest
// open-source Futura match — via next/font for performance + SSR.
const sans = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});
const display = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Kazakhstan tours",
    "Central Asia travel",
    "Almaty tours",
    "Mangystau tours",
    "Astana tours",
    "luxury travel Kazakhstan",
    "Silk Road",
    "Ozge Tourism",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/photos/IMG_3873.jpg", width: 2200, height: 1467 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/photos/IMG_3873.jpg"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body className="bg-brand-paper text-brand-ink antialiased lg:cursor-none">
        <SmoothScroll />
        <Cursor />
        {children}
        <StickyBookCTA />
      </body>
    </html>
  );
}
