'use client';
import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { SkeletonCard } from '@ecom/ui';
import { ProductCard } from '@/components/product/ProductCard';
import { getTrendingProducts } from '@/lib/mock-data';

export function TrendingSection() {
  const [loading, setLoading] = React.useState(true);
  const products = getTrendingProducts(8);

  React.useEffect(() => {
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <section aria-labelledby="trending-heading">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={20} className="text-primary" aria-hidden="true" />
        <h2 id="trending-heading" className="text-xl font-semibold text-text-primary">
          Trending Now
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
