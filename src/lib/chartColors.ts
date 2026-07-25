// Paleta de gráficos derivada da identidade MasterEduTech e validada
// (CVD-safe) contra o fundo escuro do app com scripts/validate_palette.js.
export const CHART_BLUE = '#3d8fc9'
export const CHART_MINT = '#22a578'
export const CHART_AMBER = '#b8770f'
export const CHART_VIOLET = '#7c6fe0'

export const CHART_CATEGORICAL = [CHART_BLUE, CHART_MINT, CHART_AMBER, CHART_VIOLET]

export const CHART_STATUS = {
  good: '#22c55e',
  warning: '#f59e0b',
  critical: '#ef4444',
}

export const CHART_INK = {
  primary: 'rgba(255,255,255,0.90)',
  secondary: 'rgba(255,255,255,0.55)',
  muted: 'rgba(255,255,255,0.30)',
  grid: 'rgba(255,255,255,0.08)',
}

export function corCategorica(indice: number): string {
  return CHART_CATEGORICAL[indice % CHART_CATEGORICAL.length]
}
