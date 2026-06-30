'use client';

import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
  style?: CSSProperties;
}

export default function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
  style,
}: SkeletonProps) {
  const baseStyles = (): string => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'card':
        return 'rounded-xl';
      default:
        return 'rounded';
    }
  };

  const defaultDimensions = () => {
    switch (variant) {
      case 'text':
        return { width: width || '100%', height: height || '16px' };
      case 'circular':
        return { width: width || '40px', height: height || '40px' };
      case 'rectangular':
        return { width: width || '100%', height: height || '200px' };
      case 'card':
        return { width: width || '100%', height: height || '300px' };
      default:
        return { width: width || '100%', height: height || '16px' };
    }
  };

  const dims = defaultDimensions();

  const skeletonStyle: CSSProperties = {
    width: typeof dims.width === 'number' ? `${dims.width}px` : dims.width,
    height: typeof dims.height === 'number' ? `${dims.height}px` : dims.height,
    ...style,
  };

  const renderItem = (_: unknown, i: number) => (
    <div
      key={i}
      className={`relative overflow-hidden bg-surface-light-tertiary dark:bg-surface-dark-tertiary ${baseStyles()} ${className}`}
      style={skeletonStyle}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
    </div>
  );

  if (variant === 'text') {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded ${className}`}
            style={{
              width: typeof dims.width === 'number' ? `${dims.width}px` : dims.width,
              height: typeof dims.height === 'number' ? `${dims.height}px` : dims.height,
              ...style,
            }}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    );
  }

  return <>{Array.from({ length: count }).map(renderItem)}</>;
}
