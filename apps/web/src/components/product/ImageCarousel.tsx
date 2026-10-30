'use client';
import * as React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@ecom/ui';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const [zoomed, setZoomed] = React.useState(false);
  const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 });

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className={cn(
          'relative aspect-square rounded-md overflow-hidden bg-surface1 border border-[var(--color-border)]',
          zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
        )}
        onClick={() => setZoomed((z) => !z)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomed(false)}
        role="img"
        aria-label={`${title} — image ${current + 1} of ${images.length}${zoomed ? ' (zoomed)' : ''}`}
      >
        <img
          src={images[current]}
          alt={`${title} — view ${current + 1}`}
          className={cn(
            'w-full h-full object-cover transition-transform duration-fast ease-smooth',
            zoomed ? 'scale-150' : 'scale-100',
          )}
          style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
          draggable={false}
          width={600}
          height={600}
        />

        {/* Zoom hint */}
        {!zoomed && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-sm bg-bg/80 text-xs text-text-secondary">
            <ZoomIn size={12} aria-hidden="true" />
            Hover to zoom
          </div>
        )}

        {/* Prev/Next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2',
                'w-8 h-8 flex items-center justify-center rounded-full',
                'bg-bg/90 border border-[var(--color-border)] shadow-sm',
                'hover:bg-bg transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              )}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'w-8 h-8 flex items-center justify-center rounded-full',
                'bg-bg/90 border border-[var(--color-border)] shadow-sm',
                'hover:bg-bg transition-colors duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              )}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`View image ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={cn(
                'shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-fast ease-smooth',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                i === current
                  ? 'border-primary shadow-sm'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]',
              )}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={64}
                height={64}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
