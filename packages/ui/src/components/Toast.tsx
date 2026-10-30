'use client';
/**
 * Toast — thin wrapper around react-hot-toast wired to design tokens.
 * Usage: import { toast } from '@ecom/ui'; then toast.success('Done!');
 */
import { Toaster, toast as _toast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import * as React from 'react';

export { _toast as toast };

export const ToastProvider: React.FC = () => (
  <Toaster
    position="bottom-right"
    gutter={8}
    containerStyle={{ zIndex: 'var(--z-toast)' } as React.CSSProperties}
    toastOptions={{
      duration: 4000,
      style: {
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border-strong)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        fontFamily: 'var(--font-base)',
        fontSize: '14px',
        padding: '12px 16px',
        maxWidth: '380px',
      },
      success: {
        icon: <CheckCircle size={16} color="var(--color-success)" aria-hidden="true" />,
      },
      error: {
        icon: <AlertCircle size={16} color="var(--color-danger)" aria-hidden="true" />,
      },
    }}
  />
);

ToastProvider.displayName = 'ToastProvider';

/** Convenience helpers that match the design system semantic colours */
export const notify = {
  success: (msg: string) => _toast.success(msg),
  error:   (msg: string) => _toast.error(msg),
  info:    (msg: string) =>
    _toast(msg, {
      icon: <Info size={16} color="var(--color-info)" aria-hidden="true" />,
    }),
  warning: (msg: string) =>
    _toast(msg, {
      icon: <AlertTriangle size={16} color="var(--color-warning)" aria-hidden="true" />,
    }),
};
