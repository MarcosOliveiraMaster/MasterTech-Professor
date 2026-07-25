export interface NeurodivergenciaDetalhe {
  descricao: string
  certificados: string[]
}

export interface Professor {
  nome: string
  email: string
  cpf: string
  contato: string
  dataNascimento: string
  redeSocial: string
  cep: string
  endereco: string
  complemento: string
  cidadeUF: string
  disponibilidade: Record<DiaSemana, { manha: boolean; tarde: boolean }>
  disciplinas: string[]
  bairros: string[]
  nivel: NivelAcademico
  curso: string
  expAulas: 'sim' | 'não'
  descricaoExpAulas: string
  expNeuro: 'sim' | 'não'
  descricaoExpNeuro: string
  expTdics: 'sim' | 'não'
  descricaoTdics: string
  pix: string
  turmasAtendidas: string[]
  neurodivergencias: string[]
  neurodivergenciaOutro: string
  neurodivergenciaDetalhes: Record<string, NeurodivergenciaDetalhe>
  lat: number
  lng: number
  capaUrl?: string
  fotoUrl?: string
  sobre: string
  diferenciais: string
  habilidades: string
  qualificacoes: string
  personalidade: string[]
  estiloAula: string[]
}

export interface Feedback {
  id: string
  cliente: string
  nota: number
  comentario: string
  data: string
}

export type CategoriaMaterialCliente = 'imagens-livro' | 'pdf-assuntos' | 'pdf-revisoes' | 'outro'

export interface MaterialCliente {
  id: string
  categoria: CategoriaMaterialCliente
  titulo: string
  arquivoNome: string
}

export interface NotaMensal {
  mes: string
  nota: number
}

export interface Cliente {
  id: string
  nome: string
  nomeEstudante: string
  nomeEscola: string
  informacoesAtendimento: string
  recomendacoes: string
  perfilEstudante: string[]
  atendimentoEspecial: string[]
  materiais: MaterialCliente[]
  notasEvolucao: NotaMensal[]
  endereco: string
  bairro: string
  pontoReferencia: string
  lat: number
  lng: number
}

export type DiaSemana = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab'

export type NivelAcademico = 'Graduando' | 'Graduado' | 'Mestrando' | 'Mestre' | 'Bacharelado' | 'Técnico'

export type StatusAula =
  | 'Agendada'
  | 'Confirmada'
  | 'Em andamento'
  | 'Concluída'
  | 'Reposição'
  | 'Cancelada'

export const FERRAMENTAS_AULA = [
  'Material impresso', 'Slide', 'Jogos físicos', 'Plataformas online', 'Jogos digitais',
] as const

export interface Aula {
  id: string
  data: string // 'YYYY-MM-DD'
  horario: string
  duracao: string // '1h30'
  duracaoMin: number
  materia: string
  nomeCliente: string
  estudante: string
  statusAula: StatusAula
  confirmacaoProfessor: boolean
  descricao?: string
  conteudosEstudados?: string
  comportamento?: string
  recomendacoes?: string
  ferramentasUtilizadas?: string[]
  ocorrencias?: string
  fotoAula?: string
  notaAula?: number
  relatorioEnviadoEm?: string
  anexoLinks?: string[]
  anexoArquivos?: string[]
  valorAula: number
}

export interface MaterialDidatico {
  id: string
  titulo: string
  descricao: string
  materia: string
  valor: number
  autor: string
  capaCor: string
  capaVariante: number
  arquivoNome?: string
  criadoEm: string
}

export type TipoAviso = 'info' | 'urgente' | 'evento'

export interface Aviso {
  id: string
  titulo: string
  corpo: string
  data: string
  tipo: TipoAviso
  lido: boolean
}

export interface Certificacao {
  id: string
  titulo: string
  descricao: string
  icone: string
  conquistadoEm: string | null
}

export interface Contrato {
  id: string
  titulo: string
  dataEnvio: string
  dataAssinatura: string | null
  conteudo: string
}

export interface Pagamento {
  id: string
  data: string // 'YYYY-MM-DD'
  tipo: 'entrada' | 'saida'
  descricao: string
  valor: number
}
