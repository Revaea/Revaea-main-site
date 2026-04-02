"use client";

import { useEffect, useMemo, useRef } from "react";

import { CrystalCursor } from "@/components/pages/igcyukira/CrystalCursor";
import { useCrystalCursorHover } from "@/components/pages/igcyukira/hooks/useCrystalCursorHover";
import { useCrystalCursorMotion } from "@/components/pages/igcyukira/hooks/useCrystalCursorMotion";
import { useIsFinePointer } from "@/components/pages/igcyukira/hooks/useIsFinePointer";

export function CrystalCursorLayer(props: { interactiveSelector?: string }) {
  const { interactiveSelector } = props;

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);

  const isFinePointer = useIsFinePointer();

  const selector = useMemo(
    () => interactiveSelector ?? "a, button",
    [interactiveSelector]
  );

  useEffect(() => {
    if (!isFinePointer) {
      document.body.classList.remove("has-crystal-cursor");
      return;
    }

    document.body.classList.add("has-crystal-cursor");
    return () => {
      document.body.classList.remove("has-crystal-cursor");
    };
  }, [isFinePointer]);

  useCrystalCursorMotion({
    enabled: isFinePointer,
    cursorRef,
    trailRef,
  });

  useCrystalCursorHover({
    enabled: isFinePointer,
    cursorRef,
    trailRef,
    interactiveSelector: selector,
  });

  if (!isFinePointer) return null;

  return <CrystalCursor cursorRef={cursorRef} trailRef={trailRef} />;
}
