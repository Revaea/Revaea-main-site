import Link from "next/link";
import Image from "next/image";
import { Rss, Clapperboard } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <>
      {/* Mobile: standard top navbar (no dock style) */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="Home">
            <Image src="/favicon.ico" alt="Revaea logo" width={24} height={24} priority />
            <span className="text-lg sm:text-xl leading-none">Revaea</span>
          </Link>

          {/* Mobile: hide Blog/HLS per requirement */}

          <a
            href="https://github.com/Revaea"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
          >
            <IconBrandGithub className="h-5 w-5" stroke={1.8} aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Desktop: floating dock-style navbar */}
      <header className="hidden md:block fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div
            className="pointer-events-auto mx-auto flex h-14 items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-background/70 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] px-2 sm:px-3"
          >
            <Link
              href="/"
              className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
              aria-label="Home"
            >
              <Image src="/favicon.ico" alt="Revaea logo" width={22} height={22} priority />
              <span className="text-base lg:text-lg leading-none">Revaea</span>
            </Link>

            <div className="ml-auto flex items-center gap-1.5">
              <nav className="flex items-center gap-1.5 text-sm">
                <a
                  href="https://blog.igcrystal.icu/blog/"
                  className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:text-brand hover:bg-black/[.04] dark:hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
                >
                  <Rss className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden lg:inline">Blog</span>
                </a>
                <a
                  href="https://hls.revaea.com"
                  className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:text-brand hover:bg-black/[.04] dark:hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
                >
                  <Clapperboard className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden lg:inline">HLS</span>
                </a>
              </nav>

              <a
                href="https://github.com/Revaea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:text-brand hover:bg-black/[.04] dark:hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
              >
                <IconBrandGithub className="h-5 w-5" stroke={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


