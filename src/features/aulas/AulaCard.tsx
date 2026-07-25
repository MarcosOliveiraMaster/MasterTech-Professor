import React from 'react'
import { FiCheckCircle, FiClock, FiEdit3, FiWatch, FiUser, FiUserCheck } from 'react-icons/fi'
import type { Aula } from '../../lib/types'
import { diaSemanaExtenso, formatarDataBR, primeirosNomes } from '../../lib/dateUtils'
import { getStatusInfo, isAulaCinza } from './statusInfo'

interface AulaCardProps {
  aula: Aula
  onConfirmar: () => void
  onRelatorio: () => void
  onDetalhes?: () => void
}

export const AulaCard: React.FC<AulaCardProps> = ({ aula, onConfirmar, onRelatorio, onDetalhes }) => {
  const cinza = isAulaCinza(aula)
  const cancelada = aula.statusAula.toLowerCase().includes('cancel')
  const status = getStatusInfo(aula.statusAula)

  const headerBg = cancelada ? 'rgba(239, 68, 68, 0.16)' : cinza ? 'var(--c-glass-bg-sm)' : 'var(--gradient-accent)'

  return (
    <div className="glass" style={{
      overflow: 'hidden',
      opacity: cinza ? 0.72 : 1,
      border: cancelada ? '1px solid var(--c-border-lg)' : undefined,
    }}>
      <div
        onClick={onDetalhes}
        style={{ cursor: onDetalhes ? 'pointer' : 'default' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px', background: headerBg,
        }}>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: cinza ? 'var(--c-text-1)' : '#fff' }}>
            {diaSemanaExtenso(aula.data)}: {formatarDataBR(aula.data)} | {aula.materia}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)',
            color: status.cor, background: status.bg,
          }}>
            {status.label}
          </span>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <CardRow icon={<FiClock size={14} />} label="Início:" valor={aula.horario} />
          <CardRow icon={<FiWatch size={14} />} label="Duração:" valor={aula.duracao} />
          <CardRow icon={<FiUser size={14} />} label="Cliente:" valor={primeirosNomes(aula.nomeCliente)} />
          <CardRow icon={<FiUserCheck size={14} />} label="Estudante:" valor={primeirosNomes(aula.estudante)} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px' }}>
        <button
          type="button"
          disabled={aula.confirmacaoProfessor}
          onClick={onConfirmar}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '9px 10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 700,
            cursor: aula.confirmacaoProfessor ? 'default' : 'pointer',
            border: aula.confirmacaoProfessor ? '1px solid var(--c-btn-success-border)' : '1px solid var(--c-border)',
            background: aula.confirmacaoProfessor ? 'var(--c-btn-success-bg)' : 'var(--c-btn-secondary-bg)',
            color: aula.confirmacaoProfessor ? 'var(--c-btn-success-text)' : 'var(--c-text-1)',
          }}
        >
          <FiCheckCircle size={14} />
          {aula.confirmacaoProfessor ? 'Aula concluída' : 'Marcar como concluída'}
        </button>
        <button
          type="button"
          onClick={onRelatorio}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '9px 10px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 700,
            cursor: 'pointer', border: 'none', background: 'var(--gradient-accent)', color: '#fff',
          }}
        >
          <FiEdit3 size={14} />
          Relatório de Aula
        </button>
      </div>
    </div>
  )
}

const CardRow: React.FC<{ icon: React.ReactNode; label: string; valor: string }> = ({ icon, label, valor }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--c-text-2)' }}>
    <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>
    <span style={{ fontWeight: 600, color: 'var(--c-text-1)' }}>{label}</span>
    <span>{valor || '—'}</span>
  </div>
)
