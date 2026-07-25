import React from 'react'
import { FiBookOpen } from 'react-icons/fi'

interface MaterialCapaProps {
  cor: string
  variante: number
  altura?: number
}

/** Capas ilustradas mockadas — padrões abstratos em SVG, sem depender de imagens externas. */
export const MaterialCapa: React.FC<MaterialCapaProps> = ({ cor, variante, altura = 96 }) => {
  const id = `capa-${variante}-${cor.replace('#', '')}`

  return (
    <div style={{ position: 'relative', height: altura, overflow: 'hidden', background: `linear-gradient(135deg, ${cor}40, ${cor}15)` }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={id} width={variante === 2 ? 18 : 34} height={variante === 2 ? 18 : 34} patternUnits="userSpaceOnUse" patternTransform={variante === 1 ? 'rotate(35)' : undefined}>
            {variante === 0 && <circle cx="17" cy="17" r="13" fill="none" stroke={cor} strokeWidth="2" opacity="0.35" />}
            {variante === 1 && <rect x="0" y="0" width="10" height="34" fill={cor} opacity="0.18" />}
            {variante === 2 && <circle cx="4" cy="4" r="2" fill={cor} opacity="0.4" />}
            {variante === 3 && <polygon points="17,2 32,30 2,30" fill="none" stroke={cor} strokeWidth="2" opacity="0.3" />}
            {variante === 4 && <path d="M0 17 Q 8.5 4 17 17 T 34 17" fill="none" stroke={cor} strokeWidth="2" opacity="0.35" />}
            {variante === 5 && (
              <polygon points="17,1 32,9 32,25 17,33 2,25 2,9" fill="none" stroke={cor} strokeWidth="1.5" opacity="0.3" />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', background: cor, opacity: 0.9,
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${cor}66`,
        }}>
          <FiBookOpen size={19} color="#fff" />
        </div>
      </div>
    </div>
  )
}
