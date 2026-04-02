"use client";

import { useEffect, useState } from "react";

import { Layers, RefreshCcw, Sigma, User } from "lucide-react";

export function TopNav() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsHidden(anyVisible);
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      aria-hidden={isHidden}
      className={`fixed inset-x-0 bottom-0 z-[110] will-change-[opacity] transition-opacity duration-500 [transition-timing-function:var(--transition)] ${
        isHidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3">
        <div className="mx-auto max-w-[720px] rounded-[18px] border border-[rgba(184,223,245,0.5)] bg-white/80 shadow-[0_20px_60px_rgba(58,155,191,0.12)] backdrop-blur-[10px]">
          <ul className="grid grid-cols-4">
            {(
              [
                ["#identity", "Profile", User],
                ["#duality", "Duality", Layers],
                ["#cycle", "Cycle", RefreshCcw],
                ["#formula", "Formula", Sigma],
              ] as const
            ).map(([href, label, Icon]) => (
              <li key={href} className="min-w-0">
                <a
                  href={href}
                  className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-4 font-brandMono text-[0.6rem] tracking-[0.25em] text-[color:var(--text-secondary)] uppercase no-underline transition-colors duration-300 hover:text-[color:var(--deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--crystal)] max-[520px]:py-3"
                  aria-label={label}
                  tabIndex={isHidden ? -1 : undefined}
                >
                  <Icon
                    className="h-5 w-5 text-[color:var(--crystal)] max-[520px]:h-[18px] max-[520px]:w-[18px]"
                    aria-hidden="true"
                  />
                  <span className="truncate">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
