'use client';
import * as React from 'react';
import {
  Button, Badge, Spinner, Skeleton, SkeletonCard,
  StarRating, Pagination, notify,
} from '@ecom/ui';
import { PageContainer, ProductGrid, Section } from '@/components/layout/Grid';
import { ShoppingCart, Heart, Zap, Shield, Truck, RotateCcw } from 'lucide-react';

// ─── Mock product data ───────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, title: 'Apple AirPods Pro (2nd Gen)', price: 24999, originalPrice: 29999,
    rating: 4.7, reviews: 12847, badge: 'Best Seller', inStock: true,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
  },
  {
    id: 2, title: 'Samsung Galaxy S24 Ultra', price: 129999, originalPrice: 134999,
    rating: 4.5, reviews: 3421, badge: 'New', inStock: true,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
  },
  {
    id: 3, title: 'Sony WH-1000XM5 Headphones', price: 29990, originalPrice: 34990,
    rating: 4.8, reviews: 8921, badge: 'Deal', inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: 4, title: 'Apple MacBook Air M3', price: 114900, originalPrice: 119900,
    rating: 4.9, reviews: 2156, badge: null, inStock: false,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  },
  {
    id: 5, title: 'Kindle Paperwhite (16 GB)', price: 13999, originalPrice: 16999,
    rating: 4.6, reviews: 45231, badge: 'Best Seller', inStock: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
  },
  {
    id: 6, title: 'Nike Air Max 270', price: 9995, originalPrice: 12995,
    rating: 4.4, reviews: 7823, badge: null, inStock: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  },
  {
    id: 7, title: 'Instant Pot Duo 7-in-1', price: 8499, originalPrice: 9999,
    rating: 4.7, reviews: 23456, badge: 'Deal', inStock: true,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop',
  },
  {
    id: 8, title: 'LEGO Technic Bugatti', price: 34999, originalPrice: 39999,
    rating: 4.9, reviews: 1234, badge: 'New', inStock: true,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
  },
];

// ─── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [wished, setWished] = React.useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article
      className="group relative flex flex-col bg-bg border border-[var(--color-border)] rounded-md overflow-hidden
                 hover:shadow-md transition-shadow duration-base ease-smooth"
      aria-label={product.title}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-slow ease-smooth group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <Badge
              variant={
                product.badge === 'Deal' ? 'danger' :
                product.badge === 'New' ? 'info' : 'warning'
              }
              size="xs"
            >
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="success" size="xs">-{discount}%</Badge>
          )}
        </div>
        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full
                     bg-bg/90 border border-[var(--color-border)] shadow-sm
                     hover:bg-bg transition-colors duration-fast ease-smooth
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        >
          <Heart
            size={16}
            aria-hidden="true"
            className={wished ? 'fill-danger text-danger' : 'text-text-secondary'}
          />
        </button>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-bg/80 flex items-center justify-center">
            <Badge variant="muted" size="sm">Out of Stock</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <StarRating value={product.rating} size="sm" showLabel />
        <p className="text-xs text-text-secondary">{product.reviews.toLocaleString()} ratings</p>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-text-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          disabled={!product.inStock}
          leftIcon={<ShoppingCart size={14} aria-hidden="true" />}
          onClick={() => notify.success(`${product.title} added to cart!`)}
          aria-label={`Add ${product.title} to cart`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </article>
  );
}

// ─── Hero banner ─────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <div
      className="relative w-full rounded-md overflow-hidden bg-gradient-to-r from-secondary to-[#232F3E]
                 flex items-center min-h-[280px] sm:min-h-[360px]"
      role="banner"
      aria-label="Featured promotion"
    >
      <div className="relative z-10 p-8 sm:p-12 max-w-lg">
        <Badge variant="primary" size="sm" className="mb-4">Limited Time Deal</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
          Up to 70% off on Electronics
        </h1>
        <p className="text-sm sm:text-base text-secondary-fg/80 mb-6">
          Shop the biggest sale of the year. Deals on phones, laptops, audio and more.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Zap size={18} aria-hidden="true" />}
            onClick={() => notify.info('Navigating to deals…')}
          >
            Shop Deals
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/30 hover:bg-white/10"
            onClick={() => notify.info('Viewing all categories…')}
          >
            Browse All
          </Button>
        </div>
      </div>
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Trust badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  const items = [
    { icon: Truck,    title: 'Free Delivery',    desc: 'On orders over ₹499' },
    { icon: Shield,   title: 'Secure Payments',  desc: '100% protected' },
    { icon: RotateCcw,title: 'Easy Returns',     desc: '30-day return policy' },
    { icon: Zap,      title: 'Fast Dispatch',    desc: 'Same-day on select items' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (p: number) => {
    setLoading(true);
    setPage(p);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <PageContainer className="py-6 flex flex-col gap-8">
      {/* Hero */}
      <HeroBanner />

      {/* Trust badges */}
      <TrustBadges />

      {/* Products */}
      <Section
        title="Featured Products"
        action={
          <Button variant="ghost" size="sm" onClick={() => notify.info('Viewing all products…')}>
            See all
          </Button>
        }
      >
        {loading ? (
          <ProductGrid>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ProductGrid>
        ) : (
          <ProductGrid>
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        )}

        <div className="mt-8 flex justify-center">
          <Pagination
            page={page}
            totalPages={12}
            onPageChange={handlePageChange}
          />
        </div>
      </Section>
    </PageContainer>
  );
}
