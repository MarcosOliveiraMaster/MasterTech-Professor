import type { Aula, Certificacao } from '../../lib/types'
import { MESES } from '../../lib/constants'
import { parseISO } from '../../lib/dateUtils'

export function aulasConcluidasPorMes(aulas: Aula[], meses = 12) {
  const hoje = new Date()
  const pontos = []
  for (let i = meses - 1; i >= 0; i--) {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const qtd = aulas.filter(a => {
      const d = parseISO(a.data)
      return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear()
        && a.statusAula.toLowerCase() === 'concluída'
    }).length
    pontos.push({ mes: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}`, quantidade: qtd })
  }
  return pontos
}

export function notaMediaPorMes(aulas: Aula[], meses = 12) {
  const hoje = new Date()
  const pontos = []
  for (let i = meses - 1; i >= 0; i--) {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const avaliadas = aulas.filter(a => {
      const d = parseISO(a.data)
      return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear() && typeof a.notaAula === 'number'
    })
    const media = avaliadas.length
      ? avaliadas.reduce((soma, a) => soma + (a.notaAula || 0), 0) / avaliadas.length
      : null
    pontos.push({ mes: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}`, nota: media !== null ? Math.round(media * 10) / 10 : null })
  }
  return pontos
}

export function distribuicaoEstrelas(aulas: Aula[]) {
  const contagem = [0, 0, 0, 0, 0]
  aulas.forEach(a => {
    if (typeof a.notaAula === 'number' && a.notaAula >= 1 && a.notaAula <= 5) {
      contagem[a.notaAula - 1]++
    }
  })
  return contagem.map((quantidade, i) => ({ estrelas: `${i + 1}★`, quantidade }))
}

export function distribuicaoMaterias(aulas: Aula[]) {
  const mapa = new Map<string, number>()
  aulas.forEach(a => mapa.set(a.materia, (mapa.get(a.materia) || 0) + 1))
  return [...mapa.entries()].map(([materia, quantidade]) => ({ materia, quantidade })).sort((a, b) => b.quantidade - a.quantidade)
}

export function statusPorMes(aulas: Aula[], meses = 12) {
  const hoje = new Date()
  const pontos = []
  for (let i = meses - 1; i >= 0; i--) {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const doMes = aulas.filter(a => {
      const d = parseISO(a.data)
      return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear()
    })
    const concluidas = doMes.filter(a => a.statusAula.toLowerCase() === 'concluída').length
    const canceladas = doMes.filter(a => a.statusAula.toLowerCase() === 'cancelada').length
    const agendadas = doMes.length - concluidas - canceladas
    pontos.push({ mes: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}`, concluidas, agendadas, canceladas })
  }
  return pontos
}

export function conquistasDoMes(certificacoes: Certificacao[], mes: number, ano: number): Certificacao[] {
  return certificacoes.filter(c => {
    if (!c.conquistadoEm) return false
    const d = parseISO(c.conquistadoEm)
    return d.getMonth() === mes && d.getFullYear() === ano
  })
}

export function aulasComRelatorioNoMes(aulas: Aula[], mes: number, ano: number): { comRelatorio: number; total: number; percentual: number | null } {
  const concluidasDoMes = aulas.filter(a => {
    const d = parseISO(a.data)
    return d.getMonth() === mes && d.getFullYear() === ano && a.statusAula.toLowerCase() === 'concluída'
  })
  const comRelatorio = concluidasDoMes.filter(a => (a.descricao || '').trim().length > 0).length
  return {
    comRelatorio,
    total: concluidasDoMes.length,
    percentual: concluidasDoMes.length ? Math.round((comRelatorio / concluidasDoMes.length) * 100) : null,
  }
}

export interface PontoMediaAlunos {
  mes: string
  [aluno: string]: string | number
}

export function todosOsAlunos(aulas: Aula[]): string[] {
  return [...new Set(aulas.map(a => a.estudante))].sort((a, b) => a.localeCompare(b))
}

export function mediaAlunosPorMes(aulas: Aula[], alunosFiltro: string[] = [], meses = 6): { dados: PontoMediaAlunos[]; alunos: string[] } {
  const hoje = new Date()
  const alunos = alunosFiltro.length ? alunosFiltro : todosOsAlunos(aulas).slice(0, 6)

  const dados: PontoMediaAlunos[] = []
  for (let i = meses - 1; i >= 0; i--) {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const ponto: PontoMediaAlunos = { mes: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}` }
    for (const aluno of alunos) {
      const notas = aulas.filter(a => {
        const d = parseISO(a.data)
        return a.estudante === aluno && d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear() && typeof a.notaAula === 'number'
      })
      if (notas.length) {
        const media = notas.reduce((soma, a) => soma + (a.notaAula || 0), 0) / notas.length
        ponto[aluno] = Math.round(media * 10) / 10
      }
    }
    dados.push(ponto)
  }
  return { dados, alunos }
}
