import React from 'react'
import { FiAlertTriangle, FiBell, FiCalendar, FiInfo } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { formatarDataBR } from '../../lib/dateUtils'
import type { TipoAviso } from '../../lib/types'

const TIPO_CONFIG: Record<TipoAviso, { icon: React.ReactNode; cor: string; bg: string; label: string }> = {
  info: { icon: <FiInfo size={16} />, cor: 'var(--c-badge-blue-text)', bg: 'var(--c-badge-blue-bg)', label: 'Informativo' },
  urgente: { icon: <FiAlertTriangle size={16} />, cor: 'var(--c-badge-error-text)', bg: 'var(--c-badge-error-bg)', label: 'Urgente' },
  evento: { icon: <FiCalendar size={16} />, cor: 'var(--c-badge-mint-text)', bg: 'var(--c-badge-mint-bg)', label: 'Evento' },
}

export const AvisosTab: React.FC = () => {
  const { avisos, marcarAvisoComoLido } = useProfessorData()
  const naoLidos = avisos.filter(a => !a.lido).length

  return (
    <div className="page-wrap page-wrap-narrow">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiBell size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Avisos</h2>
        {naoLidos > 0 && (
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: 'var(--radius-full)',
            background: 'var(--c-badge-error-bg)', color: 'var(--c-badge-error-text)',
          }}>
            {naoLidos} novo(s)
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {avisos.map(aviso => {
          const cfg = TIPO_CONFIG[aviso.tipo]
          return (
            <button
              key={aviso.id}
              type="button"
              onClick={() => marcarAvisoComoLido(aviso.id)}
              className="glass"
              style={{
                textAlign: 'left', display: 'flex', gap: '14px', padding: '16px 18px', cursor: 'pointer',
                border: aviso.lido ? '1px solid var(--c-border)' : '1px solid var(--c-border-mint)',
                opacity: aviso.lido ? 0.75 : 1, color: 'inherit', fontFamily: 'inherit',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', background: cfg.bg, color: cfg.cor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {cfg.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--c-text-1)' }}>{aviso.titulo}</span>
                  {!aviso.lido && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--mint-300)', flexShrink: 0 }} />}
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--c-text-2)', lineHeight: 1.5 }}>{aviso.corpo}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--c-text-3)' }}>
                  <span style={{ color: cfg.cor, fontWeight: 700 }}>{cfg.label}</span>
                  <span>·</span>
                  <span>{formatarDataBR(aviso.data)}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
