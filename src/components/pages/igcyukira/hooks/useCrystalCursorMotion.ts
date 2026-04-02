import type { RefObject } from "react";
import { useEffect } from "react";

export function useCrystalCursorMotion(params: {
  enabled: boolean;
  cursorRef: RefObject<HTMLDivElement | null>;
  trailRef: RefObject<HTMLDivElement | null>;
}) {
  const { enabled, cursorRef, trailRef } = params;

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    };

    const animTrail = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.left = `${tx}px`;
      trail.style.top = `${ty}px`;
      rafId = window.requestAnimationFrame(animTrail);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafId = window.requestAnimationFrame(animTrail);

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, cursorRef, trailRef]);
}
