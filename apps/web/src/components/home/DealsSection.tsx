'use client';
import * as React from 'react';
import { Zap } from 'lucide-react';
import { Badge, SkeletonCard } from '@ecom/ui';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/mock-data';

// Countdown timer hook
function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = React.useState(targetMs);
  React.useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1_000);
  return { h, m, s, done: remaining === 0 };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="min-w-[2.5rem] text-center text-xl font-bold text-text-primary bg-surface2 rounded-sm px-2 py-1 tabular-nums"
        aria-label={`${value} ${label}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-text-muted mt-1">{label}</span>
    </div>
  );
}

export function DealsSection() {
  const [loading, setLoading] = React.useState(true);
  const deals = PRODUCTS.filter((p) => p.badge === 'Deal');

  // Simulate data fetch
  React.useEffect(() => {
    const id = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  // 8 hours from mount
  const { h, m, s } = useCountdown(8 * 3_600_000);

  return (
    <section aria-labelledby="deals-heading">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-danger" aria-hidden="true" />
          <h2 id="deals-heading" className="text-xl font-semibold text-text-primary">
            Deals of the Day
          </h2>
          <Badge variant="danger" size="sm">Limited</Badge>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1" aria-label="Time remaining for deals">
          <span className="text-sm text-text-secondary mr-1">Ends in</span>
          <TimeUnit value={h} label="hrs" />
          <span className="text-xl font-bold text-text-muted pb-4" aria-hidden="true">:</span>
          <TimeUnit value={m} label="min" />
          <span className="text-xl font-bold text-text-muted pb-4" aria-hidden="true">:</span>
          <TimeUnit value={s} label="sec" />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : deals.map((p) => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </section>
  );
}
