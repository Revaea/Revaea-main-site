import React from "react";
import BackgroundMagnetLines from "./BackgroundMagnetLines";

export interface BackgroundWithMaskProps {
  children?: React.ReactNode;
  magnetLinesProps?: {
    rows?: number;
    columns?: number;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
  };
  /**
   * Explicit mask color. Useful if a page wants a custom overlay color.
   * Defaults to the theme-aware `--revaea-bg-mask` variable.
   */
  maskColor?: string;
  /**
   * Optional extra opacity multiplier for the solid background mask.
   *
   * Prefer `maskColor` with alpha for theme-aware defaults.
   */
  maskOpacity?: number | string;
  className?: string;
  enableBlur?: boolean;
}

const BackgroundWithMask: React.FC<BackgroundWithMaskProps> = ({
  children,
  magnetLinesProps = {},
  maskColor = "var(--revaea-bg-mask, var(--color-background))",
  maskOpacity,
  className = "",
  enableBlur = false,
}) => {
  const {
    rows = 12,
    columns = 12,
    lineColor = "#e5e5e5",
    lineWidth = "0.8vmin",
    lineHeight = "4vmin",
    baseAngle = -15,
  } = magnetLinesProps;

  return (
    <div className={`fixed inset-0 overflow-hidden z-0 ${className}`}>
      {/* MagnetLines background layer */}
      <div className={`absolute inset-0 flex items-center justify-center ${enableBlur ? "backdrop-blur-sm" : ""}`}>
        <BackgroundMagnetLines
          rows={rows}
          columns={columns}
          containerSize="120vmax"
          lineColor={lineColor}
          lineWidth={lineWidth}
          lineHeight={lineHeight}
          baseAngle={baseAngle}
          className="opacity-35 dark:opacity-55 transition-opacity duration-1000"
        />
      </div>

      {/* Solid color mask */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: maskColor,
          ...(maskOpacity === undefined ? {} : { opacity: maskOpacity }),
        }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
};

export default BackgroundWithMask;
