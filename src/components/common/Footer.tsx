"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageSquare, NotebookText, ShieldCheck, FileText } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const hideLayoutChrome = pathname?.startsWith("/xirayu");

  if (hideLayoutChrome) {
    return null;
  }

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
            <li><Link href="https://c.Revaea.com" className="hover:text-brand flex items-center gap-1"><MessageSquare className="h-4 w-4" />Chat</Link></li>
            <li><Link href="https://n.Revaea.com" className="hover:text-brand flex items-center gap-1"><NotebookText className="h-4 w-4" />Notes</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1">
            <li>
              <Link href="/privacy" target="_blank" className="hover:text-brand flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" target="_blank" className="hover:text-brand flex items-center gap-1">
                <FileText className="h-4 w-4" />Terms of Service
              </Link>
            </li>
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