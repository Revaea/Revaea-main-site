import type { RefObject } from "react";
import { useEffect } from "react";

function closestInteractive(target: EventTarget | null, selector: string) {
  if (!(target instanceof Element)) return null;
  return target.closest(selector);
}

export function useCrystalCursorHover(params: {
  enabled: boolean;
  cursorRef: RefObject<HTMLDivElement | null>;
  trailRef: RefObject<HTMLDivElement | null>;
  interactiveSelector: string;
}) {
  const { enabled, cursorRef, trailRef, interactiveSelector } = params;

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const applyHover = () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      cursor.style.backgroundColor = "var(--deep)";
      trail.style.width = "50px";
      trail.style.height = "50px";
    };

    const applyRest = () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursor.style.backgroundColor = "var(--crystal)";
      trail.style.width = "32px";
      trail.style.height = "32px";
    };

    let isHovering = false;

    const setHovering = (next: boolean) => {
      if (next === isHovering) return;
      isHovering = next;
      if (isHovering) applyHover();
      else applyRest();
    };

    let lastX: number | null = null;
    let lastY: number | null = null;
    let rafId: number | null = null;

    const updateFromPoint = () => {
      rafId = null;

      if (lastX == null || lastY == null) return;

      const el = document.elementFromPoint(lastX, lastY);
      const current = closestInteractive(el, interactiveSelector);
      setHovering(Boolean(current));
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(updateFromPoint);
    };

    const onOver = (e: MouseEvent) => {
      const current = closestInteractive(e.target, interactiveSelector);
      if (!current) return;

      const related = closestInteractive(e.relatedTarget, interactiveSelector);
      if (related) return;

      setHovering(true);
    };

    const onOut = (e: MouseEvent) => {
      const current = closestInteractive(e.target, interactiveSelector);
      if (!current) return;

      const related = closestInteractive(e.relatedTarget, interactiveSelector);
      if (related) return;

      setHovering(false);
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    // wheel event provides clientX/clientY: when user scrolls without moving pointer, update hover state.
    const onWheel = (e: WheelEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      scheduleUpdate();
    };

    const onScrollOrResize = () => {
      scheduleUpdate();
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);

      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [enabled, cursorRef, trailRef, interactiveSelector]);
}
