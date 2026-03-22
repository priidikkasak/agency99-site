export const colors = {
  bgPrimary: '#0F0F0D',
  bgSecondary: '#161614',
  bgTertiary: '#1E1E1B',
  textPrimary: '#F0EDE6',
  textSecondary: '#8A8880',
  textTertiary: '#55534F',
  border: '#2C2C29',
  borderSubtle: '#222220',
  borderBright: '#3A3A37',
  accent: '#9B8BFF',
  accentRgb: '155, 139, 255',
} as const;

export const spacing = {
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  6: '48px',
  8: '64px',
  10: '80px',
  12: '96px',
  16: '128px',
} as const;

export const breakpoints = {
  mobile: '768px',
  tablet: '1023px',
  desktop: '1024px',
} as const;

export const typography = {
  heroSize: 'clamp(52px, 6.5vw, 84px)',
  h1Size: 'clamp(40px, 5vw, 64px)',
  h2Size: 'clamp(28px, 3.5vw, 44px)',
  h3Size: '24px',
  bodyLargeSize: '18px',
  bodySize: '16px',
  smallSize: '13px',
  labelSize: '11px',
} as const;
