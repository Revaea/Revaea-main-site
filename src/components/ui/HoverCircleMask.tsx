"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export type HoverCircleMaskProps = {
  children: React.ReactNode;
  className?: string;
  circleColor?: string;
  circleOpacity?: number;
  hoverScale?: number;
  circleDurationMs?: number;
};

export default function HoverCircleMask({
  children,
  className = "",
  circleColor = "var(--color-brand)",
  circleOpacity = 0.12,
  hoverScale = 1.2,
  circleDurationMs = 500,
}: HoverCircleMaskProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const requiredScaleRef = useRef<number>(0);
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

    const layoutCircle = () => {
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
      circleEl.style.bottom = `-${delta}px`;

      gsap.set(circleEl, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });
    };

    layoutCircle();
    window.addEventListener("resize", layoutCircle);
    return () => window.removeEventListener("resize", layoutCircle);
  }, []);

  const onEnter = useCallback(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const effectiveScale = Math.max(hoverScale, requiredScaleRef.current || 0);

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
  }, [circleDurationMs, hoverScale]);

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

  return (
    <div
      ref={hostRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={"relative overflow-hidden " + className}
    >
      <span
        ref={circleRef}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full z-10 pointer-events-none"
        style={{ backgroundColor: circleColor, opacity: circleOpacity, transformOrigin: "50% 50%" }}
      />
      <div className="relative z-0 w-full h-full">{children}</div>
    </div>
  );
}
