import React, { useState } from 'react'
import { FiBookOpen, FiCalendar, FiList, FiGrid, FiSearch, FiSliders, FiX } from 'react-icons/fi'
import { Dropdown } from '../../components/Dropdown'
import { MATERIAS_FILTRO } from '../../lib/constants'
import { formatarDataBR } from '../../lib/dateUtils'
import type { FiltroData, FiltroPeriodo } from './filtros'

const OPCOES_DATA: { value: FiltroData; label: string }[] = [
  { value: 'todas', label: 'Todas as datas' },
  { value: 'hoje', label: 'Hoje' },
  { value: 'semana', label: 'Esta semana' },
  { value: 'mes', label: 'Este mês' },
  { value: 'periodo', label: 'Período específico…' },
]

interface FiltrosAulasProps {
  visualizacao: 'lista' | 'calendario'
  onVisualizacaoChange: (v: 'lista' | 'calendario') => void
  materiasSelecionadas: Set<string>
  onMateriasChange: (m: Set<string>) => void
  filtroData: FiltroData
  periodo: FiltroPeriodo
  onFiltroDataChange: (v: FiltroData) => void
  buscaCliente: string
  onBuscaClienteChange: (v: string) => void
}

export const FiltrosAulas: React.FC<FiltrosAulasProps> = ({
  visualizacao, onVisualizacaoChange, materiasSelecionadas, onMateriasChange,
  filtroData, periodo, onFiltroDataChange, buscaCliente, onBuscaClienteChange,
}) => {
  const [materiaAberto, setMateriaAberto] = useState(false)
  const [dataAberto, setDataAberto] = useState(false)

  function toggleMateria(materia: string) {
    const novo = new Set(materiasSelecionadas)
    if (novo.has(materia)) novo.delete(materia); else novo.add(materia)
    onMateriasChange(novo)
  }

  const labelMateria = materiasSelecionadas.size === 0
    ? 'Todas as matérias'
    : materiasSelecionadas.size === 1
      ? [...materiasSelecionadas][0]
      : `${materiasSelecionadas.size} matérias`

  const labelData = filtroData === 'periodo' && periodo.de && periodo.ate
    ? `${formatarDataBR(periodo.de).slice(0, 5)} – ${formatarDataBR(periodo.ate).slice(0, 5)}`
    : OPCOES_DATA.find(o => o.value === filtroData)?.label || 'Este mês'

  const filtrosAtivos = materiasSelecionadas.size > 0 || filtroData !== 'mes' || buscaCliente.trim() !== ''

  function limparFiltros() {
    onMateriasChange(new Set())
    onFiltroDataChange('mes')
    onBuscaClienteChange('')
  }

  return (
    <div className="glass" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-text-2)' }}>
          <FiSliders size={15} />
          <span style={{ fontSize: '13px', fontWeight: 700 }}>Filtros</span>
          {filtrosAtivos && (
            <button
              type="button"
              onClick={limparFiltros}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none',
                color: 'var(--c-text-mint)', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', padding: '2px 6px',
              }}
            >
              <FiX size={11} /> Limpar
            </button>
          )}
        </div>

        <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)', overflow: 'hidden', flexShrink: 0 }}>
          <ToggleBtn ativo={visualizacao === 'lista'} onClick={() => onVisualizacaoChange('lista')} icon={<FiList size={14} />} label="Lista" />
          <ToggleBtn ativo={visualizacao === 'calendario'} onClick={() => onVisualizacaoChange('calendario')} icon={<FiGrid size={14} />} label="Calendário" />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'stretch' }}>
        <div style={{ position: 'relative', flex: '2 1 220px', minWidth: '200px' }}>
          <FiSearch size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-3)' }} />
          <input
            value={buscaCliente}
            onChange={e => onBuscaClienteChange(e.target.value)}
            placeholder="Busque aulas de um cliente..."
            style={{
              width: '100%', height: '42px', padding: '0 14px 0 38px', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--c-input-border)', background: 'var(--c-input-bg)', color: 'var(--c-input-text)', fontSize: '13px',
              boxSizing: 'border-box',
            }}
          />
          {buscaCliente && (
            <button type="button" onClick={() => onBuscaClienteChange('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--c-text-3)', cursor: 'pointer', display: 'flex' }}>
              <FiX size={14} />
            </button>
          )}
        </div>

        <Dropdown
          open={materiaAberto}
          onOpenChange={setMateriaAberto}
          minWidth={230}
          trigger={<FiltroPill icon={<FiBookOpen size={14} />} label={labelMateria} ativo={materiasSelecionadas.size > 0} />}
        >
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-2)' }}>Selecionar matérias</span>
              <button type="button" onClick={() => onMateriasChange(new Set())} style={{ background: 'none', border: 'none', color: 'var(--c-text-mint)', fontSize: '11px', cursor: 'pointer' }}>Limpar</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {MATERIAS_FILTRO.map(materia => (
                <label key={materia} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--c-text-1)', cursor: 'pointer', padding: '4px 2px' }}>
                  <input type="checkbox" checked={materiasSelecionadas.has(materia)} onChange={() => toggleMateria(materia)} />
                  {materia}
                </label>
              ))}
            </div>
          </div>
        </Dropdown>

        <Dropdown
          open={dataAberto}
          onOpenChange={setDataAberto}
          minWidth={200}
          align="right"
          trigger={<FiltroPill icon={<FiCalendar size={14} />} label={labelData} ativo={filtroData !== 'mes'} />}
        >
          <div style={{ padding: '6px' }}>
            {OPCOES_DATA.map(opcao => (
              <button
                key={opcao.value}
                type="button"
                onClick={() => { onFiltroDataChange(opcao.value); setDataAberto(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                  background: opcao.value === filtroData ? 'var(--c-btn-secondary-hover)' : 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--c-text-1)', fontSize: '13px',
                }}
              >
                {opcao.label}
              </button>
            ))}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

const ToggleBtn: React.FC<{ ativo: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ ativo, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 15px', border: 'none', cursor: 'pointer',
      background: ativo ? 'var(--gradient-accent)' : 'transparent', color: ativo ? '#fff' : 'var(--c-text-2)',
      fontSize: '12px', fontWeight: 700, transition: 'background 150ms, color 150ms',
    }}
  >
    {icon}{label}
  </button>
)

const FiltroPill: React.FC<{ icon: React.ReactNode; label: string; ativo?: boolean }> = ({ icon, label, ativo }) => (
  <button
    type="button"
    style={{
      display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', height: '42px', borderRadius: 'var(--radius-full)',
      border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
      background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
      color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
      fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
    }}
  >
    {icon}{label}
  </button>
)
