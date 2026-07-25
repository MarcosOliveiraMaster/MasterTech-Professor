import React, { useState } from 'react'
import { FiChevronDown, FiCpu, FiZap } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { Dropdown } from '../../components/Dropdown'
import { Icone } from '../../lib/iconRegistry'
import {
  DURACOES_PLANEJAMENTO, ETAPAS_METODO_MASTER, MATERIAS_FILTRO, MATERIA_ICONES,
  NEURODIVERGENCIAS, PERFIL_CRIANCA, PILARES_METODO_MASTER, TDICS_REGISTRADOS,
  TURMAS_FUNDAMENTAL, TURMAS_MEDIO, TURMAS_OUTRAS,
} from '../../lib/constants'

const LIMITE_DESCRICAO = 1000
const TODAS_TURMAS = [...TURMAS_FUNDAMENTAL, ...TURMAS_MEDIO, ...TURMAS_OUTRAS]

function gerarPlanoMock(opts: {
  descricao: string; materia: string; nivel: string; duracao: string
  tiposAluno: string[]; recursos: string[]; etapas: string[]; pilares: string[]
}): string {
  const linhas = [
    `Plano de aula — ${opts.materia || 'Matéria não selecionada'}`,
    `Nível/turma: ${opts.nivel || 'não informado'} · Duração: ${opts.duracao || '1h'}`,
    '',
  ]
  if (opts.descricao.trim()) {
    linhas.push('Contexto informado pelo professor:', opts.descricao.trim(), '')
  }
  linhas.push(
    '1. Abertura: retomada rápida do conteúdo anterior e apresentação do objetivo da aula de hoje.',
    '2. Desenvolvimento: explicação do conceito central com exemplos práticos e conexão com o cotidiano do estudante.',
    '3. Prática guiada: exercícios resolvidos em conjunto, com perguntas de verificação de entendimento.',
    '4. Prática independente: lista curta de exercícios para o estudante resolver com apoio do professor.',
    '5. Fechamento: recapitulação dos pontos-chave e indicação de material complementar.',
  )
  if (opts.tiposAluno.length) {
    linhas.push('', `Adaptações consideradas para: ${opts.tiposAluno.join(', ')}.`)
  }
  if (opts.recursos.length) {
    linhas.push('', `Recursos digitais sugeridos: ${opts.recursos.join(', ')}.`)
  }
  if (opts.etapas.length) {
    linhas.push('', 'Etapas do Método Master aplicadas:', ...opts.etapas.map(e => `  • ${e}`))
  }
  if (opts.pilares.length) {
    linhas.push('', `Pilares em foco: ${opts.pilares.join(', ')}.`)
  }
  return linhas.join('\n')
}

