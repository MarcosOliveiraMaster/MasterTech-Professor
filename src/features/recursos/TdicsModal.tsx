import React from 'react'
import { FiMonitor } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { TDICS_REGISTRADOS } from '../../lib/constants'

export const TdicsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <Modal title="TDICs — Tecnologias Digitais na Educação" onClose={onClose} size="md">
    <p style={{ margin: '0 0 16px', fontSize: 'var(--font-size-sm)', color: 'var(--c-text-2)', lineHeight: 1.6 }}>
      Sugestões de categorias de ferramentas digitais para tornar suas aulas mais interativas.
      Pergunte à Central Master sobre acesso institucional a qualquer uma delas.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '12px' }}>
      {TDICS_REGISTRADOS.map(f => (
        <div key={f.nome} className="glass-sm" style={{ padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <FiMonitor size={14} color="var(--c-text-mint)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-text-1)' }}>{f.nome}</span>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--c-text-3)', lineHeight: 1.5 }}>{f.descricao}</p>
        </div>
      ))}
    </div>
  </Modal>
)
