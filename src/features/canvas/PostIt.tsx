import React, { useEffect, useId, useRef, useState } from 'react'
import { FiImage, FiLink, FiPaperclip, FiX } from 'react-icons/fi'
import type { CanvasPostIt } from '../../lib/types'

const ALTURA_BASE = 140
const CRESCIMENTO_MAX = 200

interface PostItProps {
  postIt: CanvasPostIt
  onChange: (patch: Partial<CanvasPostIt>) => void
  onRemover: () => void
  onDragStart: (e: React.DragEvent) => void
}

export const PostIt: React.FC<PostItProps> = ({ postIt, onChange, onRemover, onDragStart }) => {
  const [editandoLink, setEditandoLink] = useState(false)
  const [linkRascunho, setLinkRascunho] = useState(postIt.link ?? '')
  const imagemInputRef = useRef<HTMLInputElement>(null)
  const docInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const linkInputId = useId()

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [postIt.texto])

  function handleImagemSelecionada(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange({ imagemUrl: String(reader.result) })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function handleDocSelecionado(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange({ documentoNome: file.name })
    e.target.value = ''
  }

  function confirmarLink() {
    onChange({ link: linkRascunho.trim() || undefined })
    setEditandoLink(false)
  }

  const corTexto = '#26261f'

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        background: postIt.cor,
        borderRadius: 'var(--radius-sm)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
        padding: '10px 10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        minHeight: `${ALTURA_BASE}px`,
        maxHeight: `${ALTURA_BASE + CRESCIMENTO_MAX}px`,
        overflowY: 'auto',
        boxSizing: 'border-box',
        cursor: 'grab',
        color: corTexto,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onRemover}
          aria-label="Remover post-it"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px',
            border: 'none', background: 'rgba(0,0,0,0.10)', borderRadius: 'var(--radius-full)', cursor: 'pointer', color: corTexto,
            flexShrink: 0,
          }}
        >
          <FiX size={12} />
        </button>
      </div>

      {postIt.imagemUrl && (
        <img
          src={postIt.imagemUrl}
          alt=""
          style={{ width: '100%', maxHeight: '90px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
        />
      )}

      <textarea
        ref={textareaRef}
        value={postIt.texto}
        onChange={e => onChange({ texto: e.target.value })}
        placeholder="Escreva aqui..."
        rows={3}
        style={{
          width: '100%', border: 'none', background: 'transparent', resize: 'none', outline: 'none',
          fontFamily: 'var(--font-sans)', fontSize: '12.5px', lineHeight: 1.45, color: corTexto, flexShrink: 0,
          overflow: 'hidden',
        }}
      />

      {postIt.link && (
        <a
          href={postIt.link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: corTexto,
            textDecoration: 'underline', wordBreak: 'break-all', flexShrink: 0,
          }}
        >
          <FiLink size={11} style={{ flexShrink: 0 }} />
          {postIt.link}
        </a>
      )}

      {postIt.documentoNome && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: corTexto, flexShrink: 0 }}>
          <FiPaperclip size={11} style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{postIt.documentoNome}</span>
        </div>
      )}

      {editandoLink && (
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          <input
            id={linkInputId}
            autoFocus
            value={linkRascunho}
            onChange={e => setLinkRascunho(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') confirmarLink(); if (e.key === 'Escape') setEditandoLink(false) }}
            onBlur={confirmarLink}
            placeholder="https://..."
            style={{
              flex: 1, minWidth: 0, fontSize: '11px', padding: '3px 6px', borderRadius: '4px',
              border: '1px solid rgba(0,0,0,0.20)', background: 'rgba(255,255,255,0.55)', color: corTexto, outline: 'none',
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginTop: 'auto', paddingTop: '2px' }}>
        <button
          type="button"
          onClick={() => imagemInputRef.current?.click()}
          aria-label="Adicionar imagem"
          style={{ display: 'flex', border: 'none', background: 'none', cursor: 'pointer', color: corTexto, opacity: 0.65, padding: '3px' }}
        >
          <FiImage size={13} />
        </button>
        <button
          type="button"
          onClick={() => setEditandoLink(v => !v)}
          aria-label="Adicionar link"
          style={{ display: 'flex', border: 'none', background: 'none', cursor: 'pointer', color: corTexto, opacity: 0.65, padding: '3px' }}
        >
          <FiLink size={13} />
        </button>
        <button
          type="button"
          onClick={() => docInputRef.current?.click()}
          aria-label="Adicionar documento"
          style={{ display: 'flex', border: 'none', background: 'none', cursor: 'pointer', color: corTexto, opacity: 0.65, padding: '3px' }}
        >
          <FiPaperclip size={13} />
        </button>
      </div>

      <input ref={imagemInputRef} type="file" accept="image/*" onChange={handleImagemSelecionada} style={{ display: 'none' }} />
      <input ref={docInputRef} type="file" onChange={handleDocSelecionado} style={{ display: 'none' }} />
    </div>
  )
}
