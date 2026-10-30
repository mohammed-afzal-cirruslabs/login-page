import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputVariants = cva(
  [
    'w-full rounded-sm border bg-bg font-base text-text-primary placeholder:text-text-muted',
    'transition-all duration-fast ease-smooth',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:border-accent',
    'disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface1',
    'read-only:bg-surface1 read-only:cursor-default',
  ],
  {
    variants: {
      size: {
        sm: 'h-control-sm px-3 text-sm',
        md: 'h-control-md px-3 text-base',
      },
      state: {
        default: 'border-[var(--color-border-strong)]',
        error:   'border-danger focus-visible:ring-danger',
        success: 'border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state,
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const resolvedState = errorText ? 'error' : state;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <span className="absolute left-3 text-text-secondary" aria-hidden="true">
              {leftAddon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ size, state: resolvedState }),
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              className
            )}
            aria-describedby={
              errorText ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={!!errorText}
            {...props}
          />
          {rightAddon && (
            <span className="absolute right-3 text-text-secondary" aria-hidden="true">
              {rightAddon}
            </span>
          )}
        </div>
        {errorText && (
          <p id={errorId} className="text-xs text-danger" role="alert">
            {errorText}
          </p>
        )}
        {!errorText && helperText && (
          <p id={helperId} className="text-xs text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
