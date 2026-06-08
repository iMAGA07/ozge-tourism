import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// Per the brief, the brand corporate font is Futura. Apple devices have it
// installed system-wide; everywhere else we use Jost — the closest
// open-source Futura match — via next/font for performance + SSR.
// One Jost instance powers both --font-sans and --font-display (the
// "display" face was the same font — loading it twice just shipped
// duplicate weights). Only the weights actually used (300–700); no 800/900.
const sans = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});
// Cormorant is only ever used italic on this site, so we load italic only
// at the three weights in use — halving the serif font payload.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  style: ["italic"],
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-brand-paper text-brand-ink antialiased">
        {children}
      </body>
    </html>
  );
}
