import React, { useMemo, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import type { Aula } from '../../lib/types'
import { FiltrosAulas } from './FiltrosAulas'
import { AulaCard } from './AulaCard'
import { CalendarioMensal } from './CalendarioMensal'
import { RelatorioModal } from './RelatorioModal'
import { ConfirmarAulaModal } from './ConfirmarAulaModal'
import { PeriodoModal } from './PeriodoModal'
import { DiaModal } from './DiaModal'
import { DetalhesAulaModal } from './DetalhesAulaModal'
import { aulaPassaFiltroCliente, aulaPassaFiltroData, aulaPassaFiltroMateria, ordenarAulas, type FiltroData, type FiltroPeriodo } from './filtros'

export const AulasTab: React.FC = () => {
  const { aulas } = useProfessorData()

  const [visualizacao, setVisualizacao] = useState<'lista' | 'calendario'>('lista')
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<Set<string>>(new Set())
  const [filtroData, setFiltroData] = useState<FiltroData>('mes')
  const [periodo, setPeriodo] = useState<FiltroPeriodo>({ de: null, ate: null })
  const [buscaCliente, setBuscaCliente] = useState('')
  const [modalPeriodoAberto, setModalPeriodoAberto] = useState(false)

  const [aulaRelatorio, setAulaRelatorio] = useState<Aula | null>(null)
  const [aulaConfirmar, setAulaConfirmar] = useState<Aula | null>(null)
  const [aulaDetalhes, setAulaDetalhes] = useState<Aula | null>(null)
  const [diaSelecionado, setDiaSelecionado] = useState<{ data: string; aulas: Aula[] } | null>(null)

  function handleFiltroDataChange(v: FiltroData) {
    if (v === 'periodo') {
      setModalPeriodoAberto(true)
      return
    }
    setFiltroData(v)
  }

  const aulasFiltradasBase = useMemo(
    () => aulas.filter(a => aulaPassaFiltroMateria(a, materiasSelecionadas) && aulaPassaFiltroCliente(a, buscaCliente)),
    [aulas, materiasSelecionadas, buscaCliente],
  )

  const aulasLista = useMemo(
    () => ordenarAulas(aulasFiltradasBase.filter(a => aulaPassaFiltroData(a, filtroData, periodo))),
    [aulasFiltradasBase, filtroData, periodo],
  )

  return (
    <div className="page-wrap">
      <FiltrosAulas
        visualizacao={visualizacao}
        onVisualizacaoChange={setVisualizacao}
        materiasSelecionadas={materiasSelecionadas}
        onMateriasChange={setMateriasSelecionadas}
        filtroData={filtroData}
        periodo={periodo}
        onFiltroDataChange={handleFiltroDataChange}
        buscaCliente={buscaCliente}
        onBuscaClienteChange={setBuscaCliente}
      />

      {visualizacao === 'lista' ? (
        aulasLista.length === 0 ? (
          <div className="glass" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--c-text-2)' }}>
            <FiCalendar size={28} style={{ marginBottom: '10px', opacity: 0.6 }} />
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Nenhuma aula encontrada para os filtros selecionados.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '16px' }}>
            {aulasLista.map(aula => (
              <AulaCard
                key={aula.id}
                aula={aula}
                onConfirmar={() => setAulaConfirmar(aula)}
                onRelatorio={() => setAulaRelatorio(aula)}
                onDetalhes={() => setAulaDetalhes(aula)}
              />
            ))}
          </div>
        )
      ) : (
        <CalendarioMensal
          aulas={aulasFiltradasBase}
          onDiaClick={(data, aulasDoDia) => setDiaSelecionado({ data, aulas: aulasDoDia })}
          onAulaClick={aula => setAulaDetalhes(aula)}
        />
      )}

      {aulaRelatorio && <RelatorioModal aula={aulaRelatorio} onClose={() => setAulaRelatorio(null)} />}
      {aulaConfirmar && <ConfirmarAulaModal aula={aulaConfirmar} onClose={() => setAulaConfirmar(null)} />}
      {aulaDetalhes && <DetalhesAulaModal aula={aulaDetalhes} onClose={() => setAulaDetalhes(null)} />}
      {modalPeriodoAberto && (
        <PeriodoModal
          periodoAtual={periodo}
          onClose={() => setModalPeriodoAberto(false)}
          onAplicar={novoPeriodo => { setPeriodo(novoPeriodo); setFiltroData('periodo'); setModalPeriodoAberto(false) }}
        />
      )}
      {diaSelecionado && (
        <DiaModal
          data={diaSelecionado.data}
          aulas={diaSelecionado.aulas}
          onClose={() => setDiaSelecionado(null)}
          onConfirmar={aula => { setDiaSelecionado(null); setAulaConfirmar(aula) }}
          onRelatorio={aula => { setDiaSelecionado(null); setAulaRelatorio(aula) }}
          onDetalhes={aula => { setDiaSelecionado(null); setAulaDetalhes(aula) }}
        />
      )}
    </div>
  )
}
