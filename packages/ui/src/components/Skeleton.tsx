import * as React from 'react';
import { cn } from '../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a circle (for avatars) */
  circle?: boolean;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  circle = false,
  width,
  height,
  style,
  ...props
}) => (
  <div
    role="status"
    aria-label="Loading…"
    className={cn(
      'animate-pulse bg-surface2 rounded-sm',
      circle && 'rounded-full',
      className
    )}
    style={{
      width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...style,
    }}
    {...props}
  >
    <span className="sr-only">Loading…</span>
  </div>
);

Skeleton.displayName = 'Skeleton';

/** Pre-built card skeleton that mirrors the ProductCard layout */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex flex-col gap-3 p-4 rounded-md bg-surface1 border border-[var(--color-border)]', className)}>
    <Skeleton height={200} className="w-full rounded-md" />
    <Skeleton height={16} className="w-3/4" />
    <Skeleton height={14} className="w-1/2" />
    <Skeleton height={14} className="w-1/4" />
    <Skeleton height={40} className="w-full rounded-sm" />
  </div>
);

SkeletonCard.displayName = 'SkeletonCard';
