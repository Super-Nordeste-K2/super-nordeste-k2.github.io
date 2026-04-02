export const theme = {
  gold:       '#E8A020',
  goldDim:    'rgba(232,160,32,0.12)',
  red:        '#D42B2B',
  redDim:     'rgba(212,43,43,0.10)',
  bg:         '#0C0C0E',
  bg2:        '#111114',
  surface:    '#17171B',
  border:     'rgba(255,255,255,0.07)',
  text:       '#F0F0F0',
  muted:      'rgba(240,240,240,0.42)',
  fontDisplay: "'Syne', sans-serif",
  fontBody:    "'DM Sans', sans-serif",
} as const

export type AppTheme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
