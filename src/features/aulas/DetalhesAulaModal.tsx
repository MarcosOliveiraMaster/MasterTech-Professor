import React, { useMemo, useState } from 'react'
import {
  FiBookOpen, FiCheck, FiCopy, FiExternalLink, FiFileText,
  FiHome, FiImage, FiMapPin, FiPaperclip, FiUser, FiUserCheck,
} from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { ClienteMap } from '../../components/ClienteMap'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { formatarDataBR, formatarMoeda, primeirosNomes } from '../../lib/dateUtils'
import { urlGoogleMaps } from '../../lib/constants'
import { getStatusInfo } from './statusInfo'
import type { Aula, CategoriaMaterialCliente } from '../../lib/types'

const CATEGORIAS: { id: CategoriaMaterialCliente; label: string; icon: React.ReactNode }[] = [
  { id: 'imagens-livro', label: 'Imagens do livro', icon: <FiImage size={18} /> },
  { id: 'pdf-assuntos', label: 'PDF dos assuntos', icon: <FiFileText size={18} /> },
  { id: 'pdf-revisoes', label: 'PDF de revisões', icon: <FiFileText size={18} /> },
  { id: 'outro', label: 'Outros materiais', icon: <FiPaperclip size={18} /> },
]

export const DetalhesAulaModal: React.FC<{ aula: Aula; onClose: () => void }> = ({ aula, onClose }) => {
  const { professor, clientes, aulas } = useProfessorData()
  const [categoriaAberta, setCategoriaAberta] = useState<CategoriaMaterialCliente | null>(null)
  const [copiado, setCopiado] = useState(false)

  const cliente = useMemo(() => clientes.find(c => c.nome === aula.nomeCliente), [clientes, aula.nomeCliente])

  const aulasDoAtendimento = useMemo(
    () => aulas.filter(a => a.nomeCliente === aula.nomeCliente).sort((a, b) => a.data.localeCompare(b.data)),
    [aulas, aula.nomeCliente],
  )
  const concluidas = aulasDoAtendimento.filter(a => a.statusAula.toLowerCase() === 'concluída').length

  async function copiarEndereco() {
    if (!cliente) return
    try {
      await navigator.clipboard.writeText(cliente.endereco)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Clipboard indisponível — ignora silenciosamente no ambiente mockado.
    }
  }

  return (
    <Modal title="Detalhes da Aula" onClose={onClose} size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="grid grid-cols-2" style={{ gap: '14px' }}>
          <Campo icon={<FiUser size={14} />} label="Cliente" valor={aula.nomeCliente} />
          <Campo icon={<FiUserCheck size={14} />} label="Estudante" valor={aula.estudante} />
          <Campo icon={<FiHome size={14} />} label="Escola" valor={cliente?.nomeEscola || '—'} />
          <Campo icon={<FiBookOpen size={14} />} label="Disciplina" valor={aula.materia} />
        </div>

        {cliente && (
          <InfoBox titulo="Informações sobre o atendimento">
            {cliente.informacoesAtendimento || 'Nenhuma informação registrada.'}
          </InfoBox>
        )}

        {cliente && (
          <div>
            <SecaoTitulo>Materiais disponíveis</SecaoTitulo>
            <div className="grid grid-cols-4" style={{ gap: '8px' }}>
              {CATEGORIAS.map(cat => {
                const itens = cliente.materiais.filter(m => m.categoria === cat.id)
                const aberto = categoriaAberta === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoriaAberta(aberto ? null : cat.id)}
                    disabled={itens.length === 0}
                    className="glass-sm"
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 6px',
                      cursor: itens.length ? 'pointer' : 'default', opacity: itens.length ? 1 : 0.4,
                      border: aberto ? '1px solid var(--c-border-mint)' : undefined, background: aberto ? 'var(--c-glass-bg-mint)' : undefined,
                    }}
                  >
                    <span style={{ color: 'var(--c-text-mint)' }}>{cat.icon}</span>
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--c-text-2)', textAlign: 'center' }}>{cat.label}</span>
                    <span style={{ fontSize: '10px', color: 'var(--c-text-3)' }}>{itens.length}</span>
                  </button>
                )
              })}
            </div>
            {categoriaAberta && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                {cliente.materiais.filter(m => m.categoria === categoriaAberta).map(m => (
                  <div key={m.id} className="glass-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--c-text-1)' }}>
                    <FiFileText size={13} color="var(--c-text-mint)" />
                    {m.titulo} <span style={{ color: 'var(--c-text-3)' }}>({m.arquivoNome})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {cliente && (
          <div>
            <SecaoTitulo>Localização</SecaoTitulo>
            <div className="grid grid-cols-2" style={{ gap: '14px', marginBottom: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <FiMapPin size={13} color="var(--c-text-mint)" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>Endereço</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--c-text-1)', flex: 1 }}>{cliente.endereco}</span>
                  <button type="button" onClick={copiarEndereco} style={btnCopiarStyle}>
                    {copiado ? <FiCheck size={12} color="var(--c-btn-success-text)" /> : <FiCopy size={12} />}
                  </button>
                </div>
              </div>
              <Campo label="Bairro" valor={cliente.bairro} />
              <Campo label="Ponto de Referência" valor={cliente.pontoReferencia} />
            </div>

            <div style={{ position: 'relative' }}>
              <ClienteMap
                clienteLat={cliente.lat}
                clienteLng={cliente.lng}
                clienteLabel={`${cliente.nome} · ${cliente.bairro}`}
                professorLat={professor.lat}
                professorLng={professor.lng}
                professorLabel={professor.nome}
              />
              <a
                href={urlGoogleMaps(cliente.lat, cliente.lng)}
                target="_blank"
                rel="noreferrer"
                style={{
                  position: 'absolute', top: '10px', right: '10px', zIndex: 500, display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(12,20,59,0.85)', border: '1px solid var(--c-border)',
                  color: '#fff', fontSize: '11px', fontWeight: 700, textDecoration: 'none',
                }}
              >
                <FiExternalLink size={12} /> Abrir no Google Maps
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2" style={{ gap: '14px' }}>
          <Campo label="Duração" valor={aula.duracao} />
          <Campo label="Valor da aula" valor={formatarMoeda(aula.valorAula)} />
        </div>

        <InfoBox titulo="Conteúdos por escrito">
          {aula.conteudosEstudados || aula.descricao || 'Relatório ainda não preenchido para esta aula.'}
        </InfoBox>

        <div>
          <SecaoTitulo>{`Aulas do mesmo atendimento — ${concluidas}/${aulasDoAtendimento.length} concluídas`}</SecaoTitulo>
          <div className="glass-sm" style={{ maxHeight: '220px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <tbody>
                {aulasDoAtendimento.map(a => {
                  const status = getStatusInfo(a.statusAula)
                  const atual = a.id === aula.id
                  return (
                    <tr key={a.id} style={{ borderBottom: '1px solid var(--c-border-sm)', background: atual ? 'var(--c-glass-bg-mint)' : undefined }}>
                      <td style={{ padding: '8px 12px', color: 'var(--c-text-1)' }}>{formatarDataBR(a.data)}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--c-text-3)' }}>{primeirosNomes(a.estudante)}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', color: status.cor, background: status.bg }}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {cliente?.recomendacoes && (
          <InfoBox titulo="Recomendações da família">{cliente.recomendacoes}</InfoBox>
        )}
      </div>
    </Modal>
  )
}

const Campo: React.FC<{ icon?: React.ReactNode; label: string; valor: string }> = ({ icon, label, valor }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
      {icon && <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>}
      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase' }}>{label}</span>
    </div>
    <span style={{ fontSize: '13px', color: 'var(--c-text-1)' }}>{valor || '—'}</span>
  </div>
)

const SecaoTitulo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', marginBottom: '8px' }}>{children}</div>
)

const InfoBox: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => (
  <div className="glass-sm" style={{ padding: '12px 14px' }}>
    <SecaoTitulo>{titulo}</SecaoTitulo>
    <p style={{ margin: 0, fontSize: '13px', color: 'var(--c-text-1)', lineHeight: 1.5 }}>{children}</p>
  </div>
)

const btnCopiarStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-2)', cursor: 'pointer', flexShrink: 0,
}
