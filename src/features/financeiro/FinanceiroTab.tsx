import React, { useMemo, useState } from 'react'
import { FiSearch, FiTrendingUp, FiClock, FiDollarSign, FiCalendar, FiMessageCircle } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { MESES } from '../../lib/constants'
import { diaSemanaAbrev, formatarDataCurta, formatarMinutos, formatarMoeda, primeirosNomes } from '../../lib/dateUtils'
import { getStatusInfo } from '../aulas/statusInfo'
import { aulasDoMes as filtrarAulasDoMes, pagamentosDoMes as filtrarPagamentosDoMes, calcularTotalReceberDoMes } from './calculos'
import { Acompanhamento } from './Acompanhamento'

export const FinanceiroTab: React.FC = () => {
  const { aulas, pagamentos } = useProfessorData()
  const hoje = new Date()

  const [mesSel, setMesSel] = useState(hoje.getMonth())
  const [anoSel, setAnoSel] = useState(hoje.getFullYear())
  const [mesAplicado, setMesAplicado] = useState(hoje.getMonth())
  const [anoAplicado, setAnoAplicado] = useState(hoje.getFullYear())

  const anos = [hoje.getFullYear(), hoje.getFullYear() - 1, hoje.getFullYear() - 2]

  const aulasFiltradas = useMemo(
    () => filtrarAulasDoMes(aulas, mesAplicado, anoAplicado).sort((a, b) => a.data.localeCompare(b.data)),
    [aulas, mesAplicado, anoAplicado],
  )

  const pagamentosFiltrados = useMemo(
    () => filtrarPagamentosDoMes(pagamentos, mesAplicado, anoAplicado).sort((a, b) => a.data.localeCompare(b.data)),
    [pagamentos, mesAplicado, anoAplicado],
  )

  const totalHoras = aulasFiltradas.reduce((soma, a) => soma + a.duracaoMin, 0)
  const totalReceber = useMemo(
    () => calcularTotalReceberDoMes(aulas, pagamentos, mesAplicado, anoAplicado),
    [aulas, pagamentos, mesAplicado, anoAplicado],
  )

  const linhas = useMemo(() => {
    const linhasAulas = aulasFiltradas.map(a => ({
      tipo: 'aula' as const,
      data: a.data,
      cliente: primeirosNomes(a.nomeCliente),
      materia: a.materia,
      duracao: a.duracao,
      status: a.statusAula,
      valor: a.valorAula,
    }))
    const linhasPagamentos = pagamentosFiltrados.map(p => ({
      tipo: 'pagamento' as const,
      data: p.data,
      cliente: p.descricao,
      materia: '',
      duracao: '',
      status: p.tipo === 'entrada' ? 'Entrada' : 'Saída',
      valor: p.valor,
    }))
    return [...linhasAulas, ...linhasPagamentos].sort((a, b) => a.data.localeCompare(b.data))
  }, [aulasFiltradas, pagamentosFiltrados])

  return (
    <div className="page-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiTrendingUp size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Financeiro</h2>
      </div>

      <div className="glass" style={{ padding: '14px 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--c-text-2)' }}>Período:</span>
        <select value={mesSel} onChange={e => setMesSel(Number(e.target.value))} style={selectStyle}>
          {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
        </select>
        <select value={anoSel} onChange={e => setAnoSel(Number(e.target.value))} style={selectStyle}>
          {anos.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button
          type="button"
          onClick={() => { setMesAplicado(mesSel); setAnoAplicado(anoSel) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--radius-sm)',
            border: 'none', background: 'var(--gradient-accent)', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
          }}
        >
          <FiSearch size={14} /> Buscar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '14px' }}>
        <ResumoCard icon={<FiCalendar size={18} />} label="Aulas realizadas" valor={String(aulasFiltradas.length)} sub={`em ${MESES[mesAplicado]} de ${anoAplicado}`} />
        <ResumoCard icon={<FiClock size={18} />} label="Total de horas" valor={formatarMinutos(totalHoras)} sub={`em ${MESES[mesAplicado]} de ${anoAplicado}`} />
        <ResumoCard icon={<FiDollarSign size={18} />} label="Total a receber" valor={formatarMoeda(totalReceber)} sub={`em ${MESES[mesAplicado]} de ${anoAplicado}`} destaque />
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        {linhas.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--c-text-2)' }}>
            <FiCalendar size={26} style={{ marginBottom: '10px', opacity: 0.6 }} />
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Nenhum registro encontrado em {MESES[mesAplicado]} de {anoAplicado}.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--c-border)' }}>
                  {['Data', 'Cliente', 'Matéria', 'Duração', 'Status', 'Valor'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--c-text-3)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {linhas.map((linha, i) => {
                  const status = getStatusInfo(linha.status)
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--c-border-sm)' }}>
                      <td style={cellStyle}>{diaSemanaAbrev(linha.data)} - {formatarDataCurta(linha.data)}</td>
                      <td style={cellStyle}>{linha.cliente}</td>
                      <td style={cellStyle}>{linha.materia || '—'}</td>
                      <td style={cellStyle}>{linha.duracao || '—'}</td>
                      <td style={cellStyle}>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', color: status.cor, background: status.bg }}>
                          {status.label}
                        </span>
                      </td>
                      <td style={{ ...cellStyle, fontWeight: 700, color: linha.valor ? 'var(--c-btn-success-text)' : 'var(--c-text-3)' }}>
                        {linha.valor ? formatarMoeda(linha.tipo === 'pagamento' && linha.status === 'Saída' ? -linha.valor : linha.valor) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderTop: '1px solid var(--c-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--c-text-2)' }}>
            {aulasFiltradas.length} aula(s) · {formatarMinutos(totalHoras)} · Total: {formatarMoeda(totalReceber)}
          </span>
          <a
            href="https://wa.me/5582988862575"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: 'var(--radius-sm)',
              background: '#25d366', color: '#fff', fontSize: '12px', fontWeight: 700, textDecoration: 'none',
            }}
          >
            <FiMessageCircle size={14} /> Há algo de errado? Contate a Central Master
          </a>
        </div>
      </div>

      <Acompanhamento mes={mesAplicado} ano={anoAplicado} />
    </div>
  )
}

const ResumoCard: React.FC<{ icon: React.ReactNode; label: string; valor: string; sub: string; destaque?: boolean }> = ({ icon, label, valor, sub, destaque }) => (
  <div className={destaque ? 'glass-mint' : 'glass'} style={{ padding: '18px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-text-mint)', marginBottom: '10px' }}>
      {icon}
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-2)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</span>
    </div>
    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--c-text-1)' }}>{valor}</div>
    <div style={{ fontSize: '11px', color: 'var(--c-text-3)', marginTop: '4px' }}>{sub}</div>
  </div>
)

const selectStyle: React.CSSProperties = {
  height: '36px', padding: '0 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-select-border)',
  background: 'var(--c-select-bg)', color: 'var(--c-select-text)', fontSize: '13px',
}

const cellStyle: React.CSSProperties = { padding: '10px 14px', color: 'var(--c-text-1)', whiteSpace: 'nowrap' }
