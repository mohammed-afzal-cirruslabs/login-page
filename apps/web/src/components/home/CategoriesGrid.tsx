import * as React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/mock-data';
import { cn } from '@ecom/ui';

export function CategoriesGrid() {
  return (
    <section aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="categories-heading" className="text-xl font-semibold text-text-primary">
          Shop by Category
        </h2>
        <Link
          href="/products"
          className="text-sm text-text-link hover:text-text-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-md',
              'bg-surface1 border border-[var(--color-border)]',
              'hover:bg-surface2 hover:border-[var(--color-border-strong)] hover:shadow-sm',
              'transition-all duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              'text-center group',
            )}
          >
            <span className="text-2xl" role="img" aria-label={cat.label}>
              {cat.icon}
            </span>
            <span className="text-xs font-medium text-text-primary leading-tight group-hover:text-text-link">
              {cat.label}
            </span>
            <span className="text-xs text-text-muted">{cat.count.toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
