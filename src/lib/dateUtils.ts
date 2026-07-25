import { DIAS_SEMANA_ABREV, DIAS_SEMANA_EXTENSO } from './constants'

export function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export function startOfWeek(date: Date): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() - copy.getDay())
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function endOfWeek(date: Date): Date {
  return addDays(startOfWeek(date), 6)
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function formatarDataBR(iso: string): string {
  const d = parseISO(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

export function diaSemanaExtenso(iso: string): string {
  const d = parseISO(iso)
  return DIAS_SEMANA_EXTENSO[d.getDay()]
}

export function diaSemanaAbrev(iso: string): string {
  const d = parseISO(iso)
  return DIAS_SEMANA_ABREV[d.getDay()]
}

export function formatarDataCurta(iso: string): string {
  const d = parseISO(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`
}

export function formatarMinutos(totalMin: number): string {
  if (!totalMin || totalMin <= 0) return '0h'
  const h = Math.floor(totalMin / 60)
  const mm = totalMin % 60
  if (mm === 0) return `${h}h`
  return `${h}h ${mm}min`
}

export function formatarMoeda(valor: number | null | undefined): string {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return 'R$ —'
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function primeirosNomes(nome: string, qtd = 2): string {
  return nome.split(' ').filter(Boolean).slice(0, qtd).join(' ')
}
