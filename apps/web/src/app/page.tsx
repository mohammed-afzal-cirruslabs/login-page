import * as React from 'react';
import { PageContainer } from '@/components/layout/Grid';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { DealsSection } from '@/components/home/DealsSection';
import { TrendingSection } from '@/components/home/TrendingSection';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { Truck, Shield, RotateCcw, Zap } from 'lucide-react';

function TrustBadges() {
  const items = [
    { icon: Truck,     title: 'Free Delivery',   desc: 'On orders over ₹499' },
    { icon: Shield,    title: 'Secure Payments', desc: '100% protected' },
    { icon: RotateCcw, title: 'Easy Returns',    desc: '30-day return policy' },
    { icon: Zap,       title: 'Fast Dispatch',   desc: 'Same-day on select items' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Shopping benefits">
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          role="listitem"
          className="flex items-center gap-3 p-4 rounded-md bg-surface1 border border-[var(--color-border)]"
        >
          <Icon size={24} className="text-primary shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-text-primary">{title}</p>
            <p className="text-xs text-text-secondary">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <PageContainer className="py-6 flex flex-col gap-10">
      {/* Hero carousel */}
      <HeroCarousel />

      {/* Trust badges */}
      <TrustBadges />

      {/* Categories */}
      <CategoriesGrid />

      {/* Deals of the day */}
      <DealsSection />

      {/* Recently viewed (client — reads localStorage) */}
      <RecentlyViewed />

      {/* Trending */}
      <TrendingSection />
    </PageContainer>
  );
}
