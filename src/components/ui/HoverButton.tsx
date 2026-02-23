"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type HoverButtonProps = {
  href: string;
  children: React.ReactNode;
  circleColor?: string;
  circleOpacity?: number;
  origin?: "bottom" | "cursor";
  cursorPaddingPx?: number;
  hoverTextColor?: string;
  hoverScale?: number; // pill circle scale
  circleDurationMs?: number;
  rollDurationMs?: number;
  rollOffsetPx?: number;
  className?: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export default function HoverButton({
  href,
  children,
  circleColor = "var(--color-brand-foreground)",
  circleOpacity = 0.14,
  origin = "bottom",
  cursorPaddingPx = 8,
  hoverTextColor,
  hoverScale = 1.2,
  circleDurationMs = 500,
  rollDurationMs = 200,
  rollOffsetPx = 8,
  className = "",
  prefetch,
  target,
  rel,
  ariaLabel,
}: HoverButtonProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const hoverLabelRef = useRef<HTMLSpanElement | null>(null);
  const labelHeightRef = useRef(0);
  const rollTravelRef = useRef(0);
  const prefersReducedRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);

  const isPlainTextChild = typeof children === "string" || typeof children === "number";
  const shouldRollText = isPlainTextChild;

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const circle = circleRef.current;
    const contentEl = contentRef.current;
    const labelEl = labelRef.current;
    const hoverLabelEl = hoverLabelRef.current;
    return () => {
      if (circle) gsap.killTweensOf(circle);
      if (contentEl) gsap.killTweensOf(contentEl);
      if (labelEl) gsap.killTweensOf(labelEl);
      if (hoverLabelEl) gsap.killTweensOf(hoverLabelEl);
    };
  }, []);

  useLayoutEffect(() => {
    const linkEl = linkRef.current;
    const circleEl = circleRef.current;
    if (!linkEl || !circleEl) return;

    // Reset to a known base state.
    gsap.set(circleEl, { scale: 0, xPercent: 0, yPercent: 0 });

    const layoutCircle = () => {
      if (origin !== "bottom") return;

      const rect = linkEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

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
  }, [children, origin]);

  const layoutCursorCircleAt = useCallback(
    (clientX: number, clientY: number) => {
      const linkEl = linkRef.current;
      const circleEl = circleRef.current;
      if (!linkEl || !circleEl) return;

      const rect = linkEl.getBoundingClientRect();
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
    (clientX?: number, clientY?: number) => {
      const circle = circleRef.current;
      const contentEl = contentRef.current;
      if (!circle || !contentEl) return;

      const labelEl = labelRef.current;
      const hoverLabelEl = hoverLabelRef.current;

      if (origin === "cursor") {
        const linkEl = linkRef.current;
        if (linkEl && clientX != null && clientY != null) {
          layoutCursorCircleAt(clientX, clientY);
        } else if (linkEl) {
          const rect = linkEl.getBoundingClientRect();
          layoutCursorCircleAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }

      const effectiveScale = origin === "cursor" ? 1 : hoverScale;

      gsap.killTweensOf([circle, contentEl]);
      if (labelEl) gsap.killTweensOf(labelEl);
      if (hoverLabelEl) gsap.killTweensOf(hoverLabelEl);

      if (prefersReducedRef.current) {
        gsap.set(circle, { scale: effectiveScale });
        if (hoverTextColor) gsap.set(contentEl, { color: hoverTextColor });
        if (shouldRollText && labelEl && hoverLabelEl) {
          const travel = rollTravelRef.current || labelHeightRef.current + rollOffsetPx;
          gsap.set(labelEl, { y: -travel });
          gsap.set(hoverLabelEl, { y: 0, opacity: 1 });
        }
        return;
      }

      gsap.to(circle, {
        scale: effectiveScale,
        duration: circleDurationMs / 1000,
        ease: "power2.out",
      });

      if (hoverTextColor) {
        gsap.to(contentEl, {
          color: hoverTextColor,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }

      if (shouldRollText && labelEl && hoverLabelEl) {
        const travel = rollTravelRef.current || labelHeightRef.current + rollOffsetPx;
        gsap.to(labelEl, {
          y: -travel,
          duration: rollDurationMs / 1000,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(hoverLabelEl, {
          y: 0,
          opacity: 1,
          duration: rollDurationMs / 1000,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    [
      circleDurationMs,
      hoverScale,
      hoverTextColor,
      layoutCursorCircleAt,
      origin,
      rollDurationMs,
      rollOffsetPx,
      shouldRollText,
    ]
  );

  useLayoutEffect(() => {
    if (!shouldRollText) return;
    const labelEl = labelRef.current;
    const hoverLabelEl = hoverLabelRef.current;
    const linkEl = linkRef.current;
    if (!labelEl || !hoverLabelEl || !linkEl) return;

    const layoutText = () => {
      const labelH = labelEl.getBoundingClientRect().height;
      const buttonH = linkEl.getBoundingClientRect().height;
      if (labelH <= 0 || buttonH <= 0) return;

      const roundedLabelH = Math.ceil(labelH);
      const travel = Math.ceil((buttonH + labelH) / 2 + rollOffsetPx);

      labelHeightRef.current = roundedLabelH;
      rollTravelRef.current = travel;
      gsap.set(labelEl, { y: 0 });
      gsap.set(hoverLabelEl, { y: travel, opacity: 0 });
    };

    layoutText();
    window.addEventListener("resize", layoutText);
    if (document.fonts) {
      document.fonts.ready.then(layoutText).catch(() => {});
    }

    return () => window.removeEventListener("resize", layoutText);
  }, [shouldRollText, children, rollOffsetPx]);

  const onLeave = useCallback(() => {
    const circle = circleRef.current;
    const contentEl = contentRef.current;
    if (!circle || !contentEl) return;

    const labelEl = labelRef.current;
    const hoverLabelEl = hoverLabelRef.current;

    gsap.killTweensOf([circle, contentEl]);
    if (labelEl) gsap.killTweensOf(labelEl);
    if (hoverLabelEl) gsap.killTweensOf(hoverLabelEl);

    if (prefersReducedRef.current) {
      gsap.set(circle, { scale: 0 });
      if (hoverTextColor) gsap.set(contentEl, { clearProps: "color" });
      if (shouldRollText && labelEl && hoverLabelEl) {
        const travel = rollTravelRef.current || labelHeightRef.current + rollOffsetPx;
        gsap.set(labelEl, { y: 0 });
        gsap.set(hoverLabelEl, { y: travel, opacity: 0 });
      }
      return;
    }

    gsap.to(circle, {
      scale: 0,
      duration: circleDurationMs / 1000,
      ease: "power2.out",
    });

    if (hoverTextColor) {
      gsap.to(contentEl, {
        clearProps: "color",
        duration: 0.3,
        ease: "power1.inOut",
      });
    }

    if (shouldRollText && labelEl && hoverLabelEl) {
      const travel = rollTravelRef.current || labelHeightRef.current + rollOffsetPx;
      gsap.to(labelEl, {
        y: 0,
        duration: rollDurationMs / 1000,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(hoverLabelEl, {
        y: travel,
        opacity: 0,
        duration: rollDurationMs / 1000,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [circleDurationMs, hoverTextColor, rollDurationMs, rollOffsetPx, shouldRollText]);

  const onPointerEnter = useCallback(
    (ev: React.PointerEvent<HTMLAnchorElement>) => {
      // For touch, we start on pointer down instead (hover doesn't exist).
      if (ev.pointerType === "touch") return;
      start(ev.clientX, ev.clientY);
    },
    [start]
  );

  const onPointerLeave = useCallback(
    (ev: React.PointerEvent<HTMLAnchorElement>) => {
      if (ev.pointerType === "touch") return;
      onLeave();
    },
    [onLeave]
  );

  const onPointerDown = useCallback(
    (ev: React.PointerEvent<HTMLAnchorElement>) => {
      if (ev.pointerType !== "touch") return;

      activePointerIdRef.current = ev.pointerId;
      try {
        ev.currentTarget.setPointerCapture(ev.pointerId);
      } catch {
        // ignore
      }

      start(ev.clientX, ev.clientY);
    },
    [start]
  );

  const onPointerUp = useCallback(
    (ev: React.PointerEvent<HTMLAnchorElement>) => {
      if (ev.pointerType !== "touch") return;
      if (activePointerIdRef.current !== ev.pointerId) return;
      activePointerIdRef.current = null;
      onLeave();
    },
    [onLeave]
  );

  const onPointerCancel = useCallback(
    (ev: React.PointerEvent<HTMLAnchorElement>) => {
      if (ev.pointerType !== "touch") return;
      if (activePointerIdRef.current !== ev.pointerId) return;
      activePointerIdRef.current = null;
      onLeave();
    },
    [onLeave]
  );

  return (
    <Link
      href={href}
      prefetch={prefetch}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      ref={linkRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onFocus={() => start()}
      onBlur={onLeave}
      className={"relative overflow-hidden " + className}
      style={{ touchAction: "manipulation" }}
    >
      <span
        ref={circleRef}
        className="absolute rounded-full z-0 pointer-events-none"
        style={{ backgroundColor: circleColor, opacity: circleOpacity, transformOrigin: "50% 50%" }}
      />

      <span
        ref={contentRef}
        className={shouldRollText ? "relative z-10 inline-block align-middle" : "relative z-10"}
      >
        {shouldRollText ? (
          <span className="relative inline-block leading-[1]">
            <span ref={labelRef} className="block will-change-transform leading-[1]">
              {children}
            </span>
            <span
              ref={hoverLabelRef}
              className="absolute left-0 top-0 block will-change-transform leading-[1]"
              aria-hidden="true"
            >
              {children}
            </span>
          </span>
        ) : (
          children
        )}
      </span>
    </Link>
  );
}
