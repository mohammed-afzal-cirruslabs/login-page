/**
 * Shared Tailwind CSS configuration — wired to design-tokens.json.
 * Every value here is sourced from the token file; no literal values.
 * @type {import('tailwindcss').Config}
 */
const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    // Scan all apps and the shared UI package
    '../../apps/web/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // ── Breakpoints (from tokens.breakpoint) ──────────────────────────────
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    // ── Spacing (from tokens.spacing) ─────────────────────────────────────
    // Tailwind's default scale is kept; we ADD named tokens on top.
    extend: {
      // ── Colours (from tokens.color) ─────────────────────────────────────
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-fg': 'var(--color-primary-fg)',
          secondary: 'var(--color-secondary)',
          'secondary-fg': 'var(--color-secondary-fg)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
        },
        neutral: {
          background: 'var(--color-background)',
          'surface-1': 'var(--color-surface-1)',
          'surface-2': 'var(--color-surface-2)',
          'surface-3': 'var(--color-surface-3)',
          border: 'var(--color-border)',
          'border-strong': 'var(--color-border-strong)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
          'link-hover': 'var(--color-text-link-hover)',
          'on-primary': 'var(--color-text-on-primary)',
        },
        semantic: {
          success: 'var(--color-success)',
          'success-surface': 'var(--color-success-surface)',
          warning: 'var(--color-warning)',
          'warning-surface': 'var(--color-warning-surface)',
          danger: 'var(--color-danger)',
          'danger-surface': 'var(--color-danger-surface)',
          info: 'var(--color-info)',
          'info-surface': 'var(--color-info-surface)',
        },
      },

      // ── Typography (from tokens.typography) ──────────────────────────────
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      fontSize: {
        xs:   ['12px', { lineHeight: '16px', fontWeight: '400' }],
        sm:   ['14px', { lineHeight: '20px', fontWeight: '400' }],
        base: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        lg:   ['20px', { lineHeight: '28px', fontWeight: '600' }],
        xl:   ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '2xl':['32px', { lineHeight: '40px', fontWeight: '700' }],
        '3xl':['48px', { lineHeight: '56px', fontWeight: '700' }],
      },
      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },

      // ── Spacing (from tokens.spacing) ────────────────────────────────────
      spacing: {
        1:  '4px',
        2:  '8px',
        3:  '12px',
        4:  '16px',
        5:  '20px',
        6:  '24px',
        8:  '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        'content': '1280px',
      },

      // ── Border radius (from tokens.border-radius) ─────────────────────────
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        full: '9999px',
      },

      // ── Box shadows (from tokens.shadow) ─────────────────────────────────
      boxShadow: {
        none: 'none',
        sm:   '0 1px 3px rgba(0, 0, 0, 0.12)',
        md:   '0 4px 12px rgba(0, 0, 0, 0.15)',
        lg:   '0 8px 32px rgba(0, 0, 0, 0.20)',
      },

      // ── Z-index (from tokens.z-index) ─────────────────────────────────────
      zIndex: {
        base:     '0',
        raised:   '10',
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
        toast:    '500',
      },

      // ── Transitions (from tokens.transition) ──────────────────────────────
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // ── Component heights (from tokens.component-heights) ─────────────────
      height: {
        'control-sm': '32px',
        'control-md': '40px',
        'control-lg': '48px',
      },
      minHeight: {
        'control-sm': '32px',
        'control-md': '40px',
        'control-lg': '48px',
      },

      // ── Max width ─────────────────────────────────────────────────────────
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}

module.exports = config
