"use client";

import Link from "next/link";
import Image from "next/image";
import { Rss, Clapperboard } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { gsap } from "gsap";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  const desktopShellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      setIsAtTop(window.scrollY <= 4);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useLayoutEffect(() => {
    const shell = desktopShellRef.current;
    if (!shell) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targetMaxWidth = isAtTop ? "100%" : "48rem"; // 3xl
    const targetRadius = isAtTop ? 0 : 16; // rounded-2xl
    const targetY = isAtTop ? 0 : 12; // translate-y-3
    const duration = reduceMotion ? 0 : isAtTop ? 0.95 : 0.6;

    gsap.to(shell, {
      maxWidth: targetMaxWidth,
      borderRadius: targetRadius,
      y: targetY,
      duration,
      ease: reduceMotion ? "none" : "elastic.out(0.8, 0.55)",
      force3D: true,
      overwrite: true,
    });
  }, [isAtTop]);

  return (
    <>
      {/* Mobile: standard top navbar (no dock style) */}
      <header className="lg:hidden sticky top-0 z-50 w-full border-b border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-[0_8px_20px_color-mix(in_oklab,var(--foreground)_6%,transparent)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="Home">
            <Image src="/favicon.ico" alt="Revaea logo" width={24} height={24} preload />
            <span className="text-lg sm:text-xl leading-none">Revaea</span>
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Phone (<md): hide Blog/HLS. Tablet (md..lg-1): show them. */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm">
              <a
                href="https://blog.igcrystal.icu/blog/"
                className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:text-brand hover:bg-black/[.04] dark:hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
                <span>Blog</span>
              </a>
              <a
                href="https://hls.revaea.com"
                className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.06] hover:text-brand hover:bg-black/[.04] dark:hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
              >
                <Clapperboard className="h-4 w-4" aria-hidden="true" />
                <span>HLS</span>
              </a>
            </nav>

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
        </div>
      </header>

      {/* Desktop: floating dock-style navbar */}
      <header className="hidden lg:block fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="pt-[env(safe-area-inset-top)]">
          <div
            ref={desktopShellRef}
            className={
              "pointer-events-auto mx-auto w-full max-w-full will-change-[transform,max-width,border-radius] transform-gpu [contain:layout_paint] " +
              "transition-[box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none " +
              "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 " +
              (isAtTop
                ? "border border-x-transparent border-t-transparent border-b border-b-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] shadow-[0_8px_20px_color-mix(in_oklab,var(--foreground)_6%,transparent)]"
                : "border border-[color:color-mix(in_oklab,var(--foreground)_16%,transparent)] shadow-[0_20px_60px_color-mix(in_oklab,var(--foreground)_12%,transparent)]")
            }
          >
            <div
              className={
                "flex items-center gap-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 " +
                (isAtTop ? "h-16" : "h-14")
              }
            >
              <Link
                href="/"
                className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)]"
                aria-label="Home"
              >
                <Image src="/favicon.ico" alt="Revaea logo" width={22} height={22} preload />
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
        </div>
      </header>
    </>
  );
}


