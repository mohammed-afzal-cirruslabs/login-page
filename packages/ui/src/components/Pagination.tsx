'use client';
import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number): (number | '…')[] {
  const delta = siblings + 2;
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const pages: (number | '…')[] = [1];

  if (left > 2) pages.push('…');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('…');
  if (total > 1) pages.push(total);

  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center gap-1', className)}
    >
      {/* Prev */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Prev</span>
      </Button>

      {/* Page numbers — hidden on mobile, show prev/next only */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((p, idx) =>
          p === '…' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-control-sm flex items-center justify-center text-text-muted"
              aria-hidden="true"
            >
              <MoreHorizontal size={14} />
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'w-8 h-control-sm rounded-sm text-sm font-medium',
                'transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                p === page
                  ? 'bg-primary text-primary-fg'
                  : 'text-text-primary hover:bg-surface2'
              )}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Mobile: current / total */}
      <span className="sm:hidden text-sm text-text-secondary px-2">
        {page} / {totalPages}
      </span>

      {/* Next */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';
