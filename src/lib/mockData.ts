import type { Aula, Aviso, Certificacao, Cliente, Contrato, Feedback, MaterialCliente, MaterialDidatico, Pagamento, Professor } from './types'
import { addDays, toISO } from './dateUtils'
import { MESES } from './constants'

export function criarProfessorMock(): Professor {
  return {
    nome: 'Camila Rocha Andrade',
    email: 'camila.andrade@masteredutech.com',
    cpf: '123.456.789-00',
    contato: '(82) 99876-5432',
    dataNascimento: '14/03/1992',
    redeSocial: '@camila.ensina',
    cep: '57035-180',
    endereco: 'Rua dos Coqueiros, 245',
    complemento: 'Apto 302, Bloco B',
    cidadeUF: 'Maceió/AL',
    disponibilidade: {
      seg: { manha: true, tarde: true },
      ter: { manha: false, tarde: true },
      qua: { manha: true, tarde: true },
      qui: { manha: false, tarde: true },
      sex: { manha: true, tarde: false },
      sab: { manha: true, tarde: false },
    },
    disciplinas: ['Matemática', 'Física', 'Química'],
    bairros: [
      'Farol, Pintanguinha, Pinheiro, Feitosa e Gruta de Lourdes',
      'Ponta Verde, Pajuçara, Jatiúca, Cruz das almas e Mangabeiras',
    ],
    nivel: 'Mestrando',
    curso: 'Licenciatura em Matemática — UFAL',
    expAulas: 'sim',
    descricaoExpAulas: 'Mais de 5 anos de experiência com aulas particulares de exatas para ensino médio e pré-vestibular.',
    expNeuro: 'sim',
    descricaoExpNeuro: 'Já acompanhei estudantes com TDAH e dislexia, adaptando o ritmo e o material das aulas.',
    expTdics: 'não',
    descricaoTdics: '',
    pix: 'camila.andrade@masteredutech.com',
    turmasAtendidas: ['7º ano — Ens. Fundamental', '8º ano — Ens. Fundamental', '9º ano — Ens. Fundamental', '1º ano — Ens. Médio', '2º ano — Ens. Médio', '3º ano — Ens. Médio'],
    neurodivergencias: ['tdah', 'dislexia'],
    neurodivergenciaOutro: '',
    neurodivergenciaDetalhes: {
      tdah: {
        descricao: 'Já apliquei estratégias de ensino adaptadas para estudantes com TDAH, com pausas curtas e apoio de materiais visuais.',
        certificados: ['certificado-tdah-educacao-inclusiva.pdf'],
      },
      dislexia: {
        descricao: 'Tenho experiência com estudantes com dislexia, usando fontes ampliadas e leitura em voz alta do conteúdo.',
        certificados: ['certificado-dislexia-alfabetizacao.pdf'],
      },
    },
    lat: -9.6427,
    lng: -35.7184,
    sobre: 'Professora de exatas há mais de 5 anos, apaixonada por ajudar estudantes a perderem o medo de matemática e física através de exemplos práticos e muita paciência.',
    diferenciais: 'Aulas com metodologia ativa, materiais autorais e acompanhamento próximo da evolução de cada estudante, com relatórios detalhados para a família.',
    habilidades: 'Didática para exatas, adaptação para neurodivergentes, preparação para vestibular e ENEM, uso de tecnologias digitais em sala.',
    qualificacoes: 'Licenciada em Matemática pela UFAL · Mestranda em Educação Matemática · Certificação Master em Educação Inclusiva.',
    personalidade: ['animado', 'paciente', 'dinamico'],
    estiloAula: ['adaptativo', 'colaborativo'],
  }
}

export function criarFeedbacksMock(): Feedback[] {
  const hoje = new Date()
  return [
    { id: 'fb-1', cliente: 'Fernanda Lima Costa', nota: 5, comentario: 'A Camila transformou a relação do meu filho com a matemática. Aulas muito bem preparadas!', data: toISO(addDays(hoje, -12)) },
    { id: 'fb-2', cliente: 'Ricardo Souza Melo', nota: 5, comentario: 'Pontual, atenciosa e muito didática. Recomendo demais.', data: toISO(addDays(hoje, -25)) },
    { id: 'fb-3', cliente: 'Juliana Alves Nunes', nota: 4, comentario: 'Ótimas aulas, só gostaríamos de mais materiais de apoio entre os encontros.', data: toISO(addDays(hoje, -40)) },
    { id: 'fb-4', cliente: 'Patrícia Gomes Dias', nota: 5, comentario: 'Melhor professora particular que já contratamos. Meu filho evoluiu muito rápido.', data: toISO(addDays(hoje, -55)) },
  ]
}

