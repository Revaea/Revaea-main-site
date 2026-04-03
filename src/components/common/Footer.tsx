import Image from "next/image";
import { Rss, Bird, CircleStar, Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-20 relative z-40 overflow-hidden backdrop-blur-md bg-white/60 dark:bg-black/60">
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-0 z-0 pointer-events-none bg-[url('/img/footer/footer.webp')] bg-cover bg-right-top bg-no-repeat opacity-25 dark:opacity-15"
      />

      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 right-0 z-0 w-[40vw] max-w-[520px] min-w-[280px] bg-[url('/img/footer/footer.webp')] bg-cover bg-right bg-no-repeat opacity-35 dark:opacity-20"
      />

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
              <a href="https://blog.igcrystal.icu/blog/" className="inline-flex items-center gap-1">
                <Rss className="h-4 w-4" aria-hidden="true" />
                <span className="transition-colors hover:text-brand">Blog</span>
              </a>
            </li>
            <li>
              <a href="https://hls.revaea.com" className="inline-flex items-center gap-1">
                <Clapperboard className="h-4 w-4" aria-hidden="true" />
                <span className="transition-colors hover:text-brand">HLS</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">World</div>
          <ul className="space-y-1">
            <li>
              <a href="https://lfl.i0c.cc" className="inline-flex items-center gap-1">
                <Bird className="h-4 w-4" aria-hidden="true" />
                <span className="transition-colors hover:text-brand">LandfillLand</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/Neo-Life" className="inline-flex items-center gap-1">
                <CircleStar className="h-4 w-4" aria-hidden="true" />
                <span className="transition-colors hover:text-brand">NeoLife</span>
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