import type { MetadataRoute } from "next";

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, "")
    : undefined;
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV;

  if (env === "production" && siteUrl) return siteUrl;
  if (env !== "production" && vercelUrl) return vercelUrl;
  if (siteUrl) return siteUrl;
  if (vercelUrl) return vercelUrl;
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/igcrystal", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/bayhyn", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/xirayu", priority: 0.8, changeFrequency: "weekly" as const },
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