const MATERIAS_PROFESSOR = ['Matemática', 'Física', 'Química', 'Redação']
const HORARIOS = ['08:00', '09:30', '14:00', '15:30', '17:00', '19:00']
const DURACOES: { label: string; min: number }[] = [
  { label: '1h', min: 60 },
  { label: '1h30', min: 90 },
  { label: '2h', min: 120 },
]

/** Bairros, coordenadas e dados de atendimento (fictícios) usados nas fichas de clientes mockadas. */
const CLIENTES_ENDERECOS = [
  {
    cliente: 'Fernanda Lima Costa', estudante: 'Pedro Lima Costa', bairro: 'Ponta Verde',
    endereco: 'Av. Álvaro Otacílio, 1220', referencia: 'Próximo ao Shopping Pátio Maceió', lat: -9.6664, lng: -35.7096,
    escola: 'Colégio Motivo', atendimento: 'Pedro não possui diagnóstico formal, mas se distrai facilmente perto de janelas. Os pais pedem que as explicações sejam bem visuais.',
    recomendacoes: 'Por favor, evitem passar muito dever de casa às sextas — ele tem natação à tarde.',
    perfilEstudante: ['agitado', 'criativo'], atendimentoEspecial: [] as string[],
  },
  {
    cliente: 'Ricardo Souza Melo', estudante: 'Beatriz Souza Melo', bairro: 'Jatiúca',
    endereco: 'Rua Prof. Fausto Vieira, 340', referencia: 'Perto do Maceió Shopping', lat: -9.6549, lng: -35.7016,
    escola: 'Colégio Marista', atendimento: 'Beatriz tem TDAH diagnosticado e faz acompanhamento com neuropediatra. Aprende melhor com pausas curtas a cada 20 minutos.',
    recomendacoes: 'Gostaríamos de relatórios semanais sobre o progresso dela.',
    perfilEstudante: ['organizado', 'antenado'], atendimentoEspecial: ['tdah'],
  },
  {
    cliente: 'Juliana Alves Nunes', estudante: 'Gustavo Alves Nunes', bairro: 'Pajuçara',
    endereco: 'Rua Eng. Mário de Gusmão, 88', referencia: 'A 2 quadras da orla de Pajuçara', lat: -9.6712, lng: -35.7178,
    escola: 'Escola CENE', atendimento: 'Gustavo é tranquilo e prefere aprender no seu próprio ritmo, sem pressão de tempo.',
    recomendacoes: 'Ele fica tímido no início da aula — um bate-papo antes ajuda bastante.',
    perfilEstudante: ['quieto', 'imaginativo'], atendimentoEspecial: [],
  },
  {
    cliente: 'Marcelo Santos Braga', estudante: 'Larissa Santos Braga', bairro: 'Farol',
    endereco: 'Rua Barão de Anadia, 512', referencia: 'Em frente à Praça Sinimbu', lat: -9.6427, lng: -35.7184,
    escola: 'Colégio Contato', atendimento: 'Larissa tem dislexia e usa fonte ampliada nos materiais. Aprende melhor ouvindo o conteúdo em voz alta.',
    recomendacoes: 'Por favor, evitem textos muito longos sem ilustração.',
    perfilEstudante: ['criativo', 'desinteressado'], atendimentoEspecial: ['dislexia'],
  },
  {
    cliente: 'Patrícia Gomes Dias', estudante: 'Rafael Gomes Dias', bairro: 'Cruz das Almas',
    endereco: 'Av. Menino Marcelo, 3400', referencia: 'Próximo ao Parque da Cidade', lat: -9.5865, lng: -35.7647,
    escola: 'Colégio Santa Mônica', atendimento: 'Rafael não tem nenhum diagnóstico. É bastante independente e gosta de desafios.',
    recomendacoes: 'Ele se motiva com pequenas competições e recompensas simbólicas.',
    perfilEstudante: ['organizado', 'antenado'], atendimentoEspecial: [],
  },
  {
    cliente: 'André Ferreira Lyra', estudante: 'Sophia Ferreira Lyra', bairro: 'Jacarecica',
    endereco: 'Rua Waldemar Falcão, 210', referencia: 'Perto da orla de Jacarecica', lat: -9.5758, lng: -35.7815,
    escola: 'Colégio Piaget', atendimento: 'Sophia está em investigação para TEA. É bem organizada e prefere rotina fixa nas aulas.',
    recomendacoes: 'Mantenha sempre a mesma estrutura de aula — mudanças repentinas a deixam ansiosa.',
    perfilEstudante: ['organizado', 'quieto'], atendimentoEspecial: ['tea'],
  },
]

