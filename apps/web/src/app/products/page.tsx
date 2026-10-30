'use client';
import * as React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button, SkeletonCard, Pagination } from '@ecom/ui';
import { cn } from '@ecom/ui';
import { PageContainer, ProductGrid, SidebarLayout } from '@/components/layout/Grid';
import { FilterSidebar, type Filters } from '@/components/product/FilterSidebar';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/mock-data';

const DEFAULT_FILTERS: Filters = {
  categories: [],
  priceMin: 0,
  priceMax: 200000,
  rating: 0,
  inStock: false,
};

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'newest',     label: 'Newest Arrivals' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Avg. Customer Review' },
];

const PAGE_SIZE = 8;

function applyFilters(products: typeof PRODUCTS, filters: Filters, sort: string) {
  let result = products.filter((p) => {
    if (filters.categories.length > 0) {
      const catMap: Record<string, string> = {
        'electronics': 'Electronics', 'computers': 'Computers',
        'fashion': 'Fashion', 'home-kitchen': 'Home & Kitchen',
        'books': 'Books & Kindle', 'sports': 'Sports & Fitness',
        'toys': 'Toys & Games', 'tools': 'Tools & Hardware',
      };
      const labels = filters.categories.map((c) => catMap[c]).filter(Boolean);
      if (!labels.includes(p.category)) return false;
    }
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (filters.rating > 0 && p.rating < filters.rating) return false;
    if (filters.inStock && !p.inStock) return false;
    return true;
  });

  switch (sort) {
    case 'price-asc':  result = [...result].sort((a, b) => a.price - b.price); break;
    case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
    case 'rating':     result = [...result].sort((a, b) => b.rating - a.rating); break;
    case 'newest':     result = [...result].sort((a, b) => b.id - a.id); break;
    default:           result = [...result].sort((a, b) => b.reviews - a.reviews);
  }
  return result;
}

export default function ProductsPage() {
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState('popular');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  const filtered = applyFilters(PRODUCTS, filters, sort);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const handleSort = (v: string) => {
    setSort(v);
    setPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const handlePage = (p: number) => {
    setPage(p);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer className="py-6">
      {/* Page title + breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1 text-sm text-text-secondary">
          <li><a href="/" className="hover:text-text-link focus-visible:outline-none focus-visible:underline">Home</a></li>
          <li aria-hidden="true" className="text-text-muted">/</li>
          <li className="text-text-primary font-medium" aria-current="page">All Products</li>
        </ol>
      </nav>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-text-primary">
          All Products
          <span className="ml-2 text-base font-normal text-text-secondary">
            ({filtered.length.toLocaleString()} results)
          </span>
        </h1>

        {/* Mobile filter toggle */}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<SlidersHorizontal size={16} aria-hidden="true" />}
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden"
          aria-expanded={mobileFiltersOpen}
          aria-controls="mobile-filters"
        >
          Filters
        </Button>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div
          id="mobile-filters"
          className="fixed inset-0 z-overlay flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Product filters"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-80 max-w-full h-full bg-bg overflow-y-auto p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-1 rounded-sm hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => { handleFilterChange(f); setMobileFiltersOpen(false); }}
              onReset={() => { handleFilterChange(DEFAULT_FILTERS); setMobileFiltersOpen(false); }}
            />
          </div>
        </div>
      )}

      <SidebarLayout
        sidebar={
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={() => handleFilterChange(DEFAULT_FILTERS)}
          />
        }
      >
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-sm text-text-secondary">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-text-secondary whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className={cn(
                'h-9 pl-3 pr-8 text-sm rounded-sm',
                'border border-[var(--color-border-strong)] bg-bg text-text-primary',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                'cursor-pointer appearance-none',
                'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23565959\' stroke-width=\'2\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_8px_center]',
              )}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        {loading ? (
          <ProductGrid>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
          </ProductGrid>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-text-primary mb-2">No products found</p>
            <p className="text-sm text-text-secondary mb-6">Try adjusting your filters or search terms.</p>
            <Button variant="secondary" onClick={() => handleFilterChange(DEFAULT_FILTERS)}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <ProductGrid>
            {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
        )}

        {/* Pagination */}
        {!loading && filtered.length > PAGE_SIZE && (
          <div className="mt-8 flex justify-center">
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePage} />
          </div>
        )}
      </SidebarLayout>
    </PageContainer>
  );
}
