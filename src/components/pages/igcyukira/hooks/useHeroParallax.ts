import type { RefObject } from "react";
import { useEffect } from "react";

export function useHeroParallax(params: {
  heroContentRef: RefObject<HTMLElement | null>;
  heroBgRef: RefObject<HTMLElement | null>;
}) {
  const { heroContentRef, heroBgRef } = params;

  useEffect(() => {
    const heroContent = heroContentRef.current;
    const heroBg = heroBgRef.current;
    if (!heroContent && !heroBg) return;

    let rafId = 0;
    let latestY = 0;

    const apply = () => {
      if (heroContent) {
        heroContent.style.transform = `translateY(${latestY * 0.3}px)`;
      }
      if (heroBg) {
        heroBg.style.transform = `translateY(${latestY * 0.15}px)`;
      }
      rafId = 0;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (!rafId) rafId = window.requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [heroContentRef, heroBgRef]);
}
