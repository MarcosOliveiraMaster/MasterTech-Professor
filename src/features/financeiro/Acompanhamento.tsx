import React, { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiActivity } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { MESES } from '../../lib/constants'
import { formatarMoeda, toISO } from '../../lib/dateUtils'
import { CHART_BLUE, CHART_INK, CHART_MINT } from '../../lib/chartColors'
import { calcularTotalReceberDoDia, calcularTotalReceberDoMes } from './calculos'

interface AcompanhamentoProps {
  mes: number
  ano: number
}

type Visao = 'mes' | 'ano'

export const Acompanhamento: React.FC<AcompanhamentoProps> = ({ mes, ano }) => {
  const { aulas, pagamentos } = useProfessorData()
  const [visao, setVisao] = useState<Visao>('ano')

  const dadosAno = useMemo(() => {
    const hoje = new Date()
    const pontos = []
    for (let i = 11; i >= 0; i--) {
      const ref = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
      const valor = calcularTotalReceberDoMes(aulas, pagamentos, ref.getMonth(), ref.getFullYear())
      pontos.push({ eixo: `${MESES[ref.getMonth()].slice(0, 3)}/${String(ref.getFullYear()).slice(2)}`, valor })
    }
    return pontos
  }, [aulas, pagamentos])

  const dadosMes = useMemo(() => {
    const diasNoMes = new Date(ano, mes + 1, 0).getDate()
    return Array.from({ length: diasNoMes }, (_, i) => {
      const dia = i + 1
      const iso = toISO(new Date(ano, mes, dia))
      return { eixo: String(dia), valor: calcularTotalReceberDoDia(aulas, pagamentos, iso) }
    })
  }, [aulas, pagamentos, mes, ano])

  const dados = visao === 'ano' ? dadosAno : dadosMes
  const cor = visao === 'ano' ? CHART_BLUE : CHART_MINT

  return (
    <div className="glass" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiActivity size={16} color="var(--c-text-mint)" />
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--c-text-1)' }}>
            Acompanhamento
          </h3>
        </div>
        <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
          <VisaoBtn ativo={visao === 'mes'} onClick={() => setVisao('mes')} label={`Aulas de ${MESES[mes]}`} />
          <VisaoBtn ativo={visao === 'ano'} onClick={() => setVisao('ano')} label="Ano" />
        </div>
      </div>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={dados} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
            <XAxis dataKey="eixo" tick={{ fill: CHART_INK.muted, fontSize: 11 }} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} interval={visao === 'mes' ? 2 : 0} />
            <YAxis
              tick={{ fill: CHART_INK.muted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={v => `R$${v}`}
            />
            <Tooltip
              contentStyle={{ background: 'rgba(12,20,59,0.95)', border: '1px solid var(--c-border)', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: 'var(--c-text-2)' }}
              formatter={(value) => [formatarMoeda(Number(value)), 'Recebido']}
              labelFormatter={v => visao === 'mes' ? `Dia ${v}` : v}
            />
            <Line type="monotone" dataKey="valor" stroke={cor} strokeWidth={2} dot={visao === 'mes' ? false : { r: 3, fill: cor }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const VisaoBtn: React.FC<{ ativo: boolean; onClick: () => void; label: string }> = ({ ativo, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '8px 14px', border: 'none', cursor: 'pointer',
      background: ativo ? 'var(--gradient-accent)' : 'transparent', color: ativo ? '#fff' : 'var(--c-text-2)',
      fontSize: '12px', fontWeight: 700,
    }}
  >
    {label}
  </button>
)
