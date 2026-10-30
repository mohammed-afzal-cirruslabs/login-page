'use client';
import * as React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { Button, Badge, StarRating, notify } from '@ecom/ui';
import { cn } from '@ecom/ui';
import type { Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [wished, setWished] = React.useState(false);
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-bg border border-[var(--color-border)] rounded-md overflow-hidden',
        'hover:shadow-md transition-shadow duration-base ease-smooth',
        className
      )}
      aria-label={product.title}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        tabIndex={0}
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-slow ease-smooth group-hover:scale-105"
          loading="lazy"
          width={400}
          height={400}
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

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-bg/80 flex items-center justify-center">
            <Badge variant="muted" size="sm">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Wishlist button — outside the link */}
      <button
        type="button"
        onClick={() => setWished((w) => !w)}
        aria-label={wished ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        aria-pressed={wished}
        className={cn(
          'absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full',
          'bg-bg/90 border border-[var(--color-border)] shadow-sm',
          'hover:bg-bg transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
        )}
      >
        <Heart
          size={16}
          aria-hidden="true"
          className={wished ? 'fill-danger text-danger' : 'text-text-secondary'}
        />
      </button>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium text-text-primary line-clamp-2 leading-snug hover:text-text-link focus-visible:outline-none focus-visible:underline"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-2">
          <StarRating value={product.rating} size="sm" />
          <span className="text-xs text-text-secondary">{product.reviews.toLocaleString()}</span>
        </div>

        {/* Prime badge */}
        {product.prime && (
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-info" aria-hidden="true" />
            <span className="text-xs font-semibold text-info">Prime</span>
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
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
