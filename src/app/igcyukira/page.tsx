import type { Metadata } from "next";

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
      <JsonLd data={jsonLd} />
      <IGCyukiraClient />
    </>
  );
}
