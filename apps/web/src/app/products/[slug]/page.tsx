'use client';
import * as React from 'react';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Zap, Package, ChevronRight, Star } from 'lucide-react';
import { Button, Badge, StarRating, notify } from '@ecom/ui';
import { cn } from '@ecom/ui';
import { PageContainer, ProductGrid } from '@/components/layout/Grid';
import { ImageCarousel } from '@/components/product/ImageCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { getProductBySlug, getRelatedProducts } from '@/lib/mock-data';
import { recordView } from '@/components/home/RecentlyViewed';

// ─── Variant selector ─────────────────────────────────────────────────────────
function VariantSelector({
  label, options, selected, onSelect,
}: { label: string; options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-text-primary">
        {label}: <span className="font-semibold">{selected}</span>
      </p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Select ${label}`}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected === opt}
            onClick={() => onSelect(opt)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-sm border-2 transition-all duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
              selected === opt
                ? 'border-primary bg-primary/10 text-text-primary font-semibold'
                : 'border-[var(--color-border-strong)] bg-bg text-text-secondary hover:border-[var(--color-border-strong)] hover:bg-surface1',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function Tabs({ product }: { product: ReturnType<typeof getProductBySlug> }) {
  const [active, setActive] = React.useState(0);
  if (!product) return null;

  const tabs = [
    { label: 'Details', id: 'tab-details' },
    { label: 'Specifications', id: 'tab-specs' },
    { label: 'Reviews', id: 'tab-reviews' },
  ];

  const MOCK_REVIEWS = [
    { author: 'Priya S.', rating: 5, date: 'Oct 2026', text: 'Absolutely love this product! Works exactly as described and arrived quickly.' },
    { author: 'Rahul M.', rating: 4, date: 'Sep 2026', text: 'Great value for money. Build quality is solid. Would recommend to a friend.' },
    { author: 'Anita K.', rating: 5, date: 'Sep 2026', text: 'Exceeded my expectations. The packaging was also very good.' },
  ];

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Product information"
        className="flex border-b border-[var(--color-border)]"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={tab.id}
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-3 text-sm font-medium transition-all duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
              active === i
                ? 'border-b-2 border-primary text-text-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface1',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div
        id="panel-0"
        role="tabpanel"
        aria-labelledby="tab-details"
        hidden={active !== 0}
        className="py-6 text-sm text-text-secondary leading-relaxed"
      >
        <p>{product.description}</p>
        <ul className="mt-4 flex flex-col gap-2">
          <li className="flex items-start gap-2"><ChevronRight size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />Free delivery on orders above ₹499</li>
          <li className="flex items-start gap-2"><ChevronRight size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />30-day hassle-free returns</li>
          <li className="flex items-start gap-2"><ChevronRight size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />Genuine product with manufacturer warranty</li>
        </ul>
      </div>

      <div
        id="panel-1"
        role="tabpanel"
        aria-labelledby="tab-specs"
        hidden={active !== 1}
        className="py-6"
      >
        {product.specs ? (
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">Product specifications</caption>
            <tbody>
              {Object.entries(product.specs).map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-surface1' : 'bg-bg'}>
                  <th scope="row" className="text-left px-4 py-2 font-medium text-text-primary w-40">{key}</th>
                  <td className="px-4 py-2 text-text-secondary">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-text-secondary">No specifications available.</p>
        )}
      </div>

      <div
        id="panel-2"
        role="tabpanel"
        aria-labelledby="tab-reviews"
        hidden={active !== 2}
        className="py-6 flex flex-col gap-6"
      >
        {MOCK_REVIEWS.map((r, i) => (
          <article key={i} className="flex flex-col gap-2 pb-6 border-b border-[var(--color-border)] last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-fg text-sm font-bold" aria-hidden="true">
                {r.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{r.author}</p>
                <p className="text-xs text-text-muted">{r.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1" aria-label={`Rated ${r.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={14}
                  aria-hidden="true"
                  className={j < r.rating ? 'fill-primary text-primary' : 'text-surface3'}
                />
              ))}
            </div>
            <p className="text-sm text-text-secondary">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  // Selected variants
  const [selectedVariants, setSelectedVariants] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.variants?.forEach((v) => { init[v.label] = v.options[0]; });
    return init;
  });

  const [qty, setQty] = React.useState(1);

  // Record view in localStorage
  React.useEffect(() => {
    recordView(product.id);
  }, [product.id]);

  const stockCount = product.stockCount ?? 0;
  const stockLabel =
    !product.inStock ? 'Out of Stock' :
    stockCount <= 5 ? `Only ${stockCount} left in stock` :
    'In Stock';
  const stockColor =
    !product.inStock ? 'text-danger' :
    stockCount <= 5 ? 'text-warning' :
    'text-success';

  return (
    <PageContainer className="py-6 flex flex-col gap-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-text-secondary flex-wrap">
          <li><Link href="/" className="hover:text-text-link focus-visible:outline-none focus-visible:underline">Home</Link></li>
          <li aria-hidden="true" className="text-text-muted">/</li>
          <li><Link href="/products" className="hover:text-text-link focus-visible:outline-none focus-visible:underline">Products</Link></li>
          <li aria-hidden="true" className="text-text-muted">/</li>
          <li className="text-text-primary font-medium truncate max-w-xs" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Left — image carousel */}
        <div>
          <ImageCarousel images={product.images} title={product.title} />
        </div>

        {/* Right — product info */}
        <div className="flex flex-col gap-5">
          {/* Brand + title */}
          <div>
            <p className="text-sm text-text-link mb-1">
              <Link href={`/products?brand=${product.brand}`} className="hover:underline focus-visible:outline-none focus-visible:underline">
                {product.brand}
              </Link>
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">{product.title}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating value={product.rating} size="md" showLabel />
            <span className="text-sm text-text-secondary">{product.reviews.toLocaleString()} ratings</span>
            {product.prime && (
              <div className="flex items-center gap-1">
                <Zap size={14} className="text-info" aria-hidden="true" />
                <span className="text-sm font-semibold text-info">Prime</span>
              </div>
            )}
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Price */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-base text-text-muted line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <Badge variant="danger" size="sm">{discount}% off</Badge>
                </>
              )}
            </div>
            {product.prime && (
              <p className="text-sm text-text-secondary">
                Inclusive of all taxes. Free delivery with <span className="font-semibold text-info">Prime</span>.
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <Package size={16} className={stockColor} aria-hidden="true" />
            <span className={cn('text-sm font-medium', stockColor)} role="status" aria-live="polite">
              {stockLabel}
            </span>
          </div>

          {/* Variants */}
          {product.variants?.map((v) => (
            <VariantSelector
              key={v.label}
              label={v.label}
              options={v.options}
              selected={selectedVariants[v.label] ?? v.options[0]}
              onSelect={(val) => setSelectedVariants((prev) => ({ ...prev, [v.label]: val }))}
            />
          ))}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <label htmlFor="qty" className="text-sm font-medium text-text-primary">Qty:</label>
            <select
              id="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              disabled={!product.inStock}
              className={cn(
                'h-9 pl-3 pr-8 text-sm rounded-sm',
                'border border-[var(--color-border-strong)] bg-bg text-text-primary',
                'focus:outline-none focus:ring-2 focus:ring-accent',
                'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23565959\' stroke-width=\'2\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_8px_center]',
              )}
              aria-label="Quantity"
            >
              {Array.from({ length: Math.min(10, stockCount || 10) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!product.inStock}
              leftIcon={<ShoppingCart size={18} aria-hidden="true" />}
              onClick={() => notify.success(`${qty}× ${product.title} added to cart!`)}
              aria-label={`Add ${qty} ${product.title} to cart`}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              disabled={!product.inStock}
              leftIcon={<Zap size={18} aria-hidden="true" />}
              onClick={() => notify.info('Proceeding to checkout…')}
              aria-label={`Buy ${product.title} now`}
            >
              Buy Now
            </Button>
          </div>

          {/* Delivery info */}
          {product.prime && (
            <div className="p-3 rounded-md bg-info-surface border border-info/20 text-sm text-text-secondary">
              <span className="font-semibold text-info">FREE Prime Delivery</span> — Get it by tomorrow if you order within 4 hours.
            </div>
          )}
        </div>
      </div>

      {/* Tabs — description, specs, reviews */}
      <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
        <Tabs product={product} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-semibold text-text-primary mb-4">
            Related Products
          </h2>
          <ProductGrid className="xl:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
        </section>
      )}
    </PageContainer>
  );
}
