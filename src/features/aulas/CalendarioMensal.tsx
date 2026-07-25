import React, { useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { Aula } from '../../lib/types'
import { MESES } from '../../lib/constants'
import { toISO } from '../../lib/dateUtils'
import { useIsMobile } from '../../lib/useMediaQuery'
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

const DIAS_SEMANA_LONGO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const DIAS_SEMANA_CURTO = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export const CalendarioMensal: React.FC<CalendarioMensalProps> = ({ aulas, onDiaClick, onAulaClick }) => {
  const isMobile = useIsMobile()
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

  const maxChips = isMobile ? 4 : 3

  return (
    <div className="glass" style={{ padding: isMobile ? '12px 10px' : '18px', overflow: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? '10px' : '16px', gap: '8px' }}>
        <button type="button" onClick={() => mudarMes(-1)} style={{ ...navBtnStyle, flexShrink: 0 }}><FiChevronLeft size={18} /></button>
        <span style={{
          fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: isMobile ? '13px' : 'var(--font-size-md)',
          color: 'var(--c-text-1)', textTransform: 'capitalize', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {MESES[mes]} de {ano}
        </span>
        <button type="button" onClick={() => mudarMes(1)} style={{ ...navBtnStyle, flexShrink: 0 }}><FiChevronRight size={18} /></button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: isMobile ? '3px' : '6px',
        fontSize: isMobile ? '10px' : '11px', color: 'var(--c-text-3)', textAlign: 'center', marginBottom: '6px',
      }}>
        {(isMobile ? DIAS_SEMANA_CURTO : DIAS_SEMANA_LONGO).map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: isMobile ? '3px' : '6px' }}>
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
                minHeight: isMobile ? '48px' : '68px', minWidth: 0, borderRadius: 'var(--radius-sm)', padding: isMobile ? '4px 3px' : '6px',
                border: ehHoje ? '1.5px solid var(--c-border-mint)' : '1px solid var(--c-border-sm)',
                background: ehHoje ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                cursor: aulasDoDia.length > 0 ? 'pointer' : 'default',
                display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start', textAlign: 'left', overflow: 'hidden', boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: ehHoje ? 700 : 500, color: ehHoje ? 'var(--c-text-mint)' : 'var(--c-text-2)' }}>{dia}</span>

              {isMobile ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', width: '100%' }}>
                  {aulasDoDia.slice(0, maxChips).map(aula => (
                    <button
                      key={aula.id}
                      type="button"
                      onClick={e => { e.stopPropagation(); onAulaClick(aula) }}
                      title={aula.materia}
                      aria-label={aula.materia}
                      style={{
                        width: '7px', height: '7px', minWidth: '7px', padding: 0, borderRadius: '50%', border: 'none',
                        background: corBarra(aula), cursor: 'pointer',
                      }}
                    />
                  ))}
                  {aulasDoDia.length > maxChips && (
                    <span style={{ fontSize: '8px', color: 'var(--c-text-3)', lineHeight: '7px' }}>+{aulasDoDia.length - maxChips}</span>
                  )}
                </div>
              ) : (
                <>
                  {aulasDoDia.slice(0, maxChips).map(aula => (
                    <button
                      key={aula.id}
                      type="button"
                      onClick={e => { e.stopPropagation(); onAulaClick(aula) }}
                      title="Ver detalhes da aula"
                      style={{
                        fontSize: '10px', width: '100%', padding: '2px 5px', borderRadius: '4px', border: 'none',
                        background: corBarra(aula), color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        textAlign: 'left', cursor: 'pointer', boxSizing: 'border-box',
                      }}
                    >
                      {aula.materia}
                    </button>
                  ))}
                  {aulasDoDia.length > maxChips && (
                    <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>+{aulasDoDia.length - maxChips}</span>
                  )}
                </>
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
