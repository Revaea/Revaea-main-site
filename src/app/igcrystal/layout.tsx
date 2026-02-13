import type { Metadata } from "next";

const title = "IGCrystal · ViaLonga Somniviva";
const description =
  "The wind swept across the vast wilderness, shimmering with silver light, as footprints were slowly swallowed by the stars.";
const url = "https://revaea.com/igcrystal";

export const metadata: Metadata = {
  title: {
    absolute: `${title} | Revaea`,
  },
  description,
  alternates: {
    canonical: url,
  },

  openGraph: {
    title,
    description,
    siteName: "Revaea",
    locale: "zh_CN",
    type: "website",
    url,
    images: [
      {
        url: "https://revaea.com/logo.png",
        alt: "IGCrystal Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Cedar2352",
    images: ["https://revaea.com/logo.png"],
  },

  keywords: ["IGCrystal", "Revaea", "ViaLonga", "Somniviva"],
};

export default function IGCrystalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="igcrystal">{children}</div>;
}
