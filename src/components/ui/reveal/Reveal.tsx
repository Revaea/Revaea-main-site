"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
};

export default function Reveal({ children, delayMs = 0, from = "up", className }: RevealProps) {
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

  const translateClass = visible
    ? "opacity-100 translate-x-0 translate-y-0"
    : from === "up"
    ? "opacity-0 translate-y-4"
    : from === "down"
    ? "opacity-0 -translate-y-4"
    : from === "left"
    ? "opacity-0 translate-x-4"
    : from === "right"
    ? "opacity-0 -translate-x-4"
    : "opacity-0";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${translateClass} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
