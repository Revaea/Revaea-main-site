"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export type HoverCircleMaskProps = {
  children: React.ReactNode;
  className?: string;
  circleColor?: string;
  circleOpacity?: number;
  origin?: "bottom" | "cursor";
  cursorPaddingPx?: number;
  hoverScale?: number;
  circleDurationMs?: number;
};

export default function HoverCircleMask({
  children,
  className = "",
  circleColor = "var(--color-brand)",
  circleOpacity = 0.12,
  origin = "bottom",
  cursorPaddingPx = 8,
  hoverScale = 1.2,
  circleDurationMs = 500,
}: HoverCircleMaskProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const requiredScaleRef = useRef<number>(0);
  const activePointerIdRef = useRef<number | null>(null);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const circle = circleRef.current;
    return () => {
      if (circle) gsap.killTweensOf(circle);
    };
  }, []);

  useLayoutEffect(() => {
    const hostEl = hostRef.current;
    const circleEl = circleRef.current;
    if (!hostEl || !circleEl) return;

    // Reset to a known base state.
    gsap.set(circleEl, { scale: 0, xPercent: 0, yPercent: 0 });

    const layoutCircle = () => {
      if (origin !== "bottom") return;

      const rect = hostEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      // Pill-style circle that fully covers a rounded rect when scaled.
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      // Compute the minimal scale needed to cover the host's top corners.
      // We expand a bottom-anchored circle; larger, taller targets need a larger scale.
      const x = w / 2;
      const a = h - R;
      const A = h * (2 * R - h);
      let requiredScale = 0;
      if (A > 0) {
        const term = h * h * a * a + A * (x * x + h * h);
        requiredScale = (-h * a + Math.sqrt(Math.max(0, term))) / A;
      }
      // Small safety margin for rounding, borders, and subpixel layouts.
      requiredScaleRef.current = Number.isFinite(requiredScale) && requiredScale > 0 ? requiredScale * 1.03 : 0;

      circleEl.style.width = `${D}px`;
      circleEl.style.height = `${D}px`;
      circleEl.style.left = "50%";
      circleEl.style.bottom = `-${delta}px`;
      circleEl.style.top = "";

      gsap.set(circleEl, {
        xPercent: -50,
        yPercent: 0,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });
    };

    layoutCircle();
    window.addEventListener("resize", layoutCircle);
    return () => window.removeEventListener("resize", layoutCircle);
  }, [origin]);

  const layoutCursorCircleAt = useCallback(
    (clientX: number, clientY: number) => {
      const hostEl = hostRef.current;
      const circleEl = circleRef.current;
      if (!hostEl || !circleEl) return;

      const rect = hostEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const d1 = Math.hypot(x, y);
      const d2 = Math.hypot(w - x, y);
      const d3 = Math.hypot(x, h - y);
      const d4 = Math.hypot(w - x, h - y);
      const r = Math.max(d1, d2, d3, d4) + cursorPaddingPx;
      const D = Math.ceil(r * 2);

      requiredScaleRef.current = 1;
      circleEl.style.width = `${D}px`;
      circleEl.style.height = `${D}px`;
      circleEl.style.left = `${x}px`;
      circleEl.style.top = `${y}px`;
      circleEl.style.bottom = "";

      gsap.set(circleEl, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });
    },
    [cursorPaddingPx]
  );

  const start = useCallback(
    (clientX: number, clientY: number) => {
      const circle = circleRef.current;
      if (!circle) return;

      if (origin === "cursor") {
        layoutCursorCircleAt(clientX, clientY);
      }

      const effectiveScale = origin === "cursor" ? 1 : Math.max(hoverScale, requiredScaleRef.current || 0);

      gsap.killTweensOf(circle);

      if (prefersReducedRef.current) {
        gsap.set(circle, { scale: effectiveScale });
        return;
      }

      gsap.to(circle, {
        scale: effectiveScale,
        duration: circleDurationMs / 1000,
        ease: "power2.out",
      });
    },
    [circleDurationMs, hoverScale, layoutCursorCircleAt, origin]
  );

  const onLeave = useCallback(() => {
    const circle = circleRef.current;
    if (!circle) return;

    gsap.killTweensOf(circle);

    if (prefersReducedRef.current) {
      gsap.set(circle, { scale: 0 });
      return;
    }

    gsap.to(circle, {
      scale: 0,
      duration: circleDurationMs / 1000,
      ease: "power2.out",
    });
  }, [circleDurationMs]);

  const onPointerEnter = useCallback(
    (ev: React.PointerEvent<HTMLDivElement>) => {
      // For touch, we start on pointer down instead (hover doesn't exist).
      if (ev.pointerType === "touch") return;
      start(ev.clientX, ev.clientY);
    },
    [start]
  );

  const onPointerDown = useCallback(
    (ev: React.PointerEvent<HTMLDivElement>) => {
      if (ev.pointerType !== "touch") return;

      activePointerIdRef.current = ev.pointerId;
      // Capture so we reliably get pointerup/cancel even if the finger moves.
      try {
        ev.currentTarget.setPointerCapture(ev.pointerId);
      } catch {
        // ignore
      }

      start(ev.clientX, ev.clientY);
    },
    [start]
  );

  const onPointerUp = useCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.pointerType !== "touch") return;
    if (activePointerIdRef.current !== ev.pointerId) return;
    activePointerIdRef.current = null;
    onLeave();
  }, [onLeave]);

  const onPointerCancel = useCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.pointerType !== "touch") return;
    if (activePointerIdRef.current !== ev.pointerId) return;
    activePointerIdRef.current = null;
    onLeave();
  }, [onLeave]);

  const onPointerLeave = useCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.pointerType === "touch") return;
    onLeave();
  }, [onLeave]);

  return (
    <div
      ref={hostRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={"relative overflow-hidden " + className}
      style={{ touchAction: "manipulation" }}
    >
      <span
        ref={circleRef}
        className="absolute rounded-full z-10 pointer-events-none"
        style={{ backgroundColor: circleColor, opacity: circleOpacity, transformOrigin: "50% 50%" }}
      />
      <div className="relative z-0 w-full h-full">{children}</div>
    </div>
  );
}
