import React, { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Input, Textarea } from '../../components/Input'
import { Button } from '../../components/Button'

interface NovoCanvasModalProps {
  onClose: () => void
  onCriar: (dados: { titulo: string; descricao: string }) => void
}

export const NovoCanvasModal: React.FC<NovoCanvasModalProps> = ({ onClose, onCriar }) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const podeCriar = titulo.trim().length > 0

  function handleCriar() {
    if (!podeCriar) return
    onCriar({ titulo: titulo.trim(), descricao: descricao.trim() })
  }

  return (
    <Modal
      title="Adicionar novo canva"
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleCriar} disabled={!podeCriar}>Criar canvas</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Input
          label="Título"
          placeholder="Ex.: Aula de Ciências"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          maxLength={60}
        />
        <Textarea
          label="Descrição"
          placeholder="Ex.: Aula para aluna Sofia, será sobre o ciclo da água."
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          rows={3}
        />
      </div>
    </Modal>
  )
}
