// Re-export the CSS import path for consumers
export const tokensCSS = './tokens.css';

// Token values as JS constants (mirrors design-tokens.json)
export const tokens = {
  color: {
    primary: '#FF9900',
    primaryHover: '#E68A00',
    primaryFg: '#111111',
    secondary: '#131921',
    secondaryFg: '#FFFFFF',
    accent: '#00A8A8',
    accentHover: '#008C8C',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  control: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },
} as const;
