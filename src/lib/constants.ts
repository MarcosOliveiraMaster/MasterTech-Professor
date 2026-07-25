export const MATERIAS_FILTRO = [
  'Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Redação',
  'Química', 'Física', 'Biologia', 'Sociologia', 'Filosofia', 'Inglês', 'Literatura',
] as const

export const DISCIPLINAS_PERFIL = [
  'Biologia', 'Ciências', 'Física', 'Geografia', 'História', 'Inglês',
  'Literatura', 'Matemática', 'Pedagogia', 'Português', 'Química',
] as const

export const NIVEIS_ACADEMICOS = [
  'Graduando', 'Graduado', 'Mestrando', 'Mestre', 'Bacharelado', 'Técnico',
] as const

export const DIAS_SEMANA: { key: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab'; label: string }[] = [
  { key: 'seg', label: 'Segunda' },
  { key: 'ter', label: 'Terça' },
  { key: 'qua', label: 'Quarta' },
  { key: 'qui', label: 'Quinta' },
  { key: 'sex', label: 'Sexta' },
  { key: 'sab', label: 'Sábado' },
]

export const DIAS_SEMANA_EXTENSO = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
]

export const DIAS_SEMANA_ABREV = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export interface RegiaoBairro {
  regiao: string
  descricao: string
}

export const BAIRROS_PARTE_ALTA: RegiaoBairro[] = [
  { regiao: 'Região 01', descricao: 'Farol, Pintanguinha, Pinheiro, Feitosa e Gruta de Lourdes' },
  { regiao: 'Região 02', descricao: 'Canaã, Santo Amaro, Serraria, Barro duro e Ouro Preto' },
  { regiao: 'Região 03', descricao: 'Jardim Petrópolis, Santa Amélia' },
  { regiao: 'Região 04', descricao: 'Santos Dumont, Graciliano Ramos, Cidade Universitária, Santa Lúcia, Eustáquio Gomes' },
  { regiao: 'Região 05', descricao: 'Benedito Bentes e Antares' },
]

export const BAIRROS_PARTE_BAIXA: RegiaoBairro[] = [
  { regiao: 'Região 01', descricao: 'Ponta Verde, Pajuçara, Jatiúca, Cruz das almas e Mangabeiras' },
  { regiao: 'Região 02', descricao: 'Jacarecica, Guaxuma, Garça Torta, Riacho Doce, Pescaria e Ipioca' },
  { regiao: 'Região 04', descricao: 'Centro, Poço e Feitosa' },
]

export const WHATSAPP_SUPORTE = 'https://wa.me/5582988862575'
export const MANUAL_PROFESSOR_URL = 'https://canva.link/exemplo-manual-professor'

export const TURMAS_FUNDAMENTAL = Array.from({ length: 9 }, (_, i) => `${i + 1}º ano — Ens. Fundamental`)
export const TURMAS_MEDIO = Array.from({ length: 3 }, (_, i) => `${i + 1}º ano — Ens. Médio`)
export const TURMAS_OUTRAS = ['Ensino Superior', 'Concurso Público']

export interface Neurodivergencia {
  id: string
  label: string
}

export const NEURODIVERGENCIAS: Neurodivergencia[] = [
  { id: 'tdah', label: 'TDAH' },
  { id: 'tea', label: 'TEA (Autismo)' },
  { id: 'dislexia', label: 'Dislexia' },
  { id: 'discalculia', label: 'Discalculia' },
  { id: 'disgrafia', label: 'Disgrafia' },
  { id: 'tod', label: 'TOD' },
  { id: 'down', label: 'Síndrome de Down' },
  { id: 'deficiencia-intelectual', label: 'Deficiência Intelectual' },
  { id: 'deficiencia-auditiva', label: 'Deficiência Auditiva' },
  { id: 'deficiencia-visual', label: 'Deficiência Visual' },
  { id: 'altas-habilidades', label: 'Altas Habilidades / Superdotação' },
]

export interface PerfilItem {
  id: string
  label: string
  icone: string
}

export const PERFIL_CRIANCA: PerfilItem[] = [
  { id: 'criativo', label: 'Criativo', icone: 'star' },
  { id: 'quieto', label: 'Quieto', icone: 'moon' },
  { id: 'imaginativo', label: 'Imaginativo', icone: 'cloud' },
  { id: 'agitado', label: 'Agitado', icone: 'zap' },
  { id: 'antenado', label: 'Antenado', icone: 'wifi' },
  { id: 'desinteressado', label: 'Desinteressado', icone: 'meh' },
  { id: 'organizado', label: 'Organizado', icone: 'check-square' },
]

export const PERSONALIDADE_PROFESSOR: PerfilItem[] = [
  { id: 'animado', label: 'Animado', icone: 'zap' },
  { id: 'timido', label: 'Tímido', icone: 'eye-off' },
  { id: 'extrovertido', label: 'Extrovertido', icone: 'users' },
  { id: 'paciente', label: 'Paciente', icone: 'clock' },
  { id: 'dinamico', label: 'Dinâmico', icone: 'activity' },
  { id: 'calmo', label: 'Calmo', icone: 'coffee' },
  { id: 'rigoroso', label: 'Rigoroso', icone: 'shield' },
  { id: 'descontraido', label: 'Descontraído', icone: 'smile' },
]

