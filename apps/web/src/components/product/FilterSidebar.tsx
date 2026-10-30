'use client';
import * as React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Badge, StarRating } from '@ecom/ui';
import { cn } from '@ecom/ui';
import { CATEGORIES } from '@/lib/mock-data';

export interface Filters {
  categories: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
  className?: string;
}

function Section({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = React.useId();
  return (
    <div className="border-b border-[var(--color-border)] py-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between text-sm font-semibold text-text-primary',
          'hover:text-text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm',
        )}
      >
        {title}
        {open
          ? <ChevronUp size={16} aria-hidden="true" />
          : <ChevronDown size={16} aria-hidden="true" />
        }
      </button>
      {open && (
        <div id={id} className="mt-3 flex flex-col gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxItem({
  id, label, checked, onChange, count,
}: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void; count?: number }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          'w-4 h-4 rounded-sm border-2 border-[var(--color-border-strong)]',
          'accent-[var(--color-primary)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
          'cursor-pointer',
        )}
      />
      <span className="text-sm text-text-primary group-hover:text-text-link flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-text-muted">{count.toLocaleString()}</span>
      )}
    </label>
  );
}

export function FilterSidebar({ filters, onChange, onReset, className }: FilterSidebarProps) {
  const hasActive =
    filters.categories.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 200000 ||
    filters.rating > 0 ||
    filters.inStock;

  const toggleCategory = (id: string, checked: boolean) => {
    onChange({
      ...filters,
      categories: checked
        ? [...filters.categories, id]
        : filters.categories.filter((c) => c !== id),
    });
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
        <h2 className="text-base font-semibold text-text-primary">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={onReset}
            className={cn(
              'flex items-center gap-1 text-xs text-danger hover:underline',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm',
            )}
            aria-label="Clear all filters"
          >
            <X size={12} aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {hasActive && (
        <div className="flex flex-wrap gap-1 py-3 border-b border-[var(--color-border)]">
          {filters.categories.map((c) => {
            const cat = CATEGORIES.find((x) => x.id === c);
            return (
              <Badge
                key={c}
                variant="primary"
                size="xs"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleCategory(c, false)}
                role="button"
                aria-label={`Remove ${cat?.label ?? c} filter`}
              >
                {cat?.label ?? c}
                <X size={10} aria-hidden="true" />
              </Badge>
            );
          })}
          {filters.rating > 0 && (
            <Badge
              variant="primary"
              size="xs"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onChange({ ...filters, rating: 0 })}
              role="button"
              aria-label="Remove rating filter"
            >
              {filters.rating}★ & up
              <X size={10} aria-hidden="true" />
            </Badge>
          )}
          {filters.inStock && (
            <Badge
              variant="primary"
              size="xs"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onChange({ ...filters, inStock: false })}
              role="button"
              aria-label="Remove in-stock filter"
            >
              In Stock
              <X size={10} aria-hidden="true" />
            </Badge>
          )}
        </div>
      )}

      {/* Category */}
      <Section title="Category">
        {CATEGORIES.map((cat) => (
          <CheckboxItem
            key={cat.id}
            id={`cat-${cat.id}`}
            label={cat.label}
            checked={filters.categories.includes(cat.id)}
            onChange={(v) => toggleCategory(cat.id, v)}
            count={cat.count}
          />
        ))}
      </Section>

      {/* Price range */}
      <Section title="Price Range">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="price-min" className="text-xs text-text-secondary w-8 shrink-0">Min</label>
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-text-muted" aria-hidden="true">₹</span>
              <input
                id="price-min"
                type="number"
                min={0}
                max={filters.priceMax}
                value={filters.priceMin}
                onChange={(e) => onChange({ ...filters, priceMin: Math.max(0, Number(e.target.value)) })}
                className={cn(
                  'w-full pl-6 pr-2 h-8 text-sm rounded-sm',
                  'border border-[var(--color-border-strong)] bg-bg text-text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                )}
                aria-label="Minimum price in rupees"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="price-max" className="text-xs text-text-secondary w-8 shrink-0">Max</label>
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-text-muted" aria-hidden="true">₹</span>
              <input
                id="price-max"
                type="number"
                min={filters.priceMin}
                max={200000}
                value={filters.priceMax}
                onChange={(e) => onChange({ ...filters, priceMax: Math.min(200000, Number(e.target.value)) })}
                className={cn(
                  'w-full pl-6 pr-2 h-8 text-sm rounded-sm',
                  'border border-[var(--color-border-strong)] bg-bg text-text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                )}
                aria-label="Maximum price in rupees"
              />
            </div>
          </div>
          {/* Range slider */}
          <input
            type="range"
            min={0}
            max={200000}
            step={500}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full accent-[var(--color-primary)] cursor-pointer"
            aria-label="Maximum price slider"
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>₹0</span>
            <span>₹2,00,000</span>
          </div>
        </div>
      </Section>

      {/* Star rating */}
      <Section title="Customer Rating">
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Minimum star rating">
          {[4, 3, 2, 1].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                value={stars}
                checked={filters.rating === stars}
                onChange={() => onChange({ ...filters, rating: stars })}
                className="accent-[var(--color-primary)] w-4 h-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`${stars} stars and above`}
              />
              <StarRating value={stars} size="sm" />
              <span className="text-xs text-text-secondary group-hover:text-text-primary">& up</span>
            </label>
          ))}
          {filters.rating > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, rating: 0 })}
              className="text-xs text-text-link hover:underline text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              Clear rating
            </button>
          )}
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <label className="flex items-center gap-3 cursor-pointer group">
          <button
            type="button"
            role="switch"
            aria-checked={filters.inStock}
            onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
            className={cn(
              'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full',
              'transition-colors duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              filters.inStock ? 'bg-primary' : 'bg-surface3',
            )}
            aria-label="Show only in-stock items"
          >
            <span
              className={cn(
                'inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm',
                'transition-transform duration-fast ease-smooth',
                filters.inStock ? 'translate-x-4' : 'translate-x-1',
              )}
            />
          </button>
          <span className="text-sm text-text-primary group-hover:text-text-link">In Stock Only</span>
        </label>
      </Section>
    </div>
  );
}
