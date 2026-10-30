import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 rounded-sm font-medium',
    'transition-colors duration-fast ease-smooth',
  ],
  {
    variants: {
      variant: {
        default:  'bg-surface2 text-text-primary border border-[var(--color-border)]',
        primary:  'bg-primary text-primary-fg',
        success:  'bg-success-surface text-success border border-success/20',
        warning:  'bg-warning-surface text-warning border border-warning/20',
        danger:   'bg-danger-surface text-danger border border-danger/20',
        info:     'bg-info-surface text-info border border-info/20',
        muted:    'bg-surface1 text-text-muted border border-[var(--color-border)]',
      },
      size: {
        xs: 'h-control-sm px-2 text-xs',
        sm: 'h-[22px] px-2 text-xs',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pill, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, pill, className }))}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';
