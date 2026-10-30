'use client';
import * as React from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button, notify } from '@ecom/ui';
import { cn } from '@ecom/ui';
import { HERO_SLIDES } from '@/lib/mock-data';

export function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = HERO_SLIDES.length;

  // Auto-advance
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = HERO_SLIDES[current];

  return (
    <div
      className="relative w-full rounded-md overflow-hidden min-h-[260px] sm:min-h-[380px]"
      role="region"
      aria-label="Featured promotions carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${total}: ${s.headline}`}
          aria-hidden={i !== current}
          className={cn(
            'absolute inset-0 flex items-center bg-gradient-to-r transition-opacity duration-slow ease-smooth',
            s.bg,
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          )}
        >
          {/* Text */}
          <div className="relative z-10 p-8 sm:p-12 max-w-xl">
            <span
              className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: s.accent + '22', color: s.accent }}
            >
              Limited Time Deal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              {s.headline}
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-6">{s.sub}</p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Zap size={18} aria-hidden="true" />}
              onClick={() => notify.info(`Navigating to ${s.cta}…`)}
              style={{ background: s.accent, color: '#111' }}
            >
              {s.cta}
            </Button>
          </div>

          {/* Decorative image */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:block overflow-hidden">
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131921] to-transparent" />
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 z-20',
          'w-9 h-9 flex items-center justify-center rounded-full',
          'bg-bg/80 border border-[var(--color-border)] shadow-sm',
          'hover:bg-bg transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        )}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2 z-20',
          'w-9 h-9 flex items-center justify-center rounded-full',
          'bg-bg/80 border border-[var(--color-border)] shadow-sm',
          'hover:bg-bg transition-colors duration-fast ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        )}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2"
        role="tablist"
        aria-label="Carousel slides"
      >
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-fast ease-smooth',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
              i === current ? 'bg-primary w-5' : 'bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
}
