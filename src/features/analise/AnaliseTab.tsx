import React, { useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { FiAward, FiBarChart2, FiChevronDown, FiSearch } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { MESES } from '../../lib/constants'
import { Icone } from '../../lib/iconRegistry'
import { Dropdown } from '../../components/Dropdown'
import { CHART_AMBER, CHART_BLUE, CHART_CATEGORICAL, CHART_INK, CHART_STATUS, CHART_VIOLET, corCategorica } from '../../lib/chartColors'
import { formatarDataBR } from '../../lib/dateUtils'
import {
  aulasComRelatorioNoMes, aulasConcluidasPorMes, conquistasDoMes, distribuicaoEstrelas,
  distribuicaoMaterias, mediaAlunosPorMes, notaMediaPorMes, statusPorMes, todosOsAlunos,
} from './calculosAnalise'

const tooltipStyle = { background: 'rgba(12,20,59,0.95)', border: '1px solid var(--c-border)', borderRadius: 8, fontSize: 12 }
const axisTick = { fill: CHART_INK.muted, fontSize: 11 }

export const AnaliseTab: React.FC = () => {
  const { aulas, certificacoes } = useProfessorData()
  const hoje = new Date()

  const [mesSel, setMesSel] = useState(hoje.getMonth())
  const [anoSel, setAnoSel] = useState(hoje.getFullYear())
  const [mesAplicado, setMesAplicado] = useState(hoje.getMonth())
  const [anoAplicado, setAnoAplicado] = useState(hoje.getFullYear())
  const anos = [hoje.getFullYear(), hoje.getFullYear() - 1, hoje.getFullYear() - 2]

  const aulasPorMes = useMemo(() => aulasConcluidasPorMes(aulas), [aulas])
  const notaMedia = useMemo(() => notaMediaPorMes(aulas), [aulas])
  const estrelas = useMemo(() => distribuicaoEstrelas(aulas), [aulas])
  const materias = useMemo(() => distribuicaoMaterias(aulas), [aulas])
  const statusMensal = useMemo(() => statusPorMes(aulas), [aulas])
  const listaAlunos = useMemo(() => todosOsAlunos(aulas), [aulas])
  const [alunosFiltro, setAlunosFiltro] = useState<Set<string>>(new Set())
  const [alunosDropdownAberto, setAlunosDropdownAberto] = useState(false)
  const { dados: dadosAlunos, alunos } = useMemo(() => mediaAlunosPorMes(aulas, [...alunosFiltro]), [aulas, alunosFiltro])
  const conquistas = useMemo(() => conquistasDoMes(certificacoes, mesAplicado, anoAplicado), [certificacoes, mesAplicado, anoAplicado])
  const relatorioStat = useMemo(() => aulasComRelatorioNoMes(aulas, mesAplicado, anoAplicado), [aulas, mesAplicado, anoAplicado])

  const totalConcluidas = aulasPorMes.reduce((s, p) => s + p.quantidade, 0)
  const totalAvaliadas = estrelas.reduce((s, p) => s + p.quantidade, 0)
  const notaGeral = totalAvaliadas
    ? (estrelas.reduce((s, p, i) => s + p.quantidade * (i + 1), 0) / totalAvaliadas).toFixed(1)
    : '—'

  return (
    <div className="page-wrap page-wrap-wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiBarChart2 size={20} color="var(--c-text-mint)" />
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Análise</h2>
        </div>

        <div className="glass" style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: 'var(--radius-sm)',
              border: 'none', background: 'var(--gradient-accent)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
            }}
          >
            <FiSearch size={13} /> Buscar
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '14px' }}>
        <StatTile label="Aulas concluídas (12 meses)" valor={String(totalConcluidas)} />
        <StatTile label="Nota média das avaliações" valor={notaGeral === '—' ? '—' : `${notaGeral} ★`} />
        <StatTile
          label="Aulas com relatório"
          valor={relatorioStat.percentual === null ? '—' : `${relatorioStat.percentual}%`}
          sub={`${relatorioStat.comRelatorio}/${relatorioStat.total} em ${MESES[mesAplicado]}`}
        />
      </div>

      <div className="grid grid-cols-2" style={{ gap: '16px' }}>
        <ChartCard titulo="Número de aulas dadas por mês">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={aulasPorMes} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
              <XAxis dataKey="mes" tick={axisTick} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
              <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--c-text-2)' }} />
              <Line type="monotone" dataKey="quantidade" name="Aulas" stroke={CHART_BLUE} strokeWidth={2} dot={{ r: 3, fill: CHART_BLUE }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Avaliações de clientes (estrelas)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={estrelas} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
              <XAxis dataKey="estrelas" tick={axisTick} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
              <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--c-text-2)' }} />
              <Bar dataKey="quantidade" name="Avaliações" fill={CHART_AMBER} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Aulas por matéria">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={materias} dataKey="quantidade" nameKey="materia" innerRadius={48} outerRadius={78} paddingAngle={2} stroke="var(--c-bg)" strokeWidth={2}>
                  {materias.map((m, i) => <Cell key={m.materia} fill={corCategorica(i)} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <Legenda itens={materias.map((m, i) => ({ label: m.materia, valor: m.quantidade, cor: corCategorica(i) }))} />
          </div>
        </ChartCard>

        <ChartCard titulo="Status das aulas por mês">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statusMensal} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
              <XAxis dataKey="mes" tick={axisTick} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
              <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--c-text-2)' }} />
              <Legend wrapperStyle={{ fontSize: 11, color: CHART_INK.secondary }} />
              <Bar dataKey="concluidas" name="Concluídas" stackId="s" fill={CHART_STATUS.good} radius={[0, 0, 0, 0]} />
              <Bar dataKey="agendadas" name="Agendadas" stackId="s" fill={CHART_STATUS.warning} />
              <Bar dataKey="canceladas" name="Canceladas" stackId="s" fill={CHART_STATUS.critical} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo={`Conquistas em ${MESES[mesAplicado]}`}>
          {conquistas.length === 0 ? (
            <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--c-text-3)' }}>
              <FiAward size={22} style={{ marginBottom: '8px', opacity: 0.6 }} />
              <p style={{ margin: 0, fontSize: '12.5px' }}>Nenhuma conquista neste mês.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
              {conquistas.map(c => (
                <div key={c.id} className="glass-mint" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-accent)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icone nome={c.icone} size={17} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-text-1)' }}>{c.titulo}</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-text-mint)' }}>Conquistado em {formatarDataBR(c.conquistadoEm!)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ChartCard>

        <ChartCard titulo="Evolução da nota média mensal">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={notaMedia} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
              <XAxis dataKey="mes" tick={axisTick} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
              <YAxis domain={[0, 5]} tick={axisTick} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--c-text-2)' }} />
              <Line type="monotone" dataKey="nota" name="Nota média" stroke={CHART_VIOLET} strokeWidth={2} dot={{ r: 3, fill: CHART_VIOLET }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          titulo="Média dos meus alunos"
          fullWidth
          acao={
            <Dropdown
              open={alunosDropdownAberto}
              onOpenChange={setAlunosDropdownAberto}
              align="right"
              minWidth={220}
              trigger={
                <button
                  type="button"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-1)',
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {alunosFiltro.size === 0 ? 'Todos os alunos' : `${alunosFiltro.size} selecionado(s)`}
                  <FiChevronDown size={13} />
                </button>
              }
            >
              <div style={{ padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-2)' }}>Filtrar alunos</span>
                  <button type="button" onClick={() => setAlunosFiltro(new Set())} style={{ background: 'none', border: 'none', color: 'var(--c-text-mint)', fontSize: '11px', cursor: 'pointer' }}>Limpar</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '220px', overflowY: 'auto' }}>
                  {listaAlunos.map(aluno => (
                    <label key={aluno} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--c-text-1)', cursor: 'pointer', padding: '4px 2px' }}>
                      <input
                        type="checkbox"
                        checked={alunosFiltro.has(aluno)}
                        onChange={() => {
                          const novo = new Set(alunosFiltro)
                          if (novo.has(aluno)) novo.delete(aluno); else novo.add(aluno)
                          setAlunosFiltro(novo)
                        }}
                      />
                      {aluno}
                    </label>
                  ))}
                </div>
              </div>
            </Dropdown>
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosAlunos} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
              <XAxis dataKey="mes" tick={axisTick} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
              <YAxis domain={[0, 5]} tick={axisTick} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: 'var(--c-text-2)' }} />
              <Legend wrapperStyle={{ fontSize: 10, color: CHART_INK.secondary }} />
              {alunos.map((aluno, i) => (
                <Line key={aluno} type="monotone" dataKey={aluno} stroke={CHART_CATEGORICAL[i % CHART_CATEGORICAL.length]} strokeWidth={2} dot={{ r: 3 }} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

const ChartCard: React.FC<{ titulo: string; children: React.ReactNode; fullWidth?: boolean; acao?: React.ReactNode }> = ({ titulo, children, fullWidth, acao }) => (
  <div className="glass" style={{ padding: '18px', gridColumn: fullWidth ? '1 / -1' : undefined }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
      <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--c-text-1)' }}>{titulo}</h3>
      {acao}
    </div>
    {children}
  </div>
)

const StatTile: React.FC<{ label: string; valor: string; sub?: string }> = ({ label, valor, sub }) => (
  <div className="glass" style={{ padding: '16px 18px' }}>
    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--c-text-1)' }}>{valor}</div>
    {sub && <div style={{ fontSize: '11px', color: 'var(--c-text-3)', marginTop: '4px' }}>{sub}</div>}
  </div>
)

const Legenda: React.FC<{ itens: { label: string; valor: number; cor: string }[] }> = ({ itens }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '140px' }}>
    {itens.map(item => (
      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--c-text-2)' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.cor, flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{item.label}</span>
        <span style={{ fontWeight: 700, color: 'var(--c-text-1)' }}>{item.valor}</span>
      </div>
    ))}
  </div>
)

const selectStyle: React.CSSProperties = {
  height: '34px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-select-border)',
  background: 'var(--c-select-bg)', color: 'var(--c-select-text)', fontSize: '12.5px',
}
