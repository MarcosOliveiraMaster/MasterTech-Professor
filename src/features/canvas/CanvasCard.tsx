import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { CanvasCapa } from './CanvasCapa'
import type { CanvasQuadro } from '../../lib/types'

interface CanvasCardProps {
  quadro: CanvasQuadro
  onClick: () => void
  onRemover: () => void
}

export const CanvasCard: React.FC<CanvasCardProps> = ({ quadro, onClick, onRemover }) => (
  <div
    className="glass"
    style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
  >
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0, background: 'none',
        display: 'flex', flexDirection: 'column', color: 'inherit', fontFamily: 'inherit', width: '100%',
      }}
    >
      <CanvasCapa cor={quadro.capaCor} variante={quadro.capaVariante} />
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: 'var(--c-text-1)', lineHeight: 1.35 }}>{quadro.titulo}</h4>
        <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--c-text-3)', lineHeight: 1.5 }}>{quadro.descricao}</p>
      </div>
    </button>
    <button
      type="button"
      onClick={e => { e.stopPropagation(); onRemover() }}
      aria-label="Remover canvas"
      style={{
        position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-full)',
        border: 'none', background: 'rgba(0,0,0,0.45)', color: '#fff', cursor: 'pointer',
      }}
    >
      <FiTrash2 size={13} />
    </button>
  </div>
)
