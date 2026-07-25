import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { MESES } from '../../lib/constants'
import { parseISO, toISO } from '../../lib/dateUtils'

interface CalendarPickerModalProps {
  valorAtual: string | null
  onSelect: (iso: string) => void
  onClose: () => void
}

export const CalendarPickerModal: React.FC<CalendarPickerModalProps> = ({ valorAtual, onSelect, onClose }) => {
  const base = valorAtual ? parseISO(valorAtual) : new Date()
  const [ano, setAno] = useState(base.getFullYear())
  const [mes, setMes] = useState(base.getMonth())

  const hojeISO = toISO(new Date())
  const primeiroDia = new Date(ano, mes, 1)
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()
  const offsetInicial = primeiroDia.getDay()

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

  return (
    <Modal title="Selecionar data" onClose={onClose} size="sm">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button type="button" onClick={() => mudarMes(-1)} style={navBtnStyle}><FiChevronLeft size={16} /></button>
          <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--c-text-1)', textTransform: 'capitalize' }}>
            {MESES[mes]} de {ano}
          </span>
          <button type="button" onClick={() => mudarMes(1)} style={navBtnStyle}><FiChevronRight size={16} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '11px', color: 'var(--c-text-3)', textAlign: 'center' }}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <span key={d}>{d}</span>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {celulas.map((dia, i) => {
            if (dia === null) return <span key={`vazio-${i}`} />
            const iso = toISO(new Date(ano, mes, dia))
            const selecionado = iso === valorAtual
            const hoje = iso === hojeISO
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onSelect(iso)}
                style={{
                  height: '32px', borderRadius: 'var(--radius-sm)', fontSize: '13px', cursor: 'pointer',
                  border: hoje && !selecionado ? '1px solid var(--c-border-mint)' : '1px solid transparent',
                  background: selecionado ? 'var(--gradient-accent)' : 'transparent',
                  color: selecionado ? '#fff' : 'var(--c-text-1)',
                  fontWeight: selecionado || hoje ? 700 : 400,
                }}
              >
                {dia}
              </button>
            )
          })}
        </div>

        <Button variant="secondary" fullWidth onClick={onClose}>Cancelar</Button>
      </div>
    </Modal>
  )
}

const navBtnStyle: React.CSSProperties = {
  width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)',
  background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-1)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
