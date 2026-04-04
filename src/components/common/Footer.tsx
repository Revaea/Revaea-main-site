import Image from "next/image";
import { Rss, Bird, CircleStar, Clapperboard } from "lucide-react";
import { RevealImage } from "@/components/ui/reveal";

export default function Footer() {
  return (
    <footer className="mt-20 relative z-40 overflow-hidden select-none backdrop-blur-md bg-background/60 border-t border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] shadow-[0_-14px_32px_color-mix(in_oklab,var(--foreground)_4%,transparent)]">
      {/* Background image: one instance for both mobile + desktop (avoid double loads) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto z-0 pointer-events-none opacity-20 md:opacity-28 md:w-[40vw] md:max-w-[520px] md:min-w-[280px]"
      >
        <RevealImage
          src="/img/footer/footer.webp"
          alt=""
          fill
          preload
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover object-right-top md:object-right"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4 text-sm text-muted">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Image src="/favicon.ico" alt="Revaea logo" width={24} height={24} />
            <span>Revaea</span>
          </div>
          <p className="text-muted">The road is long, and the dream lives on.</p>
        </div>

        <div>
          <div className="font-semibold mb-2">Navigation</div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://blog.igcrystal.icu/blog/"
                className="inline-flex items-center gap-1 transition-colors hover:text-brand"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a
                href="https://hls.revaea.com"
                className="inline-flex items-center gap-1 transition-colors hover:text-brand"
              >
                <Clapperboard className="h-4 w-4" aria-hidden="true" />
                <span>HLS</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">World</div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://lfl.i0c.cc"
                className="inline-flex items-center gap-1 transition-colors hover:text-brand"
              >
                <Bird className="h-4 w-4" aria-hidden="true" />
                <span>LandfillLand</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Neo-Life"
                className="inline-flex items-center gap-1 transition-colors hover:text-brand"
              >
                <CircleStar className="h-4 w-4" aria-hidden="true" />
                <span>NeoLife</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 text-center text-xs text-muted-foreground pb-8 px-4">
        <span className="inline-block text-base font-semibold leading-none align-middle">©</span>{" "}
        {new Date().getFullYear()} Revaea. Content belongs to respective owners.
      </div>
    </footer>
  );
}