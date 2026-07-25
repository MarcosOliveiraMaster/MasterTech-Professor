import type { Aula, Pagamento } from '../../lib/types'
import { parseISO } from '../../lib/dateUtils'

const STATUS_QUE_CONTAM_RECEBER = ['concluída', 'reposição', 'cancelada']

export function aulasDoMes(aulas: Aula[], mes: number, ano: number): Aula[] {
  return aulas.filter(a => {
    const d = parseISO(a.data)
    return d.getMonth() === mes && d.getFullYear() === ano
  })
}

export function pagamentosDoMes(pagamentos: Pagamento[], mes: number, ano: number): Pagamento[] {
  return pagamentos.filter(p => {
    const d = parseISO(p.data)
    return d.getMonth() === mes && d.getFullYear() === ano
  })
}

export function calcularTotalReceberDoMes(aulas: Aula[], pagamentos: Pagamento[], mes: number, ano: number): number {
  const totalAulas = aulasDoMes(aulas, mes, ano)
    .filter(a => STATUS_QUE_CONTAM_RECEBER.includes(a.statusAula.toLowerCase()))
    .reduce((soma, a) => soma + a.valorAula, 0)
  const totalPagamentos = pagamentosDoMes(pagamentos, mes, ano)
    .reduce((soma, p) => soma + (p.tipo === 'entrada' ? p.valor : -p.valor), 0)
  return totalAulas + totalPagamentos
}

export function calcularTotalReceberDoDia(aulas: Aula[], pagamentos: Pagamento[], dataISO: string): number {
  const totalAulas = aulas
    .filter(a => a.data === dataISO && STATUS_QUE_CONTAM_RECEBER.includes(a.statusAula.toLowerCase()))
    .reduce((soma, a) => soma + a.valorAula, 0)
  const totalPagamentos = pagamentos
    .filter(p => p.data === dataISO)
    .reduce((soma, p) => soma + (p.tipo === 'entrada' ? p.valor : -p.valor), 0)
  return totalAulas + totalPagamentos
}
