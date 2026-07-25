import type { Aula } from '../../lib/types'

export interface StatusInfo {
  cor: string
  bg: string
  label: string
}

export function getStatusInfo(status: string | undefined): StatusInfo {
  if (!status) return { cor: 'var(--c-text-3)', bg: 'var(--c-glass-bg-sm)', label: '—' }
  const s = status.toLowerCase()

  if (s === 'entrada') return { cor: '#059669', bg: '#d1fae5', label: 'Entrada' }
  if (s === 'saida' || s === 'saída') return { cor: '#dc2626', bg: '#fee2e2', label: 'Saída' }
  if (s.includes('conclu') || s.includes('realiz')) return { cor: '#059669', bg: '#d1fae5', label: status }
  if (s.includes('agend') || s.includes('confirm')) return { cor: '#2563eb', bg: '#dbeafe', label: status }
  if (s.includes('cancel')) return { cor: '#dc2626', bg: '#fee2e2', label: status }
  if (s.includes('andamento') || s.includes('curso')) return { cor: '#d97706', bg: '#fef3c7', label: status }
  return { cor: '#6b7280', bg: '#f3f4f6', label: status }
}

export function isAulaCinza(aula: Aula): boolean {
  return aula.confirmacaoProfessor || aula.statusAula.toLowerCase().includes('cancel')
}
