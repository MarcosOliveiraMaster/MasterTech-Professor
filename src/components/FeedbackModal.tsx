import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { Modal } from './Modal'
import { Input, Select, Textarea } from './Input'
import { Button } from './Button'
import { useToast } from '../lib/ToastContext'

const TIPOS = [
  { value: 'sugestao', label: 'Sugestão' },
  { value: 'reclamacao', label: 'Reclamação' },
  { value: 'elogio', label: 'Elogio' },
  { value: 'ocorrencia', label: 'Ocorrência' },
]

export const FeedbackModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { showToast } = useToast()
  const [tipo, setTipo] = useState('')
  const [assunto, setAssunto] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleEnviar() {
    if (!tipo || !assunto.trim() || !descricao.trim()) {
      setErro('Preencha o tipo, o assunto e a descrição.')
      return
    }
    setErro('')
    setEnviando(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setEnviando(false)
    showToast('✅ Feedback enviado para a administração!', 'success')
    onClose()
  }

  return (
    <Modal
      title="Enviar Feedback"
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleEnviar} loading={enviando}>
            <FiSend size={14} style={{ marginRight: '6px' }} />
            Enviar
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--c-text-2)', lineHeight: 1.5 }}>
          Relate uma ocorrência, sugestão ou elogio diretamente para a administração da Master Educação.
        </p>
        <Select label="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Selecione o tipo" options={TIPOS} />
        <Input label="Assunto" value={assunto} onChange={e => setAssunto(e.target.value)} placeholder="Resuma em poucas palavras" />
        <Textarea label="Descrição" rows={5} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva com detalhes o que gostaria de reportar." />
        {erro && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-error)' }}>{erro}</div>}
      </div>
    </Modal>
  )
}
