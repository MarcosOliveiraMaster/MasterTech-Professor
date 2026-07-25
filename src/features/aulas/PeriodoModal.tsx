import React, { useState } from 'react'
import { FiCalendar, FiFilter } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { CalendarPickerModal } from './CalendarPickerModal'
import { formatarDataBR, toISO, addDays } from '../../lib/dateUtils'
import type { FiltroPeriodo } from './filtros'

interface PeriodoModalProps {
  periodoAtual: FiltroPeriodo
  onAplicar: (periodo: FiltroPeriodo) => void
  onClose: () => void
}

const ATALHOS = [
  { label: 'Últimos 7 dias', dias: 7 },
  { label: 'Últimos 30 dias', dias: 30 },
  { label: 'Últimos 90 dias', dias: 90 },
]

export const PeriodoModal: React.FC<PeriodoModalProps> = ({ periodoAtual, onAplicar, onClose }) => {
  const [de, setDe] = useState<string | null>(periodoAtual.de)
  const [ate, setAte] = useState<string | null>(periodoAtual.ate)
  const [erro, setErro] = useState('')
  const [campoAberto, setCampoAberto] = useState<'de' | 'ate' | null>(null)

  function aplicarAtalho(dias: number) {
    const hoje = new Date()
    setDe(toISO(addDays(hoje, -dias)))
    setAte(toISO(hoje))
    setErro('')
  }

  function handleAplicar() {
    if (!de || !ate) {
      setErro('Selecione as duas datas.')
      return
    }
    if (de > ate) {
      setErro('"De" não pode ser posterior a "Até".')
      return
    }
    setErro('')
    onAplicar({ de, ate })
  }

  return (
    <>
      <Modal
        title="Período Específico"
        onClose={onClose}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleAplicar}>
              <FiFilter size={14} style={{ marginRight: '6px' }} />
              Aplicar
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Atalhos rápidos
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ATALHOS.map(a => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => aplicarAtalho(a.dias)}
                  style={{
                    padding: '7px 13px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-1)',
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '12px' }}>
            <CampoData label="De:" valor={de} onClick={() => setCampoAberto('de')} />
            <CampoData label="Até:" valor={ate} onClick={() => setCampoAberto('ate')} />
          </div>
          {erro && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-error)' }}>{erro}</div>}
        </div>
      </Modal>

      {campoAberto && (
        <CalendarPickerModal
          valorAtual={campoAberto === 'de' ? de : ate}
          onClose={() => setCampoAberto(null)}
          onSelect={iso => {
            if (campoAberto === 'de') setDe(iso); else setAte(iso)
            setCampoAberto(null)
          }}
        />
      )}
    </>
  )
}

const CampoData: React.FC<{ label: string; valor: string | null; onClick: () => void }> = ({ label, valor, onClick }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--c-text-2)' }}>{label}</label>
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px', height: '40px', padding: '0 14px',
        borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-input-border)', background: 'var(--c-input-bg)',
        color: valor ? 'var(--c-input-text)' : 'var(--c-input-placeholder)', cursor: 'pointer', fontSize: 'var(--font-size-sm)', width: '100%',
      }}
    >
      <FiCalendar size={15} />
      {valor ? formatarDataBR(valor) : 'Selecionar'}
    </button>
  </div>
)
