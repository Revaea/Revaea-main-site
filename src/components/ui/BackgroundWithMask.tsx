import React from 'react';
import MagnetLines from './MagnetLines';

interface BackgroundWithMaskProps {
  children?: React.ReactNode;
  magnetLinesProps?: {
    rows?: number;
    columns?: number;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
  };
  maskOpacity?: number;
  className?: string;
  enableBlur?: boolean;
}

const BackgroundWithMask: React.FC<BackgroundWithMaskProps> = ({
  children,
  magnetLinesProps = {},
  maskOpacity = 0.8,
  className = '',
  enableBlur = false
}) => {
  const {
    rows = 12,
    columns = 12,
    lineColor = '#e5e5e5',
    lineWidth = '0.8vmin',
    lineHeight = '4vmin',
    baseAngle = -15
  } = magnetLinesProps;

  return (
    <div className={`fixed inset-0 overflow-hidden z-0 ${className}`}>
      {/* MagnetLines background layer */}
      <div className={`absolute inset-0 flex items-center justify-center ${enableBlur ? 'backdrop-blur-sm' : ''}`}>
        <MagnetLines
          rows={rows}
          columns={columns}
          containerSize="120vmax"
          lineColor={lineColor}
          lineWidth={lineWidth}
          lineHeight={lineHeight}
          baseAngle={baseAngle}
          className="opacity-60 dark:opacity-50 transition-opacity duration-1000"
        />
      </div>
      
      {/* Solid color mask */}
      <div 
        className={`absolute inset-0 bg-background dark:bg-background`}
        style={{
          opacity: maskOpacity
        }}
      />
      
      {/* Content layer */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default BackgroundWithMask;