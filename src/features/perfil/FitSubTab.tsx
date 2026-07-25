import React from 'react'
import { FiSmile, FiWind } from 'react-icons/fi'
import type { Professor } from '../../lib/types'
import { ESTILO_AULA, PERSONALIDADE_PROFESSOR, type PerfilItem } from '../../lib/constants'
import { Icone } from '../../lib/iconRegistry'
import { SecaoCard } from './SecaoCard'

interface FitSubTabProps {
  draft: Professor
  onChange: (patch: Partial<Professor>) => void
}

export const FitSubTab: React.FC<FitSubTabProps> = ({ draft, onChange }) => {
  function toggle(campo: 'personalidade' | 'estiloAula', id: string) {
    const atual = new Set(draft[campo])
    if (atual.has(id)) atual.delete(id); else atual.add(id)
    onChange({ [campo]: [...atual] } as Partial<Professor>)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <SecaoCard icon={<FiSmile size={16} />} titulo="Personalidade">
        <IconGrid itens={PERSONALIDADE_PROFESSOR} selecionados={draft.personalidade} onToggle={id => toggle('personalidade', id)} />
      </SecaoCard>

      <SecaoCard icon={<FiWind size={16} />} titulo="Estilo de Aula">
        <IconGrid itens={ESTILO_AULA} selecionados={draft.estiloAula} onToggle={id => toggle('estiloAula', id)} />
      </SecaoCard>
    </div>
  )
}

const IconGrid: React.FC<{ itens: PerfilItem[]; selecionados: string[]; onToggle: (id: string) => void }> = ({ itens, selecionados, onToggle }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
    {itens.map(item => {
      const ativo = selecionados.includes(item.id)
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onToggle(item.id)}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '14px 8px',
            borderRadius: 'var(--radius-md)', cursor: 'pointer',
            border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
            background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
            color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
          }}
        >
          <Icone nome={item.icone} size={20} />
          <span style={{ fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>{item.label}</span>
        </button>
      )
    })}
  </div>
)
