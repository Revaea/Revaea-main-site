import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_SC, Space_Mono } from "next/font/google";

import "./igcyukira.css";

import { getMetadataBase } from "@/lib/site";

const brandSerif = Noto_Serif_SC({
  weight: ["300", "400", "600"],
  display: "swap",
  fallback: ["serif"],
  adjustFontFallback: false,
  variable: "--font-brand-serif",
});

const brandDisplay = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["serif"],
  adjustFontFallback: false,
  variable: "--font-brand-display",
});

const brandMono = Space_Mono({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
  adjustFontFallback: false,
  variable: "--font-brand-mono",
});

const title = "IGCrystal - Ice Glycoside Crystal | Revaea";
const description = "A crystallization of purity, reason, and the will of light.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/igcyukira",
  },
  keywords: [
    "IGCyukira",
    "IGCrystal",
    "Ice Glycoside Crystal",
    "character archive",
    "original character",
  ],
  openGraph: {
    type: "website",
    url: "/igcyukira",
    title,
    description,
    siteName: "Revaea",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 505,
        height: 339,
        alt: "Revaea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8f4fd",
};

export default function IGCyukiraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`igcyukira ${brandSerif.variable} ${brandDisplay.variable} ${brandMono.variable} ${brandSerif.className}`}
    >
      {children}
    </div>
  );
}
