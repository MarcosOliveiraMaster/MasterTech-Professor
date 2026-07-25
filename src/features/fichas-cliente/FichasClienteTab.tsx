import React, { useState } from 'react'
import { FiMapPin, FiUsers } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { FichaClienteModal } from './FichaClienteModal'
import type { Cliente } from '../../lib/types'

function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean)
  return partes.length > 1 ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase() : partes[0].slice(0, 2).toUpperCase()
}

export const FichasClienteTab: React.FC = () => {
  const { clientes } = useProfessorData()
  const [selecionado, setSelecionado] = useState<Cliente | null>(null)

  return (
    <div className="page-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiUsers size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Fichas de Cliente</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '14px' }}>
        {clientes.map(cliente => (
          <button
            key={cliente.id}
            type="button"
            onClick={() => setSelecionado(cliente)}
            className="glass"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px 14px',
              cursor: 'pointer', border: 'none', color: 'inherit', fontFamily: 'inherit', textAlign: 'center',
              transition: 'transform 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = '' }}
          >
            <span style={{
              width: '56px', height: '56px', borderRadius: '50%', background: 'var(--c-avatar-bg)', color: 'var(--c-avatar-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700,
            }}>
              {getIniciais(cliente.nome)}
            </span>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--c-text-1)' }}>{cliente.nome}</div>
              <div style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>{cliente.nomeEstudante}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--c-text-mint)' }}>
              <FiMapPin size={11} /> {cliente.bairro}
            </div>
          </button>
        ))}
      </div>

      {selecionado && <FichaClienteModal cliente={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}
