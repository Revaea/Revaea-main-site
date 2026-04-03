"use client";

import type { ReactNode } from "react";

type RevealImageReadyProps = {
  /** When true, reveal content; when false, keep it hidden. */
  ready: boolean;
  /** Render prop that receives the computed className for the target element. */
  children: (className: string) => ReactNode;

  /** Extra classes appended after transition + state classes. */
  className?: string;

  /** Classnames applied when ready=true. Default: opacity-100 blur-0 */
  readyClassName?: string;
  /** Classnames applied when ready=false. Default: opacity-0 blur-xl */
  notReadyClassName?: string;

  /** Transition classes for opacity/filter. Defaults include reduced-motion overrides. */
  transitionClassName?: string;
};

export default function RevealImageReady({
  ready,
  children,
  className = "",
  readyClassName = "opacity-100 blur-0",
  notReadyClassName = "opacity-0 blur-xl",
  transitionClassName =
    "transition-[filter,opacity] duration-700 ease-out will-change-[filter,opacity] motion-reduce:transition-none motion-reduce:duration-0",
}: RevealImageReadyProps) {
  const stateClassName = ready ? readyClassName : notReadyClassName;
  const merged = `${transitionClassName} ${stateClassName} ${className}`.trim();
  return <>{children(merged)}</>;
}
