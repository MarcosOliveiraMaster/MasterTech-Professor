import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { PostIt } from './PostIt'
import { POSTIT_CORES, type CanvasColunaDef } from './colunas'
import type { CanvasPostIt } from '../../lib/types'

interface CanvasColunaProps {
  coluna: CanvasColunaDef
  postIts: CanvasPostIt[]
  onSoltar: (dataTransfer: DataTransfer) => void
  onMudarPostIt: (postItId: string, patch: Partial<CanvasPostIt>) => void
  onRemoverPostIt: (postItId: string) => void
}

export const CanvasColuna: React.FC<CanvasColunaProps> = ({ coluna, postIts, onSoltar, onMudarPostIt, onRemoverPostIt }) => {
  const [arrastandoSobre, setArrastandoSobre] = useState(false)
  const Icon = coluna.icon

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setArrastandoSobre(false)
    onSoltar(e.dataTransfer)
  }

  function handleAddManual() {
    const cor = POSTIT_CORES[postIts.length % POSTIT_CORES.length]
    const dt = new DataTransfer()
    dt.setData('application/x-postit-color', cor)
    onSoltar(dt)
  }

  return (
    <div
      className="glass-sm"
      onDragOver={e => { e.preventDefault(); setArrastandoSobre(true) }}
      onDragLeave={() => setArrastandoSobre(false)}
      onDrop={handleDrop}
      style={{
        display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px', minHeight: '220px',
        border: arrastandoSobre ? '1.5px dashed var(--c-border-mint)' : '1.5px solid transparent',
        transition: 'border-color 150ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <Icon size={14} color="var(--c-text-mint)" style={{ flexShrink: 0 }} />
          <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: 'var(--c-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {coluna.label}
          </h4>
        </div>
        <button
          type="button"
          onClick={handleAddManual}
          aria-label={`Adicionar post-it em ${coluna.label}`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0,
            border: '1px solid var(--c-border)', borderRadius: 'var(--radius-full)', background: 'var(--c-glass-bg-sm)',
            color: 'var(--c-text-2)', cursor: 'pointer',
          }}
        >
          <FiPlus size={12} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {postIts.map(postIt => (
          <PostIt
            key={postIt.id}
            postIt={postIt}
            onChange={patch => onMudarPostIt(postIt.id, patch)}
            onRemover={() => onRemoverPostIt(postIt.id)}
            onDragStart={e => e.dataTransfer.setData('application/x-postit-id', postIt.id)}
          />
        ))}
        {postIts.length === 0 && (
          <div style={{
            border: '1.5px dashed var(--c-border)', borderRadius: 'var(--radius-sm)', padding: '14px 8px',
            textAlign: 'center', fontSize: '11px', color: 'var(--c-text-3)',
          }}>
            Arraste um post-it aqui
          </div>
        )}
      </div>
    </div>
  )
}