export const PlanejamentoIAModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [descricao, setDescricao] = useState('')
  const [materia, setMateria] = useState('')
  const [nivel, setNivel] = useState('')
  const [duracao, setDuracao] = useState('')
  const [neuro, setNeuro] = useState<Set<string>>(new Set())
  const [perfil, setPerfil] = useState<Set<string>>(new Set())
  const [recursos, setRecursos] = useState<Set<string>>(new Set())
  const [etapas, setEtapas] = useState<Set<string>>(new Set())
  const [pilares, setPilares] = useState<Set<string>>(new Set())
  const [recursosAberto, setRecursosAberto] = useState(false)
  const [gerando, setGerando] = useState(false)
  const [plano, setPlano] = useState<string | null>(null)

  function toggle(set: Set<string>, setter: (s: Set<string>) => void, valor: string) {
    const novo = new Set(set)
    if (novo.has(valor)) novo.delete(valor); else novo.add(valor)
    setter(novo)
  }

  async function handleGerar() {
    setGerando(true)
    setPlano(null)
    await new Promise(resolve => setTimeout(resolve, 1100))
    const tiposAluno = [
      ...NEURODIVERGENCIAS.filter(n => neuro.has(n.id)).map(n => n.label),
      ...PERFIL_CRIANCA.filter(p => perfil.has(p.id)).map(p => p.label),
    ]
    setPlano(gerarPlanoMock({ descricao, materia, nivel, duracao, tiposAluno, recursos: [...recursos], etapas: [...etapas], pilares: [...pilares] }))
    setGerando(false)
  }

  return (
    <Modal title="Planejamento de Aulas com IA" onClose={onClose} size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-text-mint)' }}>
          <FiCpu size={16} />
          <span style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>Descreva a aula e ajuste as seleções abaixo para gerar um roteiro inicial (demonstração).</span>
        </div>

        <div>
          <textarea
            value={descricao}
            maxLength={LIMITE_DESCRICAO}
            onChange={e => setDescricao(e.target.value)}
            placeholder="Gostaria que fosse sua aula? Escreva um pouco."
            rows={4}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-input-border)',
              background: 'var(--c-input-bg)', color: 'var(--c-input-text)', fontSize: '13px', fontFamily: 'var(--font-sans)',
              resize: 'vertical', boxSizing: 'border-box',
            }}
          />
          <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--c-text-3)', marginTop: '4px' }}>
            {descricao.length}/{LIMITE_DESCRICAO}
          </div>
        </div>

        <Secao titulo="Matéria">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(110px, 100%), 1fr))', gap: '8px' }}>
            {MATERIAS_FILTRO.map(m => {
              const ativo = materia === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMateria(m)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 6px',
                    borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
                    background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                    color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
                  }}
                >
                  <Icone nome={MATERIA_ICONES[m] || 'star'} size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 600, textAlign: 'center' }}>{m}</span>
                </button>
              )
            })}
          </div>
        </Secao>

        <Secao titulo="Nível / turma">
          <ChipRow itens={TODAS_TURMAS} selecionados={new Set(nivel ? [nivel] : [])} onToggle={v => setNivel(v)} labelFormatter={l => l.replace(' — Ens. Fundamental', ' EF').replace(' — Ens. Médio', ' EM')} />
        </Secao>

        <Secao titulo="Duração">
          <ChipRow itens={DURACOES_PLANEJAMENTO} selecionados={new Set(duracao ? [duracao] : [])} onToggle={v => setDuracao(v)} />
        </Secao>

        <Secao titulo="Tipo de aluno">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {NEURODIVERGENCIAS.map(n => (
                <Chip key={n.id} ativo={neuro.has(n.id)} onClick={() => toggle(neuro, setNeuro, n.id)} label={n.label} />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PERFIL_CRIANCA.map(p => (
                <Chip key={p.id} ativo={perfil.has(p.id)} onClick={() => toggle(perfil, setPerfil, p.id)} label={p.label} icon={<Icone nome={p.icone} size={12} />} />
              ))}
            </div>
          </div>
        </Secao>

        <Secao titulo="Recursos (TDICs registrados)">
          <Dropdown
            open={recursosAberto}
            onOpenChange={setRecursosAberto}
            minWidth={280}
            trigger={
              <button
                type="button"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '40px', padding: '0 14px',
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-input-border)', background: 'var(--c-input-bg)',
                  color: recursos.size ? 'var(--c-input-text)' : 'var(--c-input-placeholder)', fontSize: '13px', cursor: 'pointer',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {recursos.size ? [...recursos].join(', ') : 'Selecione os recursos'}
                </span>
                <FiChevronDown size={14} />
              </button>
            }
          >
            <div style={{ padding: '10px' }}>
              {TDICS_REGISTRADOS.map(t => (
                <label key={t.nome} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--c-text-1)', cursor: 'pointer', padding: '5px 2px' }}>
                  <input type="checkbox" checked={recursos.has(t.nome)} onChange={() => toggle(recursos, setRecursos, t.nome)} />
                  {t.nome}
                </label>
              ))}
            </div>
          </Dropdown>
        </Secao>

        <Secao titulo="Etapas do Método Master">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ETAPAS_METODO_MASTER.map(e => (
              <label key={e} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--c-text-1)', cursor: 'pointer' }}>
                <input type="checkbox" checked={etapas.has(e)} onChange={() => toggle(etapas, setEtapas, e)} />
                {e}
              </label>
            ))}
          </div>
        </Secao>

        <Secao titulo="Pilares">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PILARES_METODO_MASTER.map(p => (
              <Chip key={p} ativo={pilares.has(p)} onClick={() => toggle(pilares, setPilares, p)} label={p} />
            ))}
          </div>
        </Secao>

        <Button variant="primary" onClick={handleGerar} loading={gerando}>
          <FiZap size={14} style={{ marginRight: '6px' }} />
          Gerar planejamento
        </Button>

        {plano && (
          <pre className="glass-sm" style={{
            padding: '16px', fontSize: '12.5px', color: 'var(--c-text-1)', whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-sans)', lineHeight: 1.6, margin: 0,
          }}>
            {plano}
          </pre>
        )}
      </div>
    </Modal>
  )
}

const Secao: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => (
  <div>
    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
      {titulo}
    </label>
    {children}
  </div>
)

const Chip: React.FC<{ ativo: boolean; onClick: () => void; label: string; icon?: React.ReactNode }> = ({ ativo, onClick, label, icon }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: 'var(--radius-full)',
      fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
      border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
      background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
      color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
    }}
  >
    {icon}{label}
  </button>
)

const ChipRow: React.FC<{ itens: string[]; selecionados: Set<string>; onToggle: (v: string) => void; labelFormatter?: (v: string) => string }> = ({ itens, selecionados, onToggle, labelFormatter }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {itens.map(item => (
      <Chip key={item} ativo={selecionados.has(item)} onClick={() => onToggle(item)} label={labelFormatter ? labelFormatter(item) : item} />
    ))}
  </div>
)
