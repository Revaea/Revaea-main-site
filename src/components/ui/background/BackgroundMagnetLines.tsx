"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";

export interface BackgroundMagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

export default function BackgroundMagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#94a3b8",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}: BackgroundMagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);
  const [containerBox, setContainerBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023.98px)");

    const apply = () => {
      setIsSmallScreen(mql.matches);
    };

    apply();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }

    const legacyMql = mql as unknown as {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };

    const add = legacyMql.addListener;
    const remove = legacyMql.removeListener;

    if (typeof add === "function" && typeof remove === "function") {
      add(apply);
      return () => remove(apply);
    }

    return;
  }, []);

  useEffect(() => {
    if (isSmallScreen === true) return;

    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setContainerBox({ width: rect.width, height: rect.height });
    };

    update();

    const ro = new ResizeObserver(() => {
      update();
    });

    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen !== false) return;

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>("span");

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener("pointermove", handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isSmallScreen, containerBox.width, containerBox.height]);

  const safeWidth = Math.max(containerBox.width, 1);
  const safeHeight = Math.max(containerBox.height, 1);
  const minSide = Math.min(safeWidth, safeHeight);
  const minDivisions = 4;
  const maxDivisions = Math.max(minDivisions, Math.min(rows, columns));
  const targetCellPx = 140;
  const baseDivisions = Math.min(
    maxDivisions,
    Math.max(minDivisions, Math.round(minSide / targetCellPx)),
  );

  const ratio = safeWidth / safeHeight;
  const effectiveColumns = Math.min(
    Math.max(minDivisions, columns),
    Math.max(minDivisions, Math.round(baseDivisions * ratio)),
  );
  const effectiveRows = Math.min(
    Math.max(minDivisions, rows),
    Math.max(minDivisions, Math.round(baseDivisions / ratio)),
  );

  const total = effectiveRows * effectiveColumns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center transition-colors duration-300"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transform: "rotate(var(--rotate))",
        willChange: "transform",
        ...({ "--rotate": `${baseAngle}deg` } as CSSProperties),
      }}
    />
  ));

  if (isSmallScreen === true) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`hidden lg:grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${effectiveRows}, minmax(0, 1fr))`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}
