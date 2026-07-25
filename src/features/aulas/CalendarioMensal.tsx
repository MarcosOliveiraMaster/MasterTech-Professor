import React, { useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { Aula } from '../../lib/types'
import { MESES } from '../../lib/constants'
import { toISO } from '../../lib/dateUtils'
import { isAulaCinza } from './statusInfo'

interface CalendarioMensalProps {
  aulas: Aula[]
  onDiaClick: (data: string, aulasDoDia: Aula[]) => void
  onAulaClick: (aula: Aula) => void
}

function corBarra(aula: Aula): string {
  if (aula.statusAula.toLowerCase().includes('cancel')) return '#ef4444'
  if (isAulaCinza(aula)) return 'var(--c-text-3)'
  return 'var(--mint-400)'
}

export const CalendarioMensal: React.FC<CalendarioMensalProps> = ({ aulas, onDiaClick, onAulaClick }) => {
  const hoje = new Date()
  const [ano, setAno] = useState(hoje.getFullYear())
  const [mes, setMes] = useState(hoje.getMonth())

  const aulasPorDia = useMemo(() => {
    const mapa = new Map<string, Aula[]>()
    for (const aula of aulas) {
      const lista = mapa.get(aula.data) || []
      lista.push(aula)
      mapa.set(aula.data, lista)
    }
    return mapa
  }, [aulas])

  const primeiroDia = new Date(ano, mes, 1)
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()
  const offsetInicial = primeiroDia.getDay()
  const hojeISO = toISO(hoje)

  function mudarMes(delta: number) {
    let novoMes = mes + delta
    let novoAno = ano
    if (novoMes < 0) { novoMes = 11; novoAno -= 1 }
    if (novoMes > 11) { novoMes = 0; novoAno += 1 }
    setMes(novoMes)
    setAno(novoAno)
  }

  const celulas: (number | null)[] = [
    ...Array(offsetInicial).fill(null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ]
  while (celulas.length % 7 !== 0) celulas.push(null)

  return (
    <div className="glass" style={{ padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button type="button" onClick={() => mudarMes(-1)} style={navBtnStyle}><FiChevronLeft size={18} /></button>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--c-text-1)', textTransform: 'capitalize' }}>
          {MESES[mes]} de {ano}
        </span>
        <button type="button" onClick={() => mudarMes(1)} style={navBtnStyle}><FiChevronRight size={18} /></button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', fontSize: '11px', color: 'var(--c-text-3)', textAlign: 'center', marginBottom: '6px' }}>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <span key={d}>{d}</span>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {celulas.map((dia, i) => {
          if (dia === null) return <div key={`vazio-${i}`} />
          const iso = toISO(new Date(ano, mes, dia))
          const aulasDoDia = aulasPorDia.get(iso) || []
          const ehHoje = iso === hojeISO
          return (
            <div
              key={iso}
              onClick={() => aulasDoDia.length > 0 && onDiaClick(iso, aulasDoDia)}
              style={{
                minHeight: '68px', borderRadius: 'var(--radius-sm)', padding: '6px',
                border: ehHoje ? '1.5px solid var(--c-border-mint)' : '1px solid var(--c-border-sm)',
                background: ehHoje ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                cursor: aulasDoDia.length > 0 ? 'pointer' : 'default',
                display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: ehHoje ? 700 : 500, color: ehHoje ? 'var(--c-text-mint)' : 'var(--c-text-2)' }}>{dia}</span>
              {aulasDoDia.slice(0, 3).map(aula => (
                <button
                  key={aula.id}
                  type="button"
                  onClick={e => { e.stopPropagation(); onAulaClick(aula) }}
                  title="Ver detalhes da aula"
                  style={{
                    fontSize: '10px', width: '100%', padding: '2px 5px', borderRadius: '4px', border: 'none',
                    background: corBarra(aula), color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    textAlign: 'left', cursor: 'pointer',
                  }}
                >
                  {aula.materia}
                </button>
              ))}
              {aulasDoDia.length > 3 && (
                <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>+{aulasDoDia.length - 3}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  width: '30px', height: '30px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)',
  background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-1)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
