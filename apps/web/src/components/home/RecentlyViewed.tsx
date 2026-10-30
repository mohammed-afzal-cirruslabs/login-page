'use client';
import * as React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { PRODUCTS } from '@/lib/mock-data';
import type { Product } from '@/lib/mock-data';
import { StarRating } from '@ecom/ui';

const STORAGE_KEY = 'shopnow_recently_viewed';

export function useRecentlyViewed() {
  const [ids, setIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(stored)) setIds(stored);
    } catch {
      // ignore
    }
  }, []);

  return ids;
}

export function recordView(productId: number) {
  try {
    const stored: number[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const next = [productId, ...stored.filter((id) => id !== productId)].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function RecentlyViewed() {
  const ids = useRecentlyViewed();
  const products: Product[] = ids
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-text-secondary" aria-hidden="true" />
        <h2 id="recently-viewed-heading" className="text-xl font-semibold text-text-primary">
          Recently Viewed
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="snap-start shrink-0 w-36 flex flex-col gap-2 p-3 rounded-md bg-surface1 border border-[var(--color-border)] hover:shadow-sm transition-shadow duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full aspect-square object-cover rounded-sm"
              loading="lazy"
              width={144}
              height={144}
            />
            <p className="text-xs font-medium text-text-primary line-clamp-2 leading-snug">{p.title}</p>
            <StarRating value={p.rating} size="sm" />
            <p className="text-sm font-bold text-text-primary">₹{p.price.toLocaleString('en-IN')}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
