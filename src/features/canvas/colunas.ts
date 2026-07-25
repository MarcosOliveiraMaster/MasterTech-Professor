import type { IconType } from 'react-icons'
import {
  FiAlertTriangle, FiAward, FiBookOpen, FiCheckSquare, FiClock, FiEdit3, FiMonitor, FiTarget, FiUser,
} from 'react-icons/fi'
import type { CanvasColunaId } from '../../lib/types'

export interface CanvasColunaDef {
  id: CanvasColunaId
  label: string
  icon: IconType
}

export const CANVAS_GRUPO_PLANEJAMENTO: CanvasColunaDef[] = [
  { id: 'duracao-aula', label: 'Duração da aula', icon: FiClock },
  { id: 'materiais-estudo', label: 'Materiais de estudo', icon: FiBookOpen },
  { id: 'assunto-estudado', label: 'Assunto estudado', icon: FiEdit3 },
  { id: 'competencias', label: 'Competências', icon: FiAward },
  { id: 'metodos-avaliacao', label: 'Métodos de avaliação', icon: FiCheckSquare },
]

export const CANVAS_GRUPO_ALUNO: CanvasColunaDef[] = [
  { id: 'dificuldades-encontradas', label: 'Dificuldades encontradas', icon: FiAlertTriangle },
  { id: 'tipo-aluno', label: 'Tipo de aluno', icon: FiUser },
  { id: 'estrategias-pedagogicas', label: 'Estratégias pedagógicas', icon: FiTarget },
  { id: 'tdics', label: 'TDICs', icon: FiMonitor },
]

export const CANVAS_COLUNAS: CanvasColunaDef[] = [...CANVAS_GRUPO_PLANEJAMENTO, ...CANVAS_GRUPO_ALUNO]

export const POSTIT_CORES = ['#fff59d', '#a5d8ff', '#b2f2bb', '#ffc9c9', '#d0bfff', '#ffd8a8']
