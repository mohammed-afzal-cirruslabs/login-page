'use client';
import * as React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  MapPin,
  Package,
  Heart,
  LogOut,
} from 'lucide-react';
import { cn } from '@ecom/ui';
import { Badge } from '@ecom/ui';
import { Button } from '@ecom/ui';
import { Drawer } from '@ecom/ui';

// ─── Category mega-menu data ────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Electronics',
    href: '/category/electronics',
    sub: ['Phones', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Wearables'],
  },
  {
    label: 'Fashion',
    href: '/category/fashion',
    sub: ["Men's", "Women's", 'Kids', 'Shoes', 'Bags', 'Jewellery'],
  },
  {
    label: 'Home & Kitchen',
    href: '/category/home-kitchen',
    sub: ['Furniture', 'Bedding', 'Cookware', 'Storage', 'Decor', 'Lighting'],
  },
  {
    label: 'Books',
    href: '/category/books',
    sub: ['Fiction', 'Non-fiction', 'Textbooks', 'Comics', 'Children', 'Self-help'],
  },
  {
    label: 'Sports',
    href: '/category/sports',
    sub: ['Fitness', 'Outdoor', 'Team Sports', 'Cycling', 'Swimming', 'Yoga'],
  },
  {
    label: 'Beauty',
    href: '/category/beauty',
    sub: ['Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Men\'s Grooming'],
  },
];

// ─── Dark mode toggle ────────────────────────────────────────────────────────
function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-sm text-secondary-fg',
        'hover:bg-white/10 transition-colors duration-fast ease-smooth',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
      )}
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}

// ─── Search bar ──────────────────────────────────────────────────────────────
function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = React.useState('');

  return (
    <form
      role="search"
      aria-label="Search products"
      className={cn('flex items-stretch rounded-sm overflow-hidden', className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }}
    >
      <label htmlFor="nav-search" className="sr-only">
        Search products
      </label>
      <input
        id="nav-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, brands and more…"
        className={cn(
          'flex-1 h-control-md px-4 text-sm text-[#111] bg-white',
          'border-0 outline-none placeholder:text-text-muted',
          'focus-visible:outline-none'
        )}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className={cn(
          'w-12 flex items-center justify-center bg-primary hover:bg-primary-hover',
          'transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
        )}
      >
        <Search size={18} className="text-primary-fg" aria-hidden="true" />
      </button>
    </form>
  );
}

