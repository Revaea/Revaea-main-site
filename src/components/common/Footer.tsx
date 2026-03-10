import Image from "next/image";
import { Rss, Bird, CircleStar, Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-20 relative z-40 backdrop-blur-md bg-white/60 dark:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4 text-sm text-muted">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Image src="/favicon.ico" alt="Revaea logo" width={24} height={24} />
            <span>Revaea</span>
          </div>
          <p className="text-muted">The road is long, and the dream lives on.</p>
        </div>

        <div>
          <div className="font-medium mb-2">Navigation</div>
          <ul className="space-y-1">
            <li><a href="https://blog.igcrystal.icu/blog/" className="hover:text-brand flex items-center gap-1"><Rss className="h-4 w-4" />Blog</a></li>
            <li><a href="https://hls.revaea.com" className="hover:text-brand flex items-center gap-1"><Clapperboard className="h-4 w-4" />HLS</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">World</div>
          <ul className="space-y-1">
            <li><a href="https://lfl.i0c.cc" className="hover:text-brand flex items-center gap-1"><Bird className="h-4 w-4" />LandfillLand</a></li>
            <li><a href="https://github.com/Neo-Life" className="hover:text-brand flex items-center gap-1"><CircleStar className="h-4 w-4" />NeoLife</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">Contact</div>
          <p className="text-muted">IGCrystal@Revaea.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-8 px-4">© {new Date().getFullYear()} Revaea. Content belongs to respective owners.</div>
    </footer>
  );
}