const CLIENTES = CLIENTES_ENDERECOS.map(c => ({ cliente: c.cliente, estudante: c.estudante }))
const FERRAMENTAS_POOL = ['Material impresso', 'Slide', 'Jogos físicos', 'Plataformas online', 'Jogos digitais']

const VALOR_HORA = 90

function valorPara(duracaoMin: number): number {
  return Math.round((duracaoMin / 60) * VALOR_HORA)
}

/** Distribuição pseudo-realista de notas (a maioria 4-5, raras 2-3, nunca 1). */
function notaPara(indice: number): number {
  const padrao = [5, 5, 4, 5, 4, 3, 5, 4, 5, 4]
  return padrao[indice % padrao.length]
}

export function criarAulasMock(): Aula[] {
  const hoje = new Date()
  const aulas: Aula[] = []
  let idx = 0

  // Últimos 11 meses + mês atual + próximo mês, para alimentar Financeiro/Análise com histórico anual.
  for (let mesOffset = -11; mesOffset <= 1; mesOffset++) {
    const anoMes = new Date(hoje.getFullYear(), hoje.getMonth() + mesOffset, 1)
    const ano = anoMes.getFullYear()
    const mes = anoMes.getMonth()
    const diasNoMes = new Date(ano, mes + 1, 0).getDate()
    const qtdAulas = 6 + (Math.abs(mesOffset) % 4) // 6 a 9 aulas/mês

    for (let i = 0; i < qtdAulas; i++) {
      const dia = Math.min(diasNoMes, 2 + ((i * 5 + Math.abs(mesOffset) * 3) % (diasNoMes - 2)))
      const dataAula = new Date(ano, mes, dia)
      const dataISO = toISO(dataAula)
      const ehFutura = dataAula > hoje
      const ehHoje = toISO(dataAula) === toISO(hoje)

      const cliente = CLIENTES[idx % CLIENTES.length]
      const materia = MATERIAS_PROFESSOR[idx % MATERIAS_PROFESSOR.length]
      const duracao = DURACOES[idx % DURACOES.length]

      let status: Aula['statusAula']
      let confirmado = false
      let extras: Partial<Aula> = {}

      if (ehFutura) {
        status = 'Agendada'
      } else if (ehHoje) {
        status = 'Confirmada'
      } else {
        const cancelada = idx % 7 === 5
        const pendente = mesOffset === 0 && dia >= hoje.getDate() - 1 && dia < hoje.getDate()
        if (cancelada) {
          status = 'Cancelada'
        } else if (pendente) {
          status = 'Confirmada'
        } else {
          status = 'Concluída'
          confirmado = true
          extras = {
            descricao: `Trabalhamos os principais tópicos de ${materia.toLowerCase()} previstos para a semana, com exercícios de fixação.`,
            conteudosEstudados: `Revisão de conteúdo de ${materia.toLowerCase()} + lista de exercícios direcionada.`,
            comportamento: 'Estudante participativo e atento durante toda a aula.',
            recomendacoes: 'Reforçar exercícios extras sobre o conteúdo em casa antes da próxima aula.',
            ferramentasUtilizadas: [FERRAMENTAS_POOL[idx % FERRAMENTAS_POOL.length], FERRAMENTAS_POOL[(idx + 1) % FERRAMENTAS_POOL.length]],
            notaAula: notaPara(idx),
            relatorioEnviadoEm: dataISO,
            ...(idx % 4 === 0
              ? {
                  anexoLinks: ['https://exemplo.com/videoaula-complementar'],
                  anexoArquivos: [`lista-exercicios-${materia.toLowerCase()}.pdf`],
                }
              : {}),
          }
        }
      }

      aulas.push({
        id: `aula-${idx}`,
        data: dataISO,
        horario: HORARIOS[idx % HORARIOS.length],
        duracao: duracao.label,
        duracaoMin: duracao.min,
        materia,
        nomeCliente: cliente.cliente,
        estudante: cliente.estudante,
        statusAula: status,
        confirmacaoProfessor: confirmado,
        valorAula: valorPara(duracao.min),
        ...extras,
      })
      idx++
    }
  }

  return aulas
}

