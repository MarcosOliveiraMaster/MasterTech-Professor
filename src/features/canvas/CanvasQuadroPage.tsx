import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiGrid } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { CanvasColuna } from './CanvasColuna'
import { PostItRail } from './PostItRail'
import { CANVAS_GRUPO_ALUNO, CANVAS_GRUPO_PLANEJAMENTO, POSTIT_CORES } from './colunas'
import type { CanvasColunaId, CanvasPostIt } from '../../lib/types'

export const CanvasQuadroPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { canvasQuadros, adicionarPostIt, atualizarPostIt, moverPostIt, removerPostIt } = useProfessorData()

  const quadro = canvasQuadros.find(q => q.id === id)

  if (!quadro) {
    return (
      <div className="page-wrap page-wrap-wide">
        <p style={{ color: 'var(--c-text-3)', fontSize: '13px' }}>Canvas não encontrado.</p>
        <button
          type="button"
          onClick={() => navigate('/painel/canvas')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--c-text-mint)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', width: 'fit-content' }}
        >
          <FiArrowLeft size={14} /> Voltar para Canvas
        </button>
      </div>
    )
  }

  function handleSoltar(colunaId: CanvasColunaId, dataTransfer: DataTransfer) {
    const movingId = dataTransfer.getData('application/x-postit-id')
    if (movingId) {
      moverPostIt(quadro!.id, movingId, colunaId)
      return
    }
    const cor = dataTransfer.getData('application/x-postit-color') || POSTIT_CORES[0]
    adicionarPostIt(quadro!.id, colunaId, cor)
  }

  function postItsDaColuna(colunaId: CanvasColunaId): CanvasPostIt[] {
    return quadro!.postIts.filter(p => p.colunaId === colunaId)
  }

  return (
    <div className="page-wrap page-wrap-wide">
      <div>
        <button
          type="button"
          onClick={() => navigate('/painel/canvas')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--c-text-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12.5px', padding: 0, marginBottom: '10px' }}
        >
          <FiArrowLeft size={13} /> Voltar para Canvas
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiGrid size={20} color="var(--c-text-mint)" />
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>{quadro.titulo}</h2>
        </div>
        {quadro.descricao && <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--c-text-3)' }}>{quadro.descricao}</p>}
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '3 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--c-text-3)' }}>
              Planejamento da aula
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '12px' }}>
              {CANVAS_GRUPO_PLANEJAMENTO.map(coluna => (
                <CanvasColuna
                  key={coluna.id}
                  coluna={coluna}
                  postIts={postItsDaColuna(coluna.id)}
                  onSoltar={dt => handleSoltar(coluna.id, dt)}
                  onMudarPostIt={(postItId, patch) => atualizarPostIt(quadro.id, postItId, patch)}
                  onRemoverPostIt={postItId => removerPostIt(quadro.id, postItId)}
                />
              ))}
            </div>
          </section>

          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--c-text-3)' }}>
              Perfil do aluno e estratégias
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '12px' }}>
              {CANVAS_GRUPO_ALUNO.map(coluna => (
                <CanvasColuna
                  key={coluna.id}
                  coluna={coluna}
                  postIts={postItsDaColuna(coluna.id)}
                  onSoltar={dt => handleSoltar(coluna.id, dt)}
                  onMudarPostIt={(postItId, patch) => atualizarPostIt(quadro.id, postItId, patch)}
                  onRemoverPostIt={postItId => removerPostIt(quadro.id, postItId)}
                />
              ))}
            </div>
          </section>
        </div>

        <div style={{ flex: '1 1 220px', minWidth: '200px', maxWidth: '260px' }}>
          <PostItRail />
        </div>
      </div>
    </div>
  )
}
