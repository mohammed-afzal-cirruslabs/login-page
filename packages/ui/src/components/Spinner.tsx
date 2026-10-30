import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = { sm: 16, md: 24, lg: 40 } as const;

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  label = 'Loading…',
  className,
  ...props
}) => (
  <span
    role="status"
    aria-label={label}
    className={cn('inline-flex items-center justify-center text-accent', className)}
    {...props}
  >
    <Loader2
      size={sizeMap[size]}
      className="animate-spin"
      aria-hidden="true"
    />
    <span className="sr-only">{label}</span>
  </span>
);

Spinner.displayName = 'Spinner';
