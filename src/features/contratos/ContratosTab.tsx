import React, { useState } from 'react'
import { FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { formatarDataBR } from '../../lib/dateUtils'
import { ContratoModal } from './ContratoModal'
import type { Contrato } from '../../lib/types'

export const ContratosTab: React.FC = () => {
  const { contratos } = useProfessorData()
  const [selecionado, setSelecionado] = useState<Contrato | null>(null)
  const pendentes = contratos.filter(c => !c.dataAssinatura).length

  return (
    <div className="page-wrap page-wrap-narrow">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiFileText size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Contratos</h2>
        {pendentes > 0 && (
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: 'var(--radius-full)', background: 'var(--c-badge-warning-bg)', color: 'var(--c-badge-warning-text)' }}>
            {pendentes} pendente(s)
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {contratos.map(contrato => {
          const assinado = !!contrato.dataAssinatura
          return (
            <button
              key={contrato.id}
              type="button"
              onClick={() => setSelecionado(contrato)}
              className="glass"
              style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', textAlign: 'left',
                cursor: 'pointer', border: assinado ? '1px solid var(--c-border)' : '1px solid var(--c-border-mint)',
                color: 'inherit', fontFamily: 'inherit',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: assinado ? 'var(--c-badge-success-bg)' : 'var(--c-badge-warning-bg)',
                color: assinado ? 'var(--c-badge-success-text)' : 'var(--c-badge-warning-text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {assinado ? <FiCheckCircle size={17} /> : <FiClock size={17} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-text-1)' }}>{contrato.titulo}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--c-text-3)', marginTop: '3px' }}>
                  Enviado em {formatarDataBR(contrato.dataEnvio)}
                  {assinado && ` · Assinado em ${formatarDataBR(contrato.dataAssinatura!)}`}
                </div>
              </div>
              <span style={{
                fontSize: '10.5px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', flexShrink: 0,
                color: assinado ? 'var(--c-badge-success-text)' : 'var(--c-badge-warning-text)',
                background: assinado ? 'var(--c-badge-success-bg)' : 'var(--c-badge-warning-bg)',
              }}>
                {assinado ? 'Assinado' : 'Pendente'}
              </span>
            </button>
          )
        })}
      </div>

      {selecionado && <ContratoModal contrato={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}
