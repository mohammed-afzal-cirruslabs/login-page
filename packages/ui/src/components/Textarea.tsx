import * as React from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: 'default' | 'error';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, errorText, state, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const resolvedState = errorText ? 'error' : state;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full min-h-[100px] rounded-sm border bg-bg px-3 py-2',
            'text-base text-text-primary placeholder:text-text-muted font-base',
            'resize-y transition-all duration-fast ease-smooth',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0',
            'disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface1',
            'read-only:bg-surface1 read-only:cursor-default',
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
        />
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

Textarea.displayName = 'Textarea';
