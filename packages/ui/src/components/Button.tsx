import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  // Base — all buttons share these
  [
    'inline-flex items-center justify-center gap-2 font-medium rounded-sm',
    'transition-all duration-fast ease-smooth',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-fg',
          'hover:bg-primary-hover active:scale-[0.98]',
          'border border-transparent',
        ],
        secondary: [
          'bg-surface2 text-text-primary border border-[var(--color-border-strong)]',
          'hover:bg-surface3 active:scale-[0.98]',
        ],
        ghost: [
          'bg-transparent text-text-primary border border-transparent',
          'hover:bg-surface1 active:scale-[0.98]',
        ],
        danger: [
          'bg-danger text-white border border-transparent',
          'hover:opacity-90 active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'h-control-sm px-3 text-sm',
        md: 'h-control-md px-4 text-base',
        lg: 'h-control-lg px-6 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2
            className="animate-spin"
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            aria-hidden="true"
          />
        ) : (
          leftIcon && <span aria-hidden="true">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
