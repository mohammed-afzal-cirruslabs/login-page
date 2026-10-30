'use client';
import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  side = 'right',
  children,
  footer,
  width = '360px',
}) => {
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-overlay',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-base ease-smooth',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        style={{ width }}
        className={cn(
          'absolute top-0 bottom-0 z-modal flex flex-col bg-bg border-[var(--color-border)]',
          'transition-transform duration-slow ease-smooth',
          'dark:bg-surface1',
          side === 'right'
            ? ['right-0 border-l', open ? 'translate-x-0' : 'translate-x-full']
            : ['left-0 border-r', open ? 'translate-x-0' : '-translate-x-full']
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-4 border-b border-[var(--color-border)]">
          {title && (
            <h2 id={titleId} className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close drawer"
            className="ml-auto"
          >
            <X size={16} aria-hidden="true" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-[var(--color-border)]">{footer}</div>
        )}
      </div>
    </div>
  );
};

Drawer.displayName = 'Drawer';
