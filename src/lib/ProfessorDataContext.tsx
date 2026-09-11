import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { Aula, Aviso, CanvasColunaId, CanvasQuadro, Certificacao, Cliente, Contrato, Feedback, MaterialDidatico, Pagamento, Professor } from './types'
import {
  criarAulasMock, criarAvisosMock, criarCanvasQuadrosMock, criarCertificacoesMock, criarClientesMock, criarContratosMock,
  criarFeedbacksMock, criarMateriaisMock, criarPagamentosMock, criarProfessorMock,
} from './mockData'

const STORAGE_KEY = 'mep:data:v8'

interface StoredData {
  professor: Professor
  aulas: Aula[]
  pagamentos: Pagamento[]
  materiais: MaterialDidatico[]
  avisos: Aviso[]
  clientes: Cliente[]
  feedbacks: Feedback[]
  certificacoes: Certificacao[]
  contratos: Contrato[]
  canvasQuadros: CanvasQuadro[]
}

const CHAVES_ESPERADAS: (keyof StoredData)[] = [
  'professor', 'aulas', 'pagamentos', 'materiais', 'avisos', 'clientes', 'feedbacks', 'certificacoes', 'contratos', 'canvasQuadros',
]

function gerarDadosIniciais(): StoredData {
  return {
    professor: criarProfessorMock(),
    aulas: criarAulasMock(),
    pagamentos: criarPagamentosMock(),
    materiais: criarMateriaisMock(),
    avisos: criarAvisosMock(),
    clientes: criarClientesMock(),
    feedbacks: criarFeedbacksMock(),
    certificacoes: criarCertificacoesMock(),
    contratos: criarContratosMock(),
    canvasQuadros: criarCanvasQuadrosMock(),
  }
}

function loadInitial(): StoredData {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<StoredData>
      if (CHAVES_ESPERADAS.every(chave => parsed[chave] !== undefined)) {
        // Mescla com os defaults atuais para preencher campos novos adicionados
        // ao Professor desde a última vez que este navegador salvou dados —
        // evita que uma entidade salva "antiga" fique sem propriedades novas.
        return { ...gerarDadosIniciais(), ...parsed, professor: { ...criarProfessorMock(), ...parsed.professor } }
      }
    } catch {
      // segue para gerar dados novos
    }
  }
  return gerarDadosIniciais()
}

interface RelatorioInput {
  descricao: string
  conteudosEstudados: string
  comportamento: string
  recomendacoes: string
  ferramentasUtilizadas: string[]
  ocorrencias: string
  fotoAula?: string
  notaAula: number
  anexoLinks: string[]
  anexoArquivos: string[]
}

interface NovoMaterialInput {
  titulo: string
  descricao: string
  materia: string
  valor: number
  arquivoNome?: string
}

interface NovoCanvasInput {
  titulo: string
  descricao: string
}

const CANVAS_CAPA_CORES = ['#3d8fc9', '#22a578', '#b8770f', '#7c6fe0', '#5291bb', '#2abd8d']

interface ProfessorDataContextValue {
  professor: Professor
  aulas: Aula[]
  pagamentos: Pagamento[]
  materiais: MaterialDidatico[]
  avisos: Aviso[]
  clientes: Cliente[]
  feedbacks: Feedback[]
  certificacoes: Certificacao[]
  contratos: Contrato[]
  canvasQuadros: CanvasQuadro[]
  updateProfessor: (patch: Partial<Professor>) => void
  confirmarAula: (id: string) => void
  salvarRelatorio: (id: string, dados: RelatorioInput) => void
  adicionarMaterial: (dados: NovoMaterialInput) => void
  marcarAvisoComoLido: (id: string) => void
  assinarContrato: (id: string) => void
  adicionarCanvasQuadro: (dados: NovoCanvasInput) => string
  removerCanvasQuadro: (quadroId: string) => void
  adicionarPostIt: (quadroId: string, colunaId: CanvasColunaId, cor: string) => void
  atualizarPostIt: (quadroId: string, postItId: string, patch: Partial<CanvasQuadro['postIts'][number]>) => void
  moverPostIt: (quadroId: string, postItId: string, novaColunaId: CanvasColunaId) => void
  removerPostIt: (quadroId: string, postItId: string) => void
}

const ProfessorDataContext = createContext<ProfessorDataContextValue | null>(null)

