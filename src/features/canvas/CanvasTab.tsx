import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiGrid, FiPlus } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { Button } from '../../components/Button'
import { CanvasCard } from './CanvasCard'
import { NovoCanvasModal } from './NovoCanvasModal'

export const CanvasTab: React.FC = () => {
  const navigate = useNavigate()
  const { canvasQuadros, adicionarCanvasQuadro, removerCanvasQuadro } = useProfessorData()
  const [modalAberto, setModalAberto] = useState(false)

  function handleCriar(dados: { titulo: string; descricao: string }) {
    const id = adicionarCanvasQuadro(dados)
    setModalAberto(false)
    navigate(`/painel/canvas/${id}`)
  }

  return (
    <div className="page-wrap page-wrap-wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiGrid size={20} color="var(--c-text-mint)" />
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Canvas</h2>
        </div>
        <Button variant="primary" onClick={() => setModalAberto(true)}>
          <FiPlus size={14} style={{ marginRight: '6px' }} />
          Add novo canva
        </Button>
      </div>

      <p style={{ margin: 0, fontSize: '13px', color: 'var(--c-text-3)', maxWidth: '640px' }}>
        Monte um planejamento visual de aula com post-its arrastáveis para cada coluna: duração, materiais,
        assunto, competências, avaliação, dificuldades, tipo de aluno, estratégias e TDICs.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '16px' }}>
        {canvasQuadros.map(quadro => (
          <CanvasCard
            key={quadro.id}
            quadro={quadro}
            onClick={() => navigate(`/painel/canvas/${quadro.id}`)}
            onRemover={() => removerCanvasQuadro(quadro.id)}
          />
        ))}
      </div>

      {modalAberto && <NovoCanvasModal onClose={() => setModalAberto(false)} onCriar={handleCriar} />}
    </div>
  )
}
