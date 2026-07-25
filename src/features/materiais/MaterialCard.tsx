import React from 'react'
import { Badge } from '../../components/Badge'
import { formatarMoeda } from '../../lib/dateUtils'
import { MaterialCapa } from './MaterialCapa'
import type { MaterialDidatico } from '../../lib/types'

export const MaterialCard: React.FC<{ material: MaterialDidatico; onClick: () => void }> = ({ material, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="glass"
    style={{
      textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', color: 'inherit', fontFamily: 'inherit',
      transition: 'transform 200ms ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = '' }}
  >
    <MaterialCapa cor={material.capaCor} variante={material.capaVariante} />
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      <Badge variant="blue" size="sm" style={{ alignSelf: 'flex-start' }}>{material.materia}</Badge>
      <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--c-text-1)', lineHeight: 1.35 }}>{material.titulo}</h4>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--c-text-3)' }}>{material.autor}</p>
      <div style={{ marginTop: 'auto', fontWeight: 800, color: 'var(--c-text-mint)', fontSize: '15px' }}>{formatarMoeda(material.valor)}</div>
    </div>
  </button>
)
