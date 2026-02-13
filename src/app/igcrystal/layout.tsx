import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "IGCrystal · ViaLonga Somniviva",
    template: "%s · IGCrystal",
  },
  description:
    "The wind swept across the vast wilderness, shimmering with silver light, as footprints were slowly swallowed by the stars.",
  alternates: {
    canonical: "/igcrystal",
  },
};

export default function IGCrystalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="igcrystal">{children}</div>;
}