export const ProfessorDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StoredData>(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateProfessor = useCallback((patch: Partial<Professor>) => {
    setData(prev => ({ ...prev, professor: { ...prev.professor, ...patch } }))
  }, [])

  const confirmarAula = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      aulas: prev.aulas.map(a =>
        a.id === id ? { ...a, confirmacaoProfessor: true, statusAula: 'Concluída' } : a,
      ),
    }))
  }, [])

  const salvarRelatorio = useCallback((id: string, dados: RelatorioInput) => {
    setData(prev => ({
      ...prev,
      aulas: prev.aulas.map(a =>
        a.id === id
          ? {
              ...a,
              descricao: dados.descricao,
              conteudosEstudados: dados.conteudosEstudados,
              comportamento: dados.comportamento,
              recomendacoes: dados.recomendacoes,
              ferramentasUtilizadas: dados.ferramentasUtilizadas,
              ocorrencias: dados.ocorrencias,
              fotoAula: dados.fotoAula,
              notaAula: dados.notaAula,
              anexoLinks: dados.anexoLinks,
              anexoArquivos: dados.anexoArquivos,
              relatorioEnviadoEm: new Date().toISOString(),
            }
          : a,
      ),
    }))
  }, [])

  const adicionarMaterial = useCallback((dados: NovoMaterialInput) => {
    setData(prev => ({
      ...prev,
      materiais: [
        {
          id: `material-${Date.now()}`,
          titulo: dados.titulo,
          descricao: dados.descricao,
          materia: dados.materia,
          valor: dados.valor,
          arquivoNome: dados.arquivoNome,
          autor: prev.professor.nome,
          capaCor: ['#3d8fc9', '#22a578', '#b8770f', '#7c6fe0'][prev.materiais.length % 4],
          capaVariante: prev.materiais.length % 6,
          criadoEm: new Date().toISOString().slice(0, 10),
        },
        ...prev.materiais,
      ],
    }))
  }, [])

  const marcarAvisoComoLido = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      avisos: prev.avisos.map(a => a.id === id ? { ...a, lido: true } : a),
    }))
  }, [])

  const assinarContrato = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      contratos: prev.contratos.map(c => c.id === id ? { ...c, dataAssinatura: new Date().toISOString().slice(0, 10) } : c),
    }))
  }, [])

  const adicionarCanvasQuadro = useCallback((dados: NovoCanvasInput) => {
    const id = `canvas-${Date.now()}`
    setData(prev => ({
      ...prev,
      canvasQuadros: [
        {
          id,
          titulo: dados.titulo,
          descricao: dados.descricao,
          capaCor: CANVAS_CAPA_CORES[prev.canvasQuadros.length % CANVAS_CAPA_CORES.length],
          capaVariante: prev.canvasQuadros.length % 6,
          criadoEm: new Date().toISOString().slice(0, 10),
          postIts: [],
        },
        ...prev.canvasQuadros,
      ],
    }))
    return id
  }, [])

  const removerCanvasQuadro = useCallback((quadroId: string) => {
    setData(prev => ({ ...prev, canvasQuadros: prev.canvasQuadros.filter(q => q.id !== quadroId) }))
  }, [])

  const adicionarPostIt = useCallback((quadroId: string, colunaId: CanvasColunaId, cor: string) => {
    setData(prev => ({
      ...prev,
      canvasQuadros: prev.canvasQuadros.map(q => q.id !== quadroId ? q : {
        ...q,
        postIts: [
          ...q.postIts,
          { id: `postit-${Date.now()}`, colunaId, texto: '', cor, criadoEm: new Date().toISOString().slice(0, 10) },
        ],
      }),
    }))
  }, [])

  const atualizarPostIt = useCallback((quadroId: string, postItId: string, patch: Partial<CanvasQuadro['postIts'][number]>) => {
    setData(prev => ({
      ...prev,
      canvasQuadros: prev.canvasQuadros.map(q => q.id !== quadroId ? q : {
        ...q,
        postIts: q.postIts.map(p => p.id === postItId ? { ...p, ...patch } : p),
      }),
    }))
  }, [])

  const moverPostIt = useCallback((quadroId: string, postItId: string, novaColunaId: CanvasColunaId) => {
    setData(prev => ({
      ...prev,
      canvasQuadros: prev.canvasQuadros.map(q => q.id !== quadroId ? q : {
        ...q,
        postIts: q.postIts.map(p => p.id === postItId ? { ...p, colunaId: novaColunaId } : p),
      }),
    }))
  }, [])

  const removerPostIt = useCallback((quadroId: string, postItId: string) => {
    setData(prev => ({
      ...prev,
      canvasQuadros: prev.canvasQuadros.map(q => q.id !== quadroId ? q : {
        ...q,
        postIts: q.postIts.filter(p => p.id !== postItId),
      }),
    }))
  }, [])

  return (
    <ProfessorDataContext.Provider
      value={{
        professor: data.professor, aulas: data.aulas, pagamentos: data.pagamentos, materiais: data.materiais, avisos: data.avisos,
        clientes: data.clientes, feedbacks: data.feedbacks, certificacoes: data.certificacoes, contratos: data.contratos,
        canvasQuadros: data.canvasQuadros,
        updateProfessor, confirmarAula, salvarRelatorio, adicionarMaterial, marcarAvisoComoLido, assinarContrato,
        adicionarCanvasQuadro, removerCanvasQuadro, adicionarPostIt, atualizarPostIt, moverPostIt, removerPostIt,
      }}
    >
      {children}
    </ProfessorDataContext.Provider>
  )
}

export function useProfessorData(): ProfessorDataContextValue {
  const ctx = useContext(ProfessorDataContext)
  if (!ctx) throw new Error('useProfessorData deve ser usado dentro de <ProfessorDataProvider>')
  return ctx
}
