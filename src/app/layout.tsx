import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Shell from "@/components/Shell";
import "./globals.css";
import "./igcrystal/igcrystal.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Export viewport config separately (recommended in Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#4CABF7", // Example: sky-blue tint for mobile browser UI.
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://revaea.com"),
  
  title: {
    default: "Revaea — Woven by Will, Lit by Peace",
    template: "%s | Revaea",
  },
  
  description: "A world woven by resonant will—paced by calm and kindness, where love can awaken the stars.",
  
  // 2. Keywords: not heavily used by Google, but still helpful for some engines.
  keywords: ["Revaea", "worldbuilding", "original setting", "dreams", "web development", "will"],
  
  // 3. Author / creator info
  authors: [{ name: "IGCrystal", url: "https://www.revaea.com/igcrystal" }],
  creator: "IGCrystal",
  publisher: "Revaea",
  
  // 4. Canonical URL
  alternates: {
    canonical: "./",
  },

  // 5. Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Revaea — Woven by Will, Lit by Peace",
    description: "A world woven by resonant will—paced by calm and kindness, where love can awaken the stars.",
    url: "https://revaea.com",
    siteName: "Revaea",
    locale: "en_US",
    type: "website",
    // 6. OG image: explicit declaration is more reliable.
    images: [
      {
        url: "/og-image.png", // Tip: a 1200x630 cover image works well.
        width: 505,
        height: 339,
        alt: "Revaea World Preview",
    }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Revaea — Woven by Will, Lit by Peace",
    description: "A world woven by resonant will—paced by calm and kindness, where love can awaken the stars.",
    creator: "@Cedar2352", 
    images: ["/og-image.png"], 
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple.png", // Apple touch icon
  },
  
  // 7. Application name (for "Add to Home Screen")
  applicationName: "Revaea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}
        style={{ overscrollBehavior: 'none' }}
      >
        <Analytics/>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
