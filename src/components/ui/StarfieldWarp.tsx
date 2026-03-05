"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
};

export type StarfieldWarpProps = {
  color?: string;
  count?: number;
  className?: string;
  style?: React.CSSProperties;
  onReady?: () => void;
};

function hexToRgb(hex: string) {
  let h = (hex || "#000").replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = Number.parseInt(h, 16) || 0;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export default function StarfieldWarp({
  color = "#FFF",
  count = 200,
  className,
  style,
  onReady,
}: StarfieldWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onReadyRef = useRef<(() => void) | undefined>(onReady);

  const rgb = useMemo(() => hexToRgb(color), [color]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasEl = canvas;

    let ctx: CanvasRenderingContext2D | null = null;
    let perspective = 0;
    let stars: Star[] = [];
    let rafId = 0;

    let resizeObserver: ResizeObserver | null = null;
    let lastCssWidth = 0;
    let lastCssHeight = 0;
    let lastDpr = 0;
    let didNotifyReady = false;

    function getCssSize() {
      const rect = canvasEl.getBoundingClientRect();
      return {
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      };
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = getCssSize();

      lastCssWidth = width;
      lastCssHeight = height;
      lastDpr = dpr;

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);

      ctx = canvasEl.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      perspective = canvasEl.width / dpr / 2;
    }

    function initStars() {
      const { width: cssWidth, height: cssHeight } = getCssSize();
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 2 * cssWidth,
          y: (Math.random() - 0.5) * 2 * cssHeight,
          z: Math.random() * (cssWidth || 1),
          speed: Math.random() * 5 + 2,
        });
      }
    }

    function getCenter(width: number, height: number) {
      const vv = window.visualViewport;
      if (vv) {
        return {
          cx: vv.offsetLeft + vv.width / 2,
          cy: vv.offsetTop + vv.height / 2,
        };
      }
      return { cx: width / 2, cy: height / 2 };
    }

    function drawStar(star: Star, width: number, height: number, cx: number, cy: number) {
      if (!ctx) return;

      const scale = perspective / (perspective + star.z);
      const x2d = cx + star.x * scale;
      const y2d = cy + star.y * scale;
      const size = Math.max(scale * 3, 0.5);

      const prevScale = perspective / (perspective + star.z + star.speed * 15);
      const xPrev = cx + star.x * prevScale;
      const yPrev = cy + star.y * prevScale;

      const layerAlphas = [0.08, 0.14, 0.22];
      for (let i = 0; i < layerAlphas.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlphas[i]})`;
        ctx.lineWidth = size * (1.4 + i * 1.2);
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(xPrev, yPrev);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
      ctx.lineWidth = Math.max(1, size);
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      ctx.arc(x2d, y2d, Math.max(0.5, size / 4), 0, Math.PI * 2);
      ctx.fill();
    }

    const onResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", onResize, { passive: true });

    if (typeof ResizeObserver !== "undefined") {
      let pending = 0;
      resizeObserver = new ResizeObserver(() => {
        if (pending) return;
        pending = window.requestAnimationFrame(() => {
          pending = 0;
          onResize();
        });
      });
      resizeObserver.observe(canvasEl);
    }

    function loop() {
      rafId = window.requestAnimationFrame(loop);
      if (!ctx) ctx = canvasEl.getContext("2d");
      if (!ctx) return;

      const { width, height } = getCssSize();
      const dpr = window.devicePixelRatio || 1;
      if (width !== lastCssWidth || height !== lastCssHeight || dpr !== lastDpr) {
        resizeCanvas();
        initStars();
      }

      const { cx, cy } = getCenter(width, height);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        drawStar(star, width, height, cx, cy);

        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = width || 1;
          star.x = (Math.random() - 0.5) * 2 * width;
          star.y = (Math.random() - 0.5) * 2 * height;
        }
      }

      if (!didNotifyReady) {
        didNotifyReady = true;
        try {
          onReadyRef.current?.();
        } catch {
          // ignore
        }
      }
    }

    onResize();
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [count, rgb.r, rgb.g, rgb.b]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className ?? ""} h-full w-full block`}
      style={style}
    />
  );
}
