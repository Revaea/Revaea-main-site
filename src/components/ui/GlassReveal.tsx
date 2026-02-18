"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type GlassRevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
  rounded?: string; // tailwind rounded class, e.g., 'rounded-md', 'rounded-2xl'
};

export default function GlassReveal({ children, delayMs = 0, className = "", rounded = "rounded-md" }: GlassRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const rafId = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delayMs);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delayMs]);

  const visibilityClass = visible
    ? "opacity-100 translate-y-0 backdrop-blur-[2px] border border-white/20 dark:border-white/5 bg-white/5 dark:bg-black/5"
    : "opacity-0 translate-y-2 backdrop-blur-none bg-transparent border-transparent";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${rounded} overflow-hidden ${visibilityClass} ${className}`}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
}