export const ESTILO_AULA: PerfilItem[] = [
  { id: 'tradicional', label: 'Tradicional', icone: 'book' },
  { id: 'inovador', label: 'Inovador', icone: 'sun' },
  { id: 'adaptativo', label: 'Adaptativo', icone: 'refresh-cw' },
  { id: 'preventivo', label: 'Preventivo', icone: 'alert-circle' },
  { id: 'pratico', label: 'Prático', icone: 'tool' },
  { id: 'teorico', label: 'Teórico', icone: 'book-open' },
  { id: 'colaborativo', label: 'Colaborativo', icone: 'users' },
  { id: 'expositivo', label: 'Expositivo', icone: 'mic' },
]

export const MATERIA_ICONES: Record<string, string> = {
  'Matemática': 'hash', 'Português': 'book-open', 'Ciências': 'droplet',
  'História': 'clock', 'Geografia': 'globe', 'Redação': 'edit-3',
  'Química': 'droplet', 'Física': 'zap', 'Biologia': 'heart',
  'Sociologia': 'users', 'Filosofia': 'feather', 'Inglês': 'message-circle', 'Literatura': 'book',
}

export const DURACOES_PLANEJAMENTO = ['1h', '1h30', '2h', '2h30', '3h']

export const ETAPAS_METODO_MASTER = [
  'Apresentação simplificada do assunto',
  'Atividades simples, conceituais e procedimentais',
  'Apresentação das aplicações, valor histórico e impactos no cotidiano',
  'Atividades aquém das exigidas nos testes',
  'Evolução gradual dos exercícios e conceitos',
]

export const PILARES_METODO_MASTER = [
  'Observação e análise',
  'Desenvolvimento da independência',
  'Lúdico',
  'Gamificação',
]

export interface BairroMapa {
  nome: string
  lat: number
  lng: number
}

export const MACEIO_BAIRROS_MAPA: BairroMapa[] = [
  { nome: 'Farol', lat: -9.6427, lng: -35.7184 },
  { nome: 'Ponta Verde', lat: -9.6664, lng: -35.7096 },
  { nome: 'Jatiúca', lat: -9.6549, lng: -35.7016 },
  { nome: 'Pajuçara', lat: -9.6712, lng: -35.7178 },
  { nome: 'Cruz das Almas', lat: -9.5865, lng: -35.7647 },
  { nome: 'Jacarecica', lat: -9.5758, lng: -35.7815 },
  { nome: 'Mangabeiras', lat: -9.6431, lng: -35.7076 },
  { nome: 'Centro', lat: -9.6658, lng: -35.7353 },
  { nome: 'Poço', lat: -9.6558, lng: -35.7280 },
  { nome: 'Serraria', lat: -9.5978, lng: -35.7492 },
  { nome: 'Santo Amaro', lat: -9.6103, lng: -35.7247 },
  { nome: 'Barro Duro', lat: -9.6167, lng: -35.7280 },
  { nome: 'Gruta de Lourdes', lat: -9.6255, lng: -35.7218 },
  { nome: 'Cidade Universitária', lat: -9.5559, lng: -35.7719 },
  { nome: 'Benedito Bentes', lat: -9.5589, lng: -35.7442 },
  { nome: 'Antares', lat: -9.5701, lng: -35.7370 },
  { nome: 'Jacintinho', lat: -9.6297, lng: -35.7267 },
  { nome: 'Bebedouro', lat: -9.6367, lng: -35.7333 },
  { nome: 'Prado', lat: -9.6489, lng: -35.7429 },
  { nome: 'Tabuleiro do Martins', lat: -9.5891, lng: -35.7315 },
]

export const REGIAO_METROPOLITANA = 'Região Metropolitana'
export const MARECHAL_DEODORO = 'Marechal Deodoro'

export function urlGoogleMaps(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

export interface TdicRecurso {
  nome: string
  descricao: string
}

export const TDICS_REGISTRADOS: TdicRecurso[] = [
  { nome: 'Quizzes gamificados', descricao: 'Plataformas de perguntas em tempo real com ranking, ótimas para revisão de conteúdo de forma lúdica.' },
  { nome: 'Quadros colaborativos', descricao: 'Murais digitais para brainstorm, organização de ideias e atividades em grupo à distância.' },
  { nome: 'Nuvem de palavras interativa', descricao: 'Ferramentas de enquete ao vivo que geram nuvens de palavras a partir das respostas da turma.' },
  { nome: 'Criação de apresentações', descricao: 'Editores com templates prontos para slides, infográficos e materiais visuais de aula.' },
  { nome: 'Jogos de tabuleiro digital', descricao: 'Geradores de jogos (forca, caça-palavras, roleta) prontos em minutos a partir do seu conteúdo.' },
  { nome: 'Sala de aula virtual', descricao: 'Ambientes para organizar turmas, compartilhar materiais e acompanhar tarefas online.' },
]
