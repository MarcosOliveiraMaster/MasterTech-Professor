import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiCheck, FiCopy, FiHome, FiMapPin, FiMessageSquare, FiUser, FiUserCheck, FiUsers } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { ClienteMap } from '../../components/ClienteMap'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { Icone } from '../../lib/iconRegistry'
import { NEURODIVERGENCIAS, PERFIL_CRIANCA } from '../../lib/constants'
import { CHART_INK, CHART_VIOLET } from '../../lib/chartColors'
import type { Cliente } from '../../lib/types'

export const FichaClienteModal: React.FC<{ cliente: Cliente; onClose: () => void }> = ({ cliente, onClose }) => {
  const { professor } = useProfessorData()
  const [copiado, setCopiado] = useState(false)

  async function copiarEndereco() {
    try {
      await navigator.clipboard.writeText(cliente.endereco)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Clipboard indisponível — ignora silenciosamente no ambiente mockado.
    }
  }

  const perfilAtivo = PERFIL_CRIANCA.filter(p => cliente.perfilEstudante.includes(p.id))
  const atendimentoAtivo = NEURODIVERGENCIAS.filter(n => cliente.atendimentoEspecial.includes(n.id))

  return (
    <Modal title="Ficha do Cliente" onClose={onClose} size="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="grid grid-cols-2" style={{ gap: '14px' }}>
          <Campo icon={<FiUser size={15} />} label="Nome" valor={cliente.nome} />
          <Campo icon={<FiUserCheck size={15} />} label="Nome do Estudante" valor={cliente.nomeEstudante} />
          <Campo icon={<FiHome size={15} />} label="Escola" valor={cliente.nomeEscola} />
        </div>

        {(perfilAtivo.length > 0 || atendimentoAtivo.length > 0) && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FiUsers size={14} color="var(--c-text-mint)" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>Perfil do estudante</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {perfilAtivo.map(p => (
                <span key={p.id} style={chipStyle('var(--c-border)', 'var(--c-glass-bg-sm)', 'var(--c-text-1)')}>
                  <Icone nome={p.icone} size={13} /> {p.label}
                </span>
              ))}
              {atendimentoAtivo.map(a => (
                <span key={a.id} style={chipStyle('var(--c-border-mint)', 'var(--c-glass-bg-mint)', 'var(--c-text-mint)')}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {cliente.informacoesAtendimento && (
          <InfoBox titulo="Informações sobre o atendimento">{cliente.informacoesAtendimento}</InfoBox>
        )}

        {cliente.recomendacoes && (
          <InfoBox titulo="Recomendações" icon={<FiMessageSquare size={13} />}>{cliente.recomendacoes}</InfoBox>
        )}

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <FiMapPin size={15} color="var(--c-text-mint)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>Endereço</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', color: 'var(--c-text-1)', flex: 1 }}>{cliente.endereco}</span>
            <button
              type="button"
              onClick={copiarEndereco}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-2)',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer', flexShrink: 0,
              }}
            >
              {copiado ? <FiCheck size={13} color="var(--c-btn-success-text)" /> : <FiCopy size={13} />}
              {copiado ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        <Campo label="Ponto de Referência" valor={cliente.pontoReferencia} />

        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', marginBottom: '8px' }}>Localização</div>
          <ClienteMap
            clienteLat={cliente.lat}
            clienteLng={cliente.lng}
            clienteLabel={`${cliente.nome} · ${cliente.bairro}`}
            professorLat={professor.lat}
            professorLng={professor.lng}
            professorLabel={professor.nome}
          />
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '11px', color: 'var(--c-text-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#22a578' }} /> Local da aula
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#3d8fc9' }} /> Você
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Evolução das notas do aluno
          </div>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={cliente.notasEvolucao} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid stroke={CHART_INK.grid} vertical={false} />
                <XAxis dataKey="mes" tick={{ fill: CHART_INK.muted, fontSize: 11 }} axisLine={{ stroke: CHART_INK.grid }} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: CHART_INK.muted, fontSize: 11 }} axisLine={false} tickLine={false} width={26} />
                <Tooltip
                  contentStyle={{ background: 'rgba(12,20,59,0.95)', border: '1px solid var(--c-border)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'var(--c-text-2)' }}
                />
                <Line type="monotone" dataKey="nota" name="Nota" stroke={CHART_VIOLET} strokeWidth={2} dot={{ r: 3, fill: CHART_VIOLET }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function chipStyle(borda: string, fundo: string, cor: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: 'var(--radius-full)',
    border: `1px solid ${borda}`, background: fundo, color: cor, fontSize: '12px', fontWeight: 600,
  }
}

const Campo: React.FC<{ icon?: React.ReactNode; label: string; valor: string }> = ({ icon, label, valor }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      {icon && <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>}
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>{label}</span>
    </div>
    <span style={{ fontSize: '14px', color: 'var(--c-text-1)' }}>{valor}</span>
  </div>
)

const InfoBox: React.FC<{ titulo: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ titulo, icon, children }) => (
  <div className="glass-sm" style={{ padding: '12px 14px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      {icon && <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>}
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>{titulo}</span>
    </div>
    <p style={{ margin: 0, fontSize: '13px', color: 'var(--c-text-1)', lineHeight: 1.5 }}>{children}</p>
  </div>
)
