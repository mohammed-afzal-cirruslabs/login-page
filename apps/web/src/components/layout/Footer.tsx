'use client';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@ecom/ui';
import { Button } from '@ecom/ui';
import { Input } from '@ecom/ui';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Get to Know Us',
    links: [
      { label: 'About ShopNow', href: '/about' },
      { label: 'Careers',       href: '/careers' },
      { label: 'Press',         href: '/press' },
      { label: 'Blog',          href: '/blog' },
    ],
  },
  {
    heading: 'Make Money with Us',
    links: [
      { label: 'Sell on ShopNow',  href: '/sell' },
      { label: 'Affiliate Program', href: '/affiliate' },
      { label: 'Advertise',        href: '/advertise' },
    ],
  },
  {
    heading: 'Let Us Help You',
    links: [
      { label: 'Your Account',   href: '/account' },
      { label: 'Your Orders',    href: '/orders' },
      { label: 'Shipping Rates', href: '/shipping' },
      { label: 'Returns',        href: '/returns' },
      { label: 'Help Centre',    href: '/help' },
    ],
  },
  {
    heading: 'Shop by Category',
    links: [
      { label: 'Electronics',   href: '/category/electronics' },
      { label: 'Fashion',       href: '/category/fashion' },
      { label: 'Home & Kitchen',href: '/category/home-kitchen' },
      { label: 'Books',         href: '/category/books' },
      { label: 'Sports',        href: '/category/sports' },
    ],
  },
];

const SOCIAL = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://facebook.com' },
  { icon: Twitter,   label: 'Twitter/X', href: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Youtube,   label: 'YouTube',   href: 'https://youtube.com' },
];

function NewsletterSignup() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-semibold text-secondary-fg mb-2">
        Stay in the loop
      </h3>
      <p className="text-xs text-secondary-fg/70 mb-3">
        Get deals, new arrivals and exclusive offers straight to your inbox.
      </p>
      {submitted ? (
        <p className="text-sm text-primary font-medium">
          ✓ You&apos;re subscribed! Check your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
          aria-label="Newsletter signup"
        >
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className={cn(
              'flex-1 h-control-md px-3 rounded-sm text-sm bg-white/10 border border-white/20',
              'text-secondary-fg placeholder:text-secondary-fg/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0',
              'transition-colors duration-fast ease-smooth'
            )}
          />
          <Button type="submit" variant="primary" size="md" aria-label="Subscribe to newsletter">
            <Mail size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Subscribe</span>
          </Button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-fg mt-auto" aria-label="Site footer">
      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'w-full py-3 text-sm font-medium text-secondary-fg bg-[#232F3E]',
          'hover:bg-[#2E3A4A] transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0'
        )}
        aria-label="Back to top of page"
      >
        Back to top
      </button>

      {/* Main footer content */}
      <div className="page-container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-sm font-semibold text-secondary-fg mb-3">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-2" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm text-secondary-fg/70',
                        'hover:text-secondary-fg transition-colors duration-fast ease-smooth',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + Social */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <NewsletterSignup />

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  'w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-secondary-fg',
                  'hover:bg-white/20 transition-colors duration-fast ease-smooth',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
                )}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] border-t border-white/10">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary-fg/60">
          <p>© {new Date().getFullYear()} ShopNow, Inc. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex items-center gap-4">
            {['Privacy Notice', 'Conditions of Use', 'Cookie Settings'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  'hover:text-secondary-fg transition-colors duration-fast ease-smooth',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm'
                )}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
