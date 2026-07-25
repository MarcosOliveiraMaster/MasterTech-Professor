import React, { useState } from 'react'
import { FiKey, FiSave } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { useToast } from '../../lib/ToastContext'
import type { Professor } from '../../lib/types'
import { Button } from '../../components/Button'
import { AlterarSenhaModal } from '../../components/AlterarSenhaModal'
import { GeralSubTab } from './GeralSubTab'
import { AulasSubTab } from './AulasSubTab'
import { ExperienciaSubTab } from './ExperienciaSubTab'
import { PagamentoSubTab } from './PagamentoSubTab'
import { FitSubTab } from './FitSubTab'
import { ConfirmarSalvarModal } from './ConfirmarSalvarModal'

const SUBTABS = ['Geral', 'Aulas', 'Experiência', 'FIT', 'Pagamento'] as const
type SubTab = typeof SUBTABS[number]

export const PerfilTab: React.FC = () => {
  const { professor, updateProfessor } = useProfessorData()
  const { showToast } = useToast()

  const [subTab, setSubTab] = useState<SubTab>('Geral')
  const [draft, setDraft] = useState<Professor>(professor)
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false)
  const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [salvoAs, setSalvoAs] = useState<string | null>(null)

  function handlePatch(patch: Partial<Professor>) {
    setDraft(prev => ({ ...prev, ...patch }))
  }

  async function handleConfirmarSalvar() {
    setSalvando(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateProfessor(draft)
    setSalvando(false)
    setModalConfirmarAberto(false)
    const agora = new Date()
    setSalvoAs(`${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`)
    showToast('✅ Perfil atualizado com sucesso!', 'success')
  }

  return (
    <div className="page-wrap page-wrap-narrow" style={{ paddingBottom: '110px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Meu Perfil</h2>
        <Button variant="secondary" onClick={() => setModalSenhaAberto(true)}>
          <FiKey size={14} style={{ marginRight: '6px' }} />
          Alterar Senha
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--c-border)' }}>
        {SUBTABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setSubTab(tab)}
            style={{
              padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 700,
              color: subTab === tab ? 'var(--c-text-mint)' : 'var(--c-text-2)',
              borderBottom: subTab === tab ? '2px solid var(--mint-300)' : '2px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {subTab === 'Geral' && <GeralSubTab draft={draft} onChange={handlePatch} />}
      {subTab === 'Aulas' && <AulasSubTab draft={draft} onChange={handlePatch} />}
      {subTab === 'Experiência' && <ExperienciaSubTab draft={draft} onChange={handlePatch} />}
      {subTab === 'FIT' && <FitSubTab draft={draft} onChange={handlePatch} />}
      {subTab === 'Pagamento' && <PagamentoSubTab draft={draft} onChange={handlePatch} />}

      <div className="glass-lg" style={{
        position: 'sticky', bottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px', marginTop: '8px',
      }}>
        <span style={{ fontSize: '12px', color: salvoAs ? 'var(--c-btn-success-text)' : 'var(--c-text-3)' }}>
          {salvoAs ? `Salvo às ${salvoAs}` : 'Alterações não salvas são perdidas ao sair.'}
        </span>
        <Button variant="primary" onClick={() => setModalConfirmarAberto(true)}>
          <FiSave size={14} style={{ marginRight: '6px' }} />
          Salvar Alterações
        </Button>
      </div>

      {modalSenhaAberto && <AlterarSenhaModal onClose={() => setModalSenhaAberto(false)} />}
      {modalConfirmarAberto && (
        <ConfirmarSalvarModal
          salvando={salvando}
          onConfirmar={handleConfirmarSalvar}
          onClose={() => setModalConfirmarAberto(false)}
        />
      )}
    </div>
  )
}
