"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageSquare, NotebookText } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const hideLayoutChrome = pathname?.startsWith("/xirayu");

  if (hideLayoutChrome) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 dark:border-white/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/favicon.ico" alt="Revaea logo" width={24} height={24} priority />
          <span>Revaea</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="https://c.Revaea.com" className="hover:text-brand flex items-center gap-1"><MessageSquare className="h-4 w-4" />Chat</Link>
          <Link href="https://n.Revaea.com" className="hover:text-brand flex items-center gap-1"><NotebookText className="h-4 w-4" />Notes</Link>
        </nav>
        <Link href="https://github.com/Revaea" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.476 5.922.43.37.813 1.102.813 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}


