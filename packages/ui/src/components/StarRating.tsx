'use client';
import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../utils/cn';

export interface StarRatingProps {
  value: number;          // 0–5
  max?: number;
  onChange?: (value: number) => void;  // if provided → interactive mode
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  'aria-label'?: string;
}

const sizeMap = { sm: 14, md: 18, lg: 24 } as const;

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  onChange,
  size = 'md',
  showLabel = false,
  className,
  'aria-label': ariaLabel,
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const interactive = !!onChange;
  const starSize = sizeMap[size];
  const displayValue = hovered ?? value;

  const label = ariaLabel ?? `${value} out of ${max} stars`;

  if (!interactive) {
    // Display mode — purely decorative, one accessible label
    return (
      <span
        className={cn('inline-flex items-center gap-0.5', className)}
        aria-label={label}
        role="img"
      >
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= value;
          const partial = !filled && i < value && value % 1 !== 0;
          return (
            <span key={i} className="relative inline-block" aria-hidden="true">
              {/* Background star */}
              <Star
                size={starSize}
                className="text-surface3"
                fill="currentColor"
                strokeWidth={0}
              />
              {/* Filled overlay */}
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(value % 1) * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="text-primary"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              )}
            </span>
          );
        })}
        {showLabel && (
          <span className="ml-1 text-sm text-text-secondary">{value.toFixed(1)}</span>
        )}
      </span>
    );
  }

  // Interactive mode — each star is a radio button
  return (
    <span
      className={cn('inline-flex items-center gap-0.5', className)}
      role="radiogroup"
      aria-label={label}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= displayValue;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
            className={cn(
              'rounded-sm transition-transform duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
              'hover:scale-110 active:scale-95',
              isActive ? 'text-primary' : 'text-surface3'
            )}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(starValue)}
            onBlur={() => setHovered(null)}
          >
            <Star
              size={starSize}
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />
          </button>
        );
      })}
      {showLabel && (
        <span className="ml-1 text-sm text-text-secondary" aria-hidden="true">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
};

StarRating.displayName = 'StarRating';