const CAPA_CORES = ['#3d8fc9', '#22a578', '#b8770f', '#7c6fe0', '#5291bb', '#2abd8d']

export function criarMateriaisMock(): MaterialDidatico[] {
  const hoje = new Date()
  const itens: { titulo: string; descricao: string; materia: string; valor: number; autor: string }[] = [
    { titulo: 'Caderno de Exercícios — Equações do 2º Grau', descricao: 'Lista com 40 exercícios progressivos, gabarito comentado e 3 simulados no padrão ENEM.', materia: 'Matemática', valor: 18, autor: 'Camila Rocha Andrade' },
    { titulo: 'Slides — Leis de Newton na Prática', descricao: 'Apresentação com animações, exemplos do cotidiano e questões de vestibular resolvidas passo a passo.', materia: 'Física', valor: 22, autor: 'Ricardo Falcão' },
    { titulo: 'Jogo Didático — Tabela Periódica em Cartas', descricao: 'Material para imprimir e recortar, com regras de 3 jogos diferentes para fixar propriedades dos elementos.', materia: 'Química', valor: 15, autor: 'Beatriz Nogueira' },
    { titulo: 'Guia de Redação Nota 1000', descricao: 'Estrutura dissertativo-argumentativa, banco de repertórios socioculturais e 10 propostas comentadas.', materia: 'Redação', valor: 25, autor: 'Camila Rocha Andrade' },
    { titulo: 'Apostila — Interpretação de Texto', descricao: 'Técnicas de leitura ativa, questões comentadas de vestibulares recentes e dicas para provas cronometradas.', materia: 'Português', valor: 20, autor: 'Helena Vieira' },
    { titulo: 'Atlas Interativo — Geografia do Brasil', descricao: 'Mapas mudos para atividades, infográficos de relevo/clima e roteiro de aula pronto para aplicar.', materia: 'Geografia', valor: 17, autor: 'Fábio Cardoso' },
  ]
  return itens.map((item, i) => ({
    id: `material-${i}`,
    ...item,
    capaCor: CAPA_CORES[i % CAPA_CORES.length],
    capaVariante: i % 6,
    criadoEm: toISO(new Date(hoje.getFullYear(), hoje.getMonth(), Math.max(1, hoje.getDate() - i * 4))),
  }))
}

const CATEGORIAS_MATERIAL: MaterialCliente['categoria'][] = ['imagens-livro', 'pdf-assuntos', 'pdf-revisoes']
const TITULOS_MATERIAL: Record<MaterialCliente['categoria'], string> = {
  'imagens-livro': 'Fotos das páginas do livro didático',
  'pdf-assuntos': 'PDF com os assuntos do bimestre',
  'pdf-revisoes': 'Revisão enviada pela escola',
  outro: 'Outro material',
}

function gerarMateriaisCliente(indice: number): MaterialCliente[] {
  const qtd = 2 + (indice % 3)
  return Array.from({ length: qtd }, (_, i) => {
    const categoria = CATEGORIAS_MATERIAL[(indice + i) % CATEGORIAS_MATERIAL.length]
    return {
      id: `material-cliente-${indice}-${i}`,
      categoria,
      titulo: TITULOS_MATERIAL[categoria],
      arquivoNome: `${categoria}-${i + 1}.pdf`,
    }
  })
}

