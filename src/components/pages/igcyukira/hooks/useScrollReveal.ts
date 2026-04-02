import { useEffect } from "react";

export function useScrollReveal(params?: { selector?: string; threshold?: number }) {
  const selector = params?.selector ?? ".reveal";
  const threshold = params?.threshold ?? 0.15;

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, threshold]);
}
