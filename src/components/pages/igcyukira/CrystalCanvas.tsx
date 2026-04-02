import type { RefObject } from "react";

export function CrystalCanvas(props: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}) {
  const { canvasRef } = props;

  return (
    <canvas
      id="crystal-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40"
    />
  );
}