function gerarNotasEvolucao(indice: number): { mes: string; nota: number }[] {
  const hoje = new Date()
  const base = 6.5 + (indice % 3) * 0.6
  return Array.from({ length: 6 }, (_, i) => {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() - (5 - i), 1)
    const variacao = Math.sin(i + indice) * 0.8
    const nota = Math.max(4, Math.min(10, base + variacao + i * 0.15))
    return { mes: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}`, nota: Math.round(nota * 10) / 10 }
  })
}

export function criarClientesMock(): Cliente[] {
  return CLIENTES_ENDERECOS.map((c, i) => ({
    id: `cliente-${i}`,
    nome: c.cliente,
    nomeEstudante: c.estudante,
    nomeEscola: c.escola,
    informacoesAtendimento: c.atendimento,
    recomendacoes: c.recomendacoes,
    perfilEstudante: c.perfilEstudante,
    atendimentoEspecial: c.atendimentoEspecial,
    materiais: gerarMateriaisCliente(i),
    notasEvolucao: gerarNotasEvolucao(i),
    endereco: `${c.endereco} — ${c.bairro}, Maceió/AL`,
    bairro: c.bairro,
    pontoReferencia: c.referencia,
    lat: c.lat,
    lng: c.lng,
  }))
}

export function criarCertificacoesMock(): Certificacao[] {
  const hoje = new Date()
  const itens: { titulo: string; descricao: string; icone: string; conquistadoOffsetDias: number | null }[] = [
    { titulo: 'Atendimento a Aluno Atípico', descricao: 'Reconhecimento por excelência no atendimento a estudantes neurodivergentes e com necessidades específicas de aprendizagem.', icone: 'heart', conquistadoOffsetDias: -40 },
    { titulo: 'Descrição em Destaque', descricao: 'Concedido a professores com uma apresentação pessoal (Minha Área) que se destaca pela clareza e qualidade do conteúdo.', icone: 'edit', conquistadoOffsetDias: null },
    { titulo: 'Perfil Completo', descricao: 'Todos os campos do perfil profissional foram preenchidos com informações completas e atualizadas.', icone: 'check', conquistadoOffsetDias: -90 },
    { titulo: 'Alta Disponibilidade', descricao: 'Professor com ampla disponibilidade de horários ao longo da semana, facilitando o encaixe de novos alunos.', icone: 'clock', conquistadoOffsetDias: null },
    { titulo: 'Alto Compromisso', descricao: 'Menor índice de reagendamento ou cancelamento entre os professores da rede.', icone: 'shield', conquistadoOffsetDias: -15 },
    { titulo: 'Selo Aprendizado', descricao: 'Maior presença em workshops e capacitações oferecidas pela Central Master.', icone: 'book', conquistadoOffsetDias: null },
    { titulo: 'Diferencial Empreendedor', descricao: 'Professor que compartilha materiais didáticos próprios e constrói uma marca pessoal de destaque na plataforma.', icone: 'trending', conquistadoOffsetDias: null },
    { titulo: 'Nota Master', descricao: 'Média de avaliação dos clientes acima de 4.8 estrelas nos últimos 6 meses.', icone: 'star', conquistadoOffsetDias: -8 },
    { titulo: 'Pontualidade Exemplar', descricao: 'Nenhum registro de atraso nas aulas dos últimos 3 meses.', icone: 'target', conquistadoOffsetDias: -22 },
    { titulo: 'Mentor Master', descricao: 'Reconhecido por orientar novos professores que estão iniciando na rede Master Educação.', icone: 'users', conquistadoOffsetDias: null },
  ]
  return itens.map((item, i) => ({
    id: `certificacao-${i}`,
    titulo: item.titulo,
    descricao: item.descricao,
    icone: item.icone,
    conquistadoEm: item.conquistadoOffsetDias !== null ? toISO(addDays(hoje, item.conquistadoOffsetDias)) : null,
  }))
}

export function criarAvisosMock(): Aviso[] {
  const hoje = new Date()
  const itens: { titulo: string; corpo: string; tipo: Aviso['tipo']; offset: number; lido: boolean }[] = [
    { titulo: 'Pagamento do mês liberado', corpo: 'O pagamento referente às aulas concluídas até o dia 25 já foi processado e está disponível na aba Financeiro.', tipo: 'info', offset: -1, lido: false },
    { titulo: 'Workshop: Estratégias para alunos com TDAH', corpo: 'Inscrições abertas para o workshop online do dia 30, com certificado de participação e emissão de selo de capacitação.', tipo: 'evento', offset: -3, lido: false },
    { titulo: 'Atualização na política de reagendamento', corpo: 'A partir deste mês, reagendamentos com menos de 12h de antecedência passam a impactar o indicador de compromisso.', tipo: 'urgente', offset: -6, lido: true },
    { titulo: 'Nova funcionalidade: Materiais Didáticos', corpo: 'Agora você pode compartilhar e vender seus próprios materiais didáticos direto pela plataforma.', tipo: 'info', offset: -10, lido: true },
    { titulo: 'Manutenção programada', corpo: 'A plataforma ficará indisponível por 30 minutos na madrugada de domingo para manutenção programada.', tipo: 'urgente', offset: -14, lido: true },
    { titulo: 'Pesquisa de satisfação Master Educação', corpo: 'Participe da pesquisa semestral e ajude a melhorar a experiência de todos os professores da rede.', tipo: 'evento', offset: -20, lido: true },
  ]
  return itens.map((item, i) => ({
    id: `aviso-${i}`,
    titulo: item.titulo,
    corpo: item.corpo,
    tipo: item.tipo,
    lido: item.lido,
    data: toISO(addDays(hoje, item.offset)),
  }))
}

export function criarContratosMock(): Contrato[] {
  const hoje = new Date()
  const itens: { titulo: string; offsetEnvio: number; offsetAssinatura: number | null; conteudo: string }[] = [
    {
      titulo: 'Contrato de Prestação de Serviços — Renovação Anual',
      offsetEnvio: -60, offsetAssinatura: -58,
      conteudo: 'Contrato de prestação de serviços educacionais entre Master Educação LTDA e o(a) professor(a), com vigência de 12 meses, condições de pagamento e política de cancelamento conforme cláusulas padrão da rede.',
    },
    {
      titulo: 'Termo de Confidencialidade e Uso de Dados',
      offsetEnvio: -60, offsetAssinatura: -58,
      conteudo: 'Termo que estabelece o compromisso de confidencialidade sobre dados de clientes e estudantes acessados durante o atendimento pela plataforma Master Educação.',
    },
    {
      titulo: 'Aditivo — Programa de Materiais Didáticos',
      offsetEnvio: -14, offsetAssinatura: null,
      conteudo: 'Aditivo contratual referente à comercialização de materiais didáticos autorais na plataforma, incluindo regras de repasse e propriedade intelectual do conteúdo enviado.',
    },
    {
      titulo: 'Termo de Atualização — Política de Reagendamento',
      offsetEnvio: -6, offsetAssinatura: null,
      conteudo: 'Termo de ciência sobre a nova política de reagendamento e cancelamento de aulas, com impacto no indicador de compromisso do professor.',
    },
  ]
  return itens.map((item, i) => ({
    id: `contrato-${i}`,
    titulo: item.titulo,
    dataEnvio: toISO(addDays(hoje, item.offsetEnvio)),
    dataAssinatura: item.offsetAssinatura !== null ? toISO(addDays(hoje, item.offsetAssinatura)) : null,
    conteudo: item.conteudo,
  }))
}

export function criarPagamentosMock(): Pagamento[] {
  const hoje = new Date()
  const pagamentos: Pagamento[] = []
  let idx = 0

  for (let mesOffset = -11; mesOffset <= 0; mesOffset++) {
    if (mesOffset % 2 !== 0) continue // um lançamento a cada 2 meses, aprox.
    const anoMes = new Date(hoje.getFullYear(), hoje.getMonth() + mesOffset, 10 + (idx % 10))
    const tipo = idx % 3 === 0 ? 'saida' : 'entrada'
    pagamentos.push({
      id: `pag-${idx}`,
      data: toISO(anoMes),
      tipo,
      descricao: tipo === 'entrada' ? 'Bônus por avaliação positiva' : 'Desconto por reagendamento tardio',
      valor: tipo === 'entrada' ? 50 + (idx % 4) * 15 : 20 + (idx % 3) * 10,
    })
    idx++
  }

  return pagamentos
}
