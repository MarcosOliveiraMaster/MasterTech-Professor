import React from 'react'
import { FiMove } from 'react-icons/fi'
import { POSTIT_CORES } from './colunas'

export const PostItRail: React.FC = () => (
  <div className="glass-sm" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', position: 'sticky', top: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <FiMove size={13} color="var(--c-text-mint)" />
      <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: 'var(--c-text-1)' }}>Post-its</h4>
    </div>
    <p style={{ margin: 0, fontSize: '11px', color: 'var(--c-text-3)', lineHeight: 1.5 }}>
      Arraste um post-it para qualquer coluna do canvas para adicionar uma anotação.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: '8px' }}>
      {POSTIT_CORES.map(cor => (
        <div
          key={cor}
          draggable
          onDragStart={e => e.dataTransfer.setData('application/x-postit-color', cor)}
          title="Arraste para uma coluna"
          style={{
            aspectRatio: '1', borderRadius: '6px', background: cor, cursor: 'grab',
            boxShadow: '0 3px 10px rgba(0,0,0,0.20)',
          }}
        />
      ))}
    </div>
  </div>
)
