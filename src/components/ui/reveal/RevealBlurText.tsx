"use client";

import React, { ElementType, useEffect, useMemo, useRef, useState } from "react";

type AnimateBy = "words" | "letters";
type Direction = "top" | "bottom";
type AnimationSnapshot = Record<string, string | number>;

export interface RevealBlurTextProps {
  text?: string;
  delay?: number; // ms delay between segments
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  // Accept either a CSS easing string (e.g., 'ease', 'linear', 'cubic-bezier(...)')
  // or a JS function t->[0,1], which will be approximated via keyframe offsets
  easing?: ((t: number) => number) | string;
  onAnimationComplete?: () => void;
  stepDuration?: number; // seconds per step
  as?: "p" | "span" | "div" | "h1";
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function snapshotToInlineStyle(s: AnimationSnapshot): React.CSSProperties {
  const style: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(s)) {
    if (k === "y") {
      const n = typeof v === "number" ? v : parseFloat(String(v) || "0");
      style.transform = `translateY(${n}px)`;
    } else if (k === "opacity") {
      style.opacity = String(v);
    } else if (k === "filter") {
      style.filter = String(v);
    } else if (k === "transform") {
      style.transform = String(v);
    } else {
      style[k] = String(v);
    }
  }
  return style as React.CSSProperties;
}

function snapshotToKeyframe(s: AnimationSnapshot): Keyframe {
  const kf: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(s)) {
    if (k === "y") {
      const n = typeof v === "number" ? v : parseFloat(String(v) || "0");
      kf.transform = `translateY(${n}px)`;
    } else if (k === "opacity") {
      kf.opacity = String(v);
    } else if (k === "filter") {
      kf.filter = String(v);
    } else if (k === "transform") {
      kf.transform = String(v);
    } else {
      kf[k] = String(v);
    }
  }
  return kf as Keyframe;
}

export default function RevealBlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
}: RevealBlurTextProps) {
  const completionFired = useRef(false);
  type RootEl = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLHeadingElement;
  const rootRef = useRef<RootEl | null>(null);
  const setRootRef = (el: RootEl | null) => {
    rootRef.current = el;
  };
  const [inView, setInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const elements = useMemo(() => {
    if (animateBy === "words") return text.split(" ");
    // Match Vue behavior (simple split), not full grapheme split
    return text.split("");
  }, [text, animateBy]);

  const defaultFrom: AnimationSnapshot = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: AnimationSnapshot[] = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      },
    ],
    [direction]
  );

  const fromSnapshot = useMemo(() => animationFrom ?? defaultFrom, [animationFrom, defaultFrom]);
  const toSnapshots = useMemo(() => animationTo ?? defaultTo, [animationTo, defaultTo]);

  const stepCount = toSnapshots.length + 1;
  const totalDurationSec = stepDuration * (stepCount - 1);
  const times = useMemo(() => {
    return Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));
  }, [stepCount]);

  const keyframes = useMemo(() => {
    const steps = [fromSnapshot, ...toSnapshots];

    let offsets = times;
    let overallEasing: string | undefined = undefined;
    if (typeof easing === "function") {
      offsets = times.map((t) => clamp01(easing(t)));
      offsets[0] = 0;
      offsets[offsets.length - 1] = 1;
      for (let i = 1; i < offsets.length; i++) {
        if (offsets[i] <= offsets[i - 1]) offsets[i] = Math.min(1, offsets[i - 1] + 1e-4);
      }
      overallEasing = "linear";
    } else if (typeof easing === "string") {
      overallEasing = easing;
    }

    const kfs: Keyframe[] = steps.map((snap, i) => ({
      ...(snapshotToKeyframe(snap) as Keyframe),
      offset: offsets[i],
    }));

    return { frames: kfs, overallEasing } as const;
  }, [fromSnapshot, toSnapshots, times, easing]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
    completionFired.current = false;
  }, [delay, stepDuration, animateBy, direction]);

  useEffect(() => {
    if (!inView) return;
    const container = rootRef.current;
    if (!container) return;

    const spans = Array.from(container.querySelectorAll("span[data-reveal-blur-text='1']"));

    spans.forEach((span, i) => {
      (span.getAnimations?.() || []).forEach((a) => a.cancel());

      const anim = (span as HTMLElement).animate(keyframes.frames, {
        duration: Math.max(0, totalDurationSec * 1000),
        delay: i * delay,
        fill: "both",
        easing: keyframes.overallEasing ?? "linear",
      });

      if (i === spans.length - 1) {
        anim.onfinish = () => {
          if (!completionFired.current) {
            completionFired.current = true;
            onAnimationComplete?.();
          }
        };
      }
    });
  }, [inView, animationKey, keyframes, delay, totalDurationSec, onAnimationComplete]);

  const cls = useMemo(
    () => ["reveal-blur-text", className, "flex", "flex-wrap"].filter(Boolean).join(" "),
    [className]
  );

  const Container: ElementType = as;

  // Always include initial snapshot inline style so SSR/hydration and pre-animation states are hidden.
  // The animation (fill: both) will override these styles during and after playback.
  const initialStyle = snapshotToInlineStyle(fromSnapshot);

  return (
    <Container ref={setRootRef} className={cls}>
      {elements.map((segment, index) => {
        const content =
          animateBy === "words"
            ? segment + (index < elements.length - 1 ? "\u00A0" : "")
            : segment === " "
            ? "\u00A0"
            : segment;

        return (
          <span
            data-reveal-blur-text="1"
            key={`${animationKey}-${index}`}
            style={{ display: "inline-block", willChange: "transform, filter, opacity", ...initialStyle }}
          >
            {content}
          </span>
        );
      })}
    </Container>
  );
}
