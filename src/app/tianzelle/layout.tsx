import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

const title = "Tianzelle — One, Two, Three...";
const description =
  "A gentle vignette about a little girl who counts her steps, a cloud that falls from the sky, and a world that treats everything with earnest care.";
const url = "https://revaea.com/tianzelle";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    locale: "en_US",
    url,
    siteName: "Revaea",
    type: "article",
    images: [
      {
        url: "https://revaea.com/og-image.png",
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
    images: ["https://revaea.com/og-image.png"],
  },
};

const cuteRounded = M_PLUS_Rounded_1c({
  variable: "--font-tianzelle-cute",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function TianzelleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cuteRounded.variable}>{children}</div>;
}
