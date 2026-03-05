import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/igcrystal", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/bayhyn", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/xirayu", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tianzelle", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" as const },  
  ];

  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}