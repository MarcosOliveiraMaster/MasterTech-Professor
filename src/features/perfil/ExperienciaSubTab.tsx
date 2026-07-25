import React from 'react'
import { FiStar } from 'react-icons/fi'
import { Textarea } from '../../components/Input'
import type { Professor } from '../../lib/types'
import { SecaoCard } from './SecaoCard'

interface ExperienciaSubTabProps {
  draft: Professor
  onChange: (patch: Partial<Professor>) => void
}

export const ExperienciaSubTab: React.FC<ExperienciaSubTabProps> = ({ draft, onChange }) => (
  <SecaoCard icon={<FiStar size={16} />} titulo="Experiências Profissionais">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ExperienciaBloco
        pergunta="Você tem experiência com aulas particulares?"
        valor={draft.expAulas}
        descricao={draft.descricaoExpAulas}
        onValorChange={v => onChange({ expAulas: v })}
        onDescricaoChange={d => onChange({ descricaoExpAulas: d })}
        placeholder="Escreva sobre suas experiências com aulas particulares..."
      />
      <ExperienciaBloco
        pergunta="Você tem experiência com alunos neurodivergentes?"
        valor={draft.expNeuro}
        descricao={draft.descricaoExpNeuro}
        onValorChange={v => onChange({ expNeuro: v })}
        onDescricaoChange={d => onChange({ descricaoExpNeuro: d })}
        placeholder="Escreva sobre suas experiências com alunos neurodivergentes..."
      />
      <ExperienciaBloco
        pergunta="Você tem experiência com TDICs?"
        valor={draft.expTdics}
        descricao={draft.descricaoTdics}
        onValorChange={v => onChange({ expTdics: v })}
        onDescricaoChange={d => onChange({ descricaoTdics: d })}
        placeholder="Escreva sobre suas experiências com TDICs..."
      />
    </div>
  </SecaoCard>
)

const ExperienciaBloco: React.FC<{
  pergunta: string
  valor: 'sim' | 'não'
  descricao: string
  onValorChange: (v: 'sim' | 'não') => void
  onDescricaoChange: (v: string) => void
  placeholder: string
}> = ({ pergunta, valor, descricao, onValorChange, onDescricaoChange, placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--c-text-1)', fontWeight: 500 }}>{pergunta}</span>
      <div style={{ display: 'flex', borderRadius: 'var(--radius-full)', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
        {(['não', 'sim'] as const).map(opcao => (
          <button
            key={opcao}
            type="button"
            onClick={() => onValorChange(opcao)}
            style={{
              padding: '6px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize',
              background: valor === opcao ? 'var(--gradient-accent)' : 'transparent',
              color: valor === opcao ? '#fff' : 'var(--c-text-2)',
            }}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
    {valor === 'sim' && (
      <Textarea rows={3} placeholder={placeholder} value={descricao} onChange={e => onDescricaoChange(e.target.value)} />
    )}
  </div>
)
