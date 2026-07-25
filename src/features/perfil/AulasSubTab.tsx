import React, { useState } from 'react'
import { FiAward, FiBookOpen, FiCalendar, FiChevronDown, FiChevronUp, FiFileText, FiHeart, FiMap, FiMapPin, FiPlus, FiUpload, FiUsers, FiX } from 'react-icons/fi'
import type { DiaSemana, NivelAcademico, Professor } from '../../lib/types'
import {
  BAIRROS_PARTE_ALTA, BAIRROS_PARTE_BAIXA, DIAS_SEMANA, DISCIPLINAS_PERFIL, NEURODIVERGENCIAS,
  NIVEIS_ACADEMICOS, TURMAS_FUNDAMENTAL, TURMAS_MEDIO, TURMAS_OUTRAS,
} from '../../lib/constants'
import { Input, Textarea } from '../../components/Input'
import { Dropdown } from '../../components/Dropdown'
import { SecaoCard } from './SecaoCard'
import { MapaBairros } from './MapaBairros'

interface AulasSubTabProps {
  draft: Professor
  onChange: (patch: Partial<Professor>) => void
}

export const AulasSubTab: React.FC<AulasSubTabProps> = ({ draft, onChange }) => {
  const [disciplinasAberto, setDisciplinasAberto] = useState(false)
  const [accordionAberto, setAccordionAberto] = useState<'alta' | 'baixa' | null>('alta')
  const [outroAtivo, setOutroAtivo] = useState(!!draft.neurodivergenciaOutro)

  function toggleDia(dia: DiaSemana, turno: 'manha' | 'tarde') {
    onChange({
      disponibilidade: {
        ...draft.disponibilidade,
        [dia]: { ...draft.disponibilidade[dia], [turno]: !draft.disponibilidade[dia][turno] },
      },
    })
  }

  function toggleDisciplina(disciplina: string) {
    const atual = new Set(draft.disciplinas)
    if (atual.has(disciplina)) atual.delete(disciplina); else atual.add(disciplina)
    onChange({ disciplinas: [...atual] })
  }

  function toggleBairro(descricao: string) {
    const atual = new Set(draft.bairros)
    if (atual.has(descricao)) atual.delete(descricao); else atual.add(descricao)
    onChange({ bairros: [...atual] })
  }

  function toggleTurma(turma: string) {
    const atual = new Set(draft.turmasAtendidas)
    if (atual.has(turma)) atual.delete(turma); else atual.add(turma)
    onChange({ turmasAtendidas: [...atual] })
  }

  function toggleNeuro(id: string) {
    const atual = new Set(draft.neurodivergencias)
    if (atual.has(id)) atual.delete(id); else atual.add(id)
    onChange({ neurodivergencias: [...atual] })
  }

  function atualizarDetalheNeuro(id: string, patch: Partial<{ descricao: string; certificados: string[] }>) {
    const atual = draft.neurodivergenciaDetalhes[id] || { descricao: '', certificados: [] }
    onChange({
      neurodivergenciaDetalhes: {
        ...draft.neurodivergenciaDetalhes,
        [id]: { ...atual, ...patch },
      },
    })
  }

  function handleCertificado(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(e.target.files || []).map(f => f.name)
    if (arquivos.length) {
      const atual = draft.neurodivergenciaDetalhes[id]?.certificados || []
      atualizarDetalheNeuro(id, { certificados: [...atual, ...arquivos] })
    }
    e.target.value = ''
  }

  function removerCertificado(id: string, nome: string) {
    const atual = draft.neurodivergenciaDetalhes[id]?.certificados || []
    atualizarDetalheNeuro(id, { certificados: atual.filter(c => c !== nome) })
  }

  const idsNeuroAtivos = [...draft.neurodivergencias, ...(outroAtivo ? ['outro'] : [])]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <SecaoCard icon={<FiCalendar size={16} />} titulo="Disponibilidade">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--c-border)' }}>
                {['Dia', 'Manhã', 'Tarde'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Dia' ? 'left' : 'center', padding: '8px 10px', color: 'var(--c-text-3)', fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIAS_SEMANA.map(({ key, label }) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--c-border-sm)' }}>
                  <td style={{ padding: '8px 10px', color: 'var(--c-text-1)' }}>{label}</td>
                  <td style={{ textAlign: 'center', padding: '8px 10px' }}>
                    <input type="checkbox" checked={draft.disponibilidade[key].manha} onChange={() => toggleDia(key, 'manha')} />
                  </td>
                  <td style={{ textAlign: 'center', padding: '8px 10px' }}>
                    <input type="checkbox" checked={draft.disponibilidade[key].tarde} onChange={() => toggleDia(key, 'tarde')} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SecaoCard>

      <SecaoCard icon={<FiBookOpen size={16} />} titulo="Disciplinas">
        <Dropdown
          open={disciplinasAberto}
          onOpenChange={setDisciplinasAberto}
          minWidth={280}
          trigger={
            <button
              type="button"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '40px', padding: '0 14px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-input-border)', background: 'var(--c-input-bg)',
                color: draft.disciplinas.length ? 'var(--c-input-text)' : 'var(--c-input-placeholder)', fontSize: '13px', cursor: 'pointer',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {draft.disciplinas.length ? draft.disciplinas.join(', ') : 'Selecione as disciplinas'}
              </span>
              {disciplinasAberto ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </button>
          }
        >
          <div style={{ padding: '10px' }}>
            {DISCIPLINAS_PERFIL.map(d => (
              <label key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--c-text-1)', cursor: 'pointer', padding: '5px 2px' }}>
                <input type="checkbox" checked={draft.disciplinas.includes(d)} onChange={() => toggleDisciplina(d)} />
                {d}
              </label>
            ))}
          </div>
        </Dropdown>
      </SecaoCard>

      <SecaoCard icon={<FiMapPin size={16} />} titulo="Bairros de Acesso">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <BairroAccordion
            titulo="Parte Alta"
            aberto={accordionAberto === 'alta'}
            onToggle={() => setAccordionAberto(a => a === 'alta' ? null : 'alta')}
            regioes={BAIRROS_PARTE_ALTA}
            selecionados={draft.bairros}
            onToggleBairro={toggleBairro}
          />
          <BairroAccordion
            titulo="Parte Baixa"
            aberto={accordionAberto === 'baixa'}
            onToggle={() => setAccordionAberto(a => a === 'baixa' ? null : 'baixa')}
            regioes={BAIRROS_PARTE_BAIXA}
            selecionados={draft.bairros}
            onToggleBairro={toggleBairro}
          />
        </div>
      </SecaoCard>

      <SecaoCard icon={<FiMap size={16} />} titulo="Selecionar no Mapa">
        <MapaBairros selecionados={draft.bairros} onToggleBairro={toggleBairro} />
      </SecaoCard>

      <SecaoCard icon={<FiAward size={16} />} titulo="Nível Acadêmico">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          {NIVEIS_ACADEMICOS.map(nivel => (
            <label key={nivel} style={{
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer',
              padding: '7px 12px', borderRadius: 'var(--radius-full)',
              border: `1px solid ${draft.nivel === nivel ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
              background: draft.nivel === nivel ? 'var(--c-glass-bg-mint)' : 'transparent',
              color: 'var(--c-text-1)',
            }}>
              <input type="radio" name="nivel" checked={draft.nivel === nivel} onChange={() => onChange({ nivel: nivel as NivelAcademico })} style={{ display: 'none' }} />
              {nivel}
            </label>
          ))}
        </div>
        <Input label="Curso de Formação" placeholder="Nome do curso e instituição" value={draft.curso} onChange={e => onChange({ curso: e.target.value })} />
      </SecaoCard>

      <SecaoCard icon={<FiUsers size={16} />} titulo="Turmas que Atende">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <GrupoTurmas titulo="Ensino Fundamental" turmas={TURMAS_FUNDAMENTAL} selecionadas={draft.turmasAtendidas} onToggle={toggleTurma} />
          <GrupoTurmas titulo="Ensino Médio" turmas={TURMAS_MEDIO} selecionadas={draft.turmasAtendidas} onToggle={toggleTurma} />
          <GrupoTurmas titulo="Outras Modalidades" turmas={TURMAS_OUTRAS} selecionadas={draft.turmasAtendidas} onToggle={toggleTurma} />
        </div>
      </SecaoCard>

      <SecaoCard icon={<FiHeart size={16} />} titulo="Neurodivergências e Transtornos de Aprendizagem">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {NEURODIVERGENCIAS.map(n => {
              const ativo = draft.neurodivergencias.includes(n.id)
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => toggleNeuro(n.id)}
                  style={{
                    padding: '9px 14px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
                    background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                    color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
                  }}
                >
                  {n.label}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setOutroAtivo(a => !a)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${outroAtivo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
                background: outroAtivo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                color: outroAtivo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
              }}
            >
              <FiPlus size={13} /> Outro
            </button>
          </div>

          {outroAtivo && (
            <Input
              placeholder="Especifique a neurodivergência ou transtorno"
              value={draft.neurodivergenciaOutro}
              onChange={e => onChange({ neurodivergenciaOutro: e.target.value })}
            />
          )}

          {idsNeuroAtivos.map(id => {
            const label = id === 'outro' ? (draft.neurodivergenciaOutro || 'Outro') : NEURODIVERGENCIAS.find(n => n.id === id)?.label || id
            const detalhe = draft.neurodivergenciaDetalhes[id] || { descricao: '', certificados: [] }
            return (
              <div key={id} className="glass-sm" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-text-mint)' }}>{label}</div>
                <Textarea
                  label="Por que você tem experiência em atender este tipo de aluno?"
                  rows={3}
                  value={detalhe.descricao}
                  onChange={e => atualizarDetalheNeuro(id, { descricao: e.target.value })}
                />
                <div>
                  <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--c-text-2)', display: 'block', marginBottom: '8px' }}>
                    Envie certificações que baseiam seu atendimento
                  </label>
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px',
                    borderRadius: 'var(--radius-sm)', border: '1.5px dashed var(--c-border-lg)', background: 'var(--c-glass-bg-sm)',
                    color: 'var(--c-text-2)', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                  }}>
                    <FiUpload size={15} />
                    Selecionar arquivos PDF
                    <input type="file" accept="application/pdf" multiple onChange={e => handleCertificado(id, e)} style={{ display: 'none' }} />
                  </label>

                  {detalhe.certificados.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                      {detalhe.certificados.map(nome => (
                        <div key={nome} style={{
                          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)', background: 'var(--c-glass-bg-sm)', fontSize: '12px', color: 'var(--c-text-1)',
                        }}>
                          <FiFileText size={14} color="var(--c-text-mint)" />
                          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</span>
                          <button type="button" onClick={() => removerCertificado(id, nome)} style={{ background: 'none', border: 'none', color: 'var(--c-text-3)', cursor: 'pointer', display: 'flex' }}>
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </SecaoCard>
    </div>
  )
}

const GrupoTurmas: React.FC<{ titulo: string; turmas: string[]; selecionadas: string[]; onToggle: (t: string) => void }> = ({ titulo, turmas, selecionadas, onToggle }) => (
  <div>
    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '8px' }}>{titulo}</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {turmas.map(t => {
        const ativo = selecionadas.includes(t)
        return (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(t)}
            style={{
              padding: '8px 13px', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
              background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
              color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-2)',
            }}
          >
            {t.replace(' — Ens. Fundamental', '').replace(' — Ens. Médio', '')}
          </button>
        )
      })}
    </div>
  </div>
)

const BairroAccordion: React.FC<{
  titulo: string
  aberto: boolean
  onToggle: () => void
  regioes: { regiao: string; descricao: string }[]
  selecionados: string[]
  onToggleBairro: (descricao: string) => void
}> = ({ titulo, aberto, onToggle, regioes, selecionados, onToggleBairro }) => (
  <div style={{ border: '1px solid var(--c-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
        background: 'var(--c-glass-bg-sm)', border: 'none', cursor: 'pointer', color: 'var(--c-text-1)', fontSize: '13px', fontWeight: 700,
      }}
    >
      {titulo}
      {aberto ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
    </button>
    {aberto && (
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {regioes.map(r => (
          <label key={r.regiao} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--c-text-2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={selecionados.includes(r.descricao)} onChange={() => onToggleBairro(r.descricao)} style={{ marginTop: '2px' }} />
            <span><strong style={{ color: 'var(--c-text-1)' }}>{r.regiao}:</strong> {r.descricao}</span>
          </label>
        ))}
      </div>
    )}
  </div>
)
