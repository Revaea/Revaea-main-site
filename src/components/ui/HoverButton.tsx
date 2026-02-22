"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type HoverButtonProps = {
  href: string;
  children: React.ReactNode;
  circleColor?: string;
  circleOpacity?: number;
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

    const layoutCircle = () => {
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
  }, [children]);

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

  const onEnter = useCallback(() => {
    const circle = circleRef.current;
    const contentEl = contentRef.current;
    if (!circle || !contentEl) return;

    const labelEl = labelRef.current;
    const hoverLabelEl = hoverLabelRef.current;

    gsap.killTweensOf([circle, contentEl]);
    if (labelEl) gsap.killTweensOf(labelEl);
    if (hoverLabelEl) gsap.killTweensOf(hoverLabelEl);

    if (prefersReducedRef.current) {
      gsap.set(circle, { scale: hoverScale });
      if (hoverTextColor) gsap.set(contentEl, { color: hoverTextColor });
      if (shouldRollText && labelEl && hoverLabelEl) {
        const travel = rollTravelRef.current || labelHeightRef.current + rollOffsetPx;
        gsap.set(labelEl, { y: -travel });
        gsap.set(hoverLabelEl, { y: 0, opacity: 1 });
      }
      return;
    }

    gsap.to(circle, {
      scale: hoverScale,
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
  }, [hoverScale, circleDurationMs, hoverTextColor, rollDurationMs, rollOffsetPx, shouldRollText]);

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

  return (
    <Link
      href={href}
      prefetch={prefetch}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      ref={linkRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={"relative overflow-hidden " + className}
    >
      <span
        ref={circleRef}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full z-0 pointer-events-none"
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
