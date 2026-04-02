import type { RefObject } from "react";

export function CrystalCursor(props: {
  cursorRef: RefObject<HTMLDivElement | null>;
  trailRef: RefObject<HTMLDivElement | null>;
}) {
  const { cursorRef, trailRef } = props;

  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--crystal)] transition-[transform,width,height,background-color] duration-300 [mix-blend-mode:multiply]"
      />
      <div
        id="cursor-trail"
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--crystal)] opacity-50 transition-[transform,left,top] duration-150 ease-out"
      />
    </>
  );
}
