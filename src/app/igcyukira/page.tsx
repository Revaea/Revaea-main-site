import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getBaseUrl } from "@/lib/site";
import { JsonLd } from "@/components/pages/igcyukira/seo/JsonLd";
import { IGCyukiraClient } from "@/components/pages/igcyukira/IGCyukiraClient";

export const metadata: Metadata = {
  title: "IGCyukira - Ice Glycoside Crystal",
  description: "Character archive for IGCyukira (Ice Glycoside Crystal).",
  alternates: {
    canonical: "/igcyukira",
  },
};

export default function Page() {
  const base = getBaseUrl();
  const url = new URL("/igcyukira", base).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "IGCyukira - Ice Glycoside Crystal",
    url,
    inLanguage: "en",
    description: "Character archive for IGCyukira (Ice Glycoside Crystal).",
  };

  return (
    <>
      <Link
        href="/"
        aria-label="Back to home"
        className="fixed top-6 left-5 z-[200] inline-flex items-center gap-2 text-xs font-light tracking-[0.45em] uppercase opacity-70 transition-all duration-500 hover:opacity-100 translate-y-0 motion-safe:animate-[igcyukiraBackIn_650ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none group md:top-8 md:left-10 md:text-sm lg:left-16"
        style={{ fontFamily: "var(--font-mono-family)" }}
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
        <span className="tracking-[0.55em]">BACK</span>
      </Link>
      <JsonLd data={jsonLd} />
      <IGCyukiraClient />
    </>
  );
}
