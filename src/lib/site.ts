const TRAILING_SLASH_RE = /\/$/;

function normalizeUrl(value?: string): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return withProtocol.replace(TRAILING_SLASH_RE, "");
}

export function getBaseUrl(): string {
  const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const vercelUrl = process.env.VERCEL_URL
    ? normalizeUrl(`https://${process.env.VERCEL_URL}`)
    : undefined;

  // 'production' | 'preview' | 'development'
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV;

  if (env === "production") return siteUrl ?? vercelUrl ?? "http://localhost:3000";
  if (env === "preview") return vercelUrl ?? siteUrl ?? "http://localhost:3000";

  // local development: prefer explicit SITE_URL when provided
  return siteUrl ?? "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(getBaseUrl());
}
