import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  state?: 'default' | 'error';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      options,
      placeholder,
      helperText,
      errorText,
      state,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? React.useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const resolvedState = errorText ? 'error' : state;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full h-control-md appearance-none rounded-sm border bg-bg px-3 pr-9',
              'text-base text-text-primary font-base',
              'transition-all duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0',
              'disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface1',
              resolvedState === 'error'
                ? 'border-danger focus-visible:ring-danger'
                : 'border-[var(--color-border-strong)]',
              className
            )}
            aria-describedby={
              errorText ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={!!errorText}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            size={16}
            aria-hidden="true"
          />
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

Select.displayName = 'Select';
