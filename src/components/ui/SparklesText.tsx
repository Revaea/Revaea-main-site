"use client";

import React, { useMemo } from "react";

interface Sparkle {
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
}

export interface SparklesTextProps {
  text: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
  className?: string;
  textClassName?: string;
  as?: "div" | "span";
}

const DEFAULT_COLORS = { first: "#38bdf8", second: "#0284c7" };

function fnv1a32(input: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStarDeterministic(params: {
  colors: { first: string; second: string };
  seed: number;
}): Sparkle {
  const rng = mulberry32(params.seed);
  const starX = `${(rng() * 100).toFixed(4)}%`;
  const starY = `${(rng() * 100).toFixed(4)}%`;
  const color = rng() > 0.5 ? params.colors.first : params.colors.second;
  const delay = rng() * 2;
  const scale = rng() * 1 + 0.3;
  return { x: starX, y: starY, color, delay, scale };
}

type SparkleStyle = React.CSSProperties & Record<`--${string}`, string | number>;

export default function SparklesText({
  text,
  sparklesCount = 10,
  colors,
  className,
  textClassName,
  as = "div",
}: SparklesTextProps) {
  const mergedColors = useMemo(() => {
    return {
      first: colors?.first ?? DEFAULT_COLORS.first,
      second: colors?.second ?? DEFAULT_COLORS.second,
    };
  }, [colors?.first, colors?.second]);

  const sparkles = useMemo(() => {
    const baseSeed = fnv1a32(`${text}|${mergedColors.first}|${mergedColors.second}`);
    return Array.from({ length: sparklesCount }, (_, index) => {
      const seed = (baseSeed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0;
      return generateStarDeterministic({ colors: mergedColors, seed });
    });
  }, [sparklesCount, mergedColors, text]);

  const rootClassName = className ?? "text-6xl font-bold";
  const Root = as;

  return (
    <Root className={rootClassName}>
      <span className={["relative inline-block", textClassName].filter(Boolean).join(" ")}>
        {sparkles.map((sparkle, index) => {
          const style: SparkleStyle = {
            left: sparkle.x,
            top: sparkle.y,
            opacity: 0,
            "--sparkle-delay": `${sparkle.delay}s`,
            "--sparkle-scale": sparkle.scale,
          };

          return (
            <svg
              key={index}
              className="sparkle pointer-events-none absolute z-20"
              style={style}
              width="21"
              height="21"
              viewBox="0 0 21 21"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                fill={sparkle.color}
              />
            </svg>
          );
        })}

        {text}
      </span>

      <style jsx>{`
        .sparkle {
          transform-origin: 50% 50%;
          animation-name: sparkle;
          animation-duration: 0.8s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-delay: var(--sparkle-delay, 0s);
          will-change: transform, opacity;
        }

        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: rotate(75deg) scale(0);
          }
          50% {
            opacity: 1;
            transform: rotate(120deg) scale(var(--sparkle-scale, 1));
          }
          100% {
            opacity: 0;
            transform: rotate(150deg) scale(0);
          }
        }
      `}</style>
    </Root>
  );
}

