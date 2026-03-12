import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const EXCLUDED_PREFIXES = ["/api", "/_next", "/_vercel"] as const;
const HAS_FILE_EXTENSION = /\/[^/]+\.[^/]+$/;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lower = pathname.toLowerCase();

  const shouldNormalizeCase =
    pathname !== lower &&
    !EXCLUDED_PREFIXES.some(
      (prefix) => lower === prefix || lower.startsWith(`${prefix}/`),
    ) &&
    !HAS_FILE_EXTENSION.test(pathname);

  if (shouldNormalizeCase) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
