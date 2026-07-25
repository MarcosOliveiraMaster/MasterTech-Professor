import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { Modal } from './Modal'

const ITENS = [
  { arquivo: '/canvas/Canva1.png', titulo: 'Planejamento Inicial' },
  { arquivo: '/canvas/Canva2.png', titulo: 'Planejamento de Aula e Aluno' },
  { arquivo: '/canvas/Canva3.png', titulo: 'Fluxo Método Master' },
]

export const CanvasModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <Modal title="Canvas complementares" onClose={onClose} size="sm">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {ITENS.map((item, i) => (
        <a
          key={item.arquivo}
          href={item.arquivo}
          download
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--c-glass-bg-sm)', border: '1.5px solid var(--c-border)', borderRadius: 'var(--radius-md)',
            padding: '12px 16px', textDecoration: 'none', transition: 'border-color 150ms, background 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-blue)'; e.currentTarget.style.background = 'var(--c-glass-bg-blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.background = 'var(--c-glass-bg-sm)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>{i + 1}</div>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--c-text-1)' }}>{item.titulo}</span>
          </div>
          <FiDownload size={15} color="var(--c-text-mint)" />
        </a>
      ))}
    </div>
  </Modal>
)
