import * as React from 'react';
import { cn } from '@ecom/ui';

/**
 * PageContainer — centres content at 1280px with responsive page padding.
 */
export function PageContainer({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn('page-container', className)}>
      {children}
    </Tag>
  );
}

/**
 * ProductGrid — responsive 1→2→3→4 column grid for product cards.
 */
export function ProductGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * SidebarLayout — left sidebar + main content area.
 */
export function SidebarLayout({
  sidebar,
  children,
  className,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-6', className)}>
      <aside
        className="hidden lg:block w-60 shrink-0"
        aria-label="Filters and navigation"
      >
        {sidebar}
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/**
 * Section — a page section with consistent vertical rhythm.
 */
export function Section({
  children,
  className,
  title,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn('py-8', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
