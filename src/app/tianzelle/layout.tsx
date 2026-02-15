import type { Metadata } from "next";

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

export default function TianzelleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
