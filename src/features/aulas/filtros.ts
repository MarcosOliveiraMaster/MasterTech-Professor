import type { Aula } from '../../lib/types'
import { endOfMonth, endOfWeek, parseISO, startOfMonth, startOfWeek, toISO } from '../../lib/dateUtils'
import { isAulaCinza } from './statusInfo'

export type FiltroData = 'todas' | 'hoje' | 'semana' | 'mes' | 'periodo'

export interface FiltroPeriodo {
  de: string | null
  ate: string | null
}

export function aulaPassaFiltroData(aula: Aula, filtroData: FiltroData, periodo: FiltroPeriodo): boolean {
  if (filtroData === 'todas') return true

  const dataAula = parseISO(aula.data)
  const hoje = new Date()

  if (filtroData === 'hoje') return aula.data === toISO(hoje)

  if (filtroData === 'semana') {
    const inicio = startOfWeek(hoje)
    const fim = endOfWeek(hoje)
    return dataAula >= inicio && dataAula <= fim
  }

  if (filtroData === 'mes') {
    const inicio = startOfMonth(hoje)
    const fim = endOfMonth(hoje)
    return dataAula >= inicio && dataAula <= fim
  }

  if (filtroData === 'periodo') {
    if (!periodo.de || !periodo.ate) return true
    return aula.data >= periodo.de && aula.data <= periodo.ate
  }

  return true
}

export function aulaPassaFiltroMateria(aula: Aula, materias: Set<string>): boolean {
  if (materias.size === 0) return true
  return materias.has(aula.materia)
}

export function aulaPassaFiltroCliente(aula: Aula, busca: string): boolean {
  if (!busca.trim()) return true
  return aula.nomeCliente.toLowerCase().includes(busca.trim().toLowerCase())
}

export function ordenarAulas(aulas: Aula[]): Aula[] {
  const ativas = aulas.filter(a => !isAulaCinza(a)).sort((a, b) => a.data.localeCompare(b.data))
  const cinzas = aulas.filter(a => isAulaCinza(a)).sort((a, b) => a.data.localeCompare(b.data))
  return [...ativas, ...cinzas]
}