// ─── Account menu ────────────────────────────────────────────────────────────
function AccountMenu() {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className={cn(
          'flex flex-col items-start px-2 py-1 rounded-sm text-secondary-fg',
          'hover:bg-white/10 transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
        )}
      >
        <span className="text-xs text-secondary-fg/70">Hello, Sign in</span>
        <span className="text-sm font-semibold flex items-center gap-1">
          Account <ChevronDown size={12} aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account options"
          className={cn(
            'absolute right-0 top-full mt-1 w-56 rounded-md bg-bg border border-[var(--color-border)]',
            'shadow-md z-dropdown py-1'
          )}
        >
          {[
            { icon: User,    label: 'My Account',    href: '/account' },
            { icon: Package, label: 'Orders',         href: '/orders' },
            { icon: Heart,   label: 'Wishlist',       href: '/wishlist' },
            { icon: LogOut,  label: 'Sign out',       href: '/auth/signout' },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2 text-sm text-text-primary',
                'hover:bg-surface1 transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:bg-surface1'
              )}
            >
              <Icon size={16} className="text-text-secondary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Category mega-menu ──────────────────────────────────────────────────────
function MegaMenu() {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <nav
      aria-label="Product categories"
      className="relative hidden lg:block bg-secondary border-t border-white/10"
      onMouseLeave={() => setActive(null)}
    >
      <div className="page-container flex items-center gap-0">
        <Link
          href="/deals"
          className={cn(
            'px-3 py-2 text-sm font-medium text-secondary-fg',
            'hover:bg-white/10 transition-colors duration-fast ease-smooth',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0'
          )}
        >
          Today&apos;s Deals
        </Link>

        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            onMouseEnter={() => setActive(cat.label)}
            className="relative"
          >
            <Link
              href={cat.href}
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary-fg',
                'hover:bg-white/10 transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0',
                active === cat.label && 'bg-white/10'
              )}
              aria-expanded={active === cat.label}
              aria-haspopup="true"
            >
              {cat.label}
              <ChevronDown size={12} aria-hidden="true" />
            </Link>

            {/* Dropdown panel */}
            {active === cat.label && (
              <div
                className={cn(
                  'absolute left-0 top-full z-dropdown',
                  'min-w-[200px] rounded-b-md rounded-tr-md bg-bg border border-[var(--color-border)]',
                  'shadow-md py-2'
                )}
                role="menu"
                aria-label={`${cat.label} subcategories`}
              >
                {cat.sub.map((sub) => (
                  <Link
                    key={sub}
                    href={`${cat.href}/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    role="menuitem"
                    className={cn(
                      'block px-4 py-2 text-sm text-text-primary',
                      'hover:bg-surface1 hover:text-text-link transition-colors duration-fast ease-smooth',
                      'focus-visible:outline-none focus-visible:bg-surface1'
                    )}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <Link
          href="/new-arrivals"
          className={cn(
            'ml-auto px-3 py-2 text-sm font-medium text-primary',
            'hover:bg-white/10 transition-colors duration-fast ease-smooth',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0'
          )}
        >
          New Arrivals
        </Link>
      </div>
    </nav>
  );
}

// ─── Mobile drawer menu ──────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left" width="300px">
      <nav aria-label="Mobile navigation">
        <div className="flex flex-col gap-1">
          <Link
            href="/deals"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 text-base font-medium text-text-primary hover:bg-surface1 rounded-sm transition-colors duration-fast"
          >
            Today&apos;s Deals
          </Link>

          {CATEGORIES.map((cat) => (
            <details key={cat.label} className="group">
              <summary
                className={cn(
                  'flex items-center justify-between px-3 py-3 text-base font-medium text-text-primary',
                  'hover:bg-surface1 rounded-sm cursor-pointer transition-colors duration-fast',
                  'list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
              >
                {cat.label}
                <ChevronDown
                  size={16}
                  className="text-text-secondary transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pl-4 flex flex-col gap-0.5 mt-1">
                {cat.sub.map((sub) => (
                  <Link
                    key={sub}
                    href={`${cat.href}/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={onClose}
                    className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface1 rounded-sm transition-colors duration-fast"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <hr className="my-2 border-[var(--color-border)]" />

          {[
            { icon: User,    label: 'My Account', href: '/account' },
            { icon: Package, label: 'Orders',     href: '/orders' },
            { icon: Heart,   label: 'Wishlist',   href: '/wishlist' },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-base font-medium text-text-primary hover:bg-surface1 rounded-sm transition-colors duration-fast"
            >
              <Icon size={18} className="text-text-secondary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </Drawer>
  );
}

// ─── NavBar ──────────────────────────────────────────────────────────────────
export function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  // Mock cart count — will come from cart store in later tickets
  const cartCount: number = 3;

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-sticky',
          scrolled && 'shadow-sm'
        )}
      >
        {/* Skip link */}
        <a
          href="#main-content"
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-toast',
            'focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-sm focus:text-sm focus:font-medium'
          )}
        >
          Skip to main content
        </a>

        {/* Primary bar */}
        <div className="bg-secondary">
          <div className="page-container flex items-center gap-3 h-16">
            {/* Mobile hamburger */}
            <button
              type="button"
              className={cn(
                'lg:hidden flex items-center justify-center w-9 h-9 rounded-sm text-secondary-fg',
                'hover:bg-white/10 transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} aria-hidden="true" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="ShopNow — Home"
              className={cn(
                'flex items-center shrink-0 mr-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm'
              )}
            >
              <span className="text-white font-bold text-xl tracking-tight">
                Shop<span className="text-primary">Now</span>
              </span>
            </Link>

            {/* Deliver to */}
            <button
              type="button"
              className={cn(
                'hidden lg:flex flex-col items-start px-2 py-1 rounded-sm text-secondary-fg shrink-0',
                'hover:bg-white/10 transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
              )}
              aria-label="Change delivery location"
            >
              <span className="text-xs text-secondary-fg/70 flex items-center gap-1">
                <MapPin size={10} aria-hidden="true" /> Deliver to
              </span>
              <span className="text-sm font-semibold">India</span>
            </button>

            {/* Search */}
            <SearchBar className="flex-1 hidden sm:flex" />

            {/* Right controls */}
            <div className="flex items-center gap-1 ml-auto sm:ml-0">
              <DarkModeToggle />

              {/* Account — desktop */}
              <div className="hidden lg:block">
                <AccountMenu />
              </div>

              {/* Returns */}
              <Link
                href="/orders"
                className={cn(
                  'hidden lg:flex flex-col items-start px-2 py-1 rounded-sm text-secondary-fg',
                  'hover:bg-white/10 transition-colors duration-fast ease-smooth',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
                )}
              >
                <span className="text-xs text-secondary-fg/70">Returns</span>
                <span className="text-sm font-semibold">& Orders</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                className={cn(
                  'relative flex items-center gap-1 px-2 py-1 rounded-sm text-secondary-fg',
                  'hover:bg-white/10 transition-colors duration-fast ease-smooth',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
                )}
              >
                <span className="relative">
                  <ShoppingCart size={26} aria-hidden="true" />
                  {cartCount > 0 && (
                    <Badge
                      variant="primary"
                      size="xs"
                      pill
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] text-[11px] font-bold"
                      aria-hidden="true"
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  )}
                </span>
                <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              </Link>
            </div>
          </div>

          {/* Mobile search */}
          <div className="sm:hidden px-4 pb-3">
            <SearchBar className="w-full" />
          </div>
        </div>

        {/* Mega-menu bar */}
        <MegaMenu />
      </header>

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
