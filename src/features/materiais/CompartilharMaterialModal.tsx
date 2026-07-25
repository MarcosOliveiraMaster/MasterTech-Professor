import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Input, Textarea, Select } from '../../components/Input'
import { Button } from '../../components/Button'
import { useToast } from '../../lib/ToastContext'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { MATERIAS_FILTRO } from '../../lib/constants'

export const CompartilharMaterialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { adicionarMaterial } = useProfessorData()
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [materia, setMateria] = useState('')
  const [valor, setValor] = useState('')
  const [arquivoNome, setArquivoNome] = useState<string | undefined>(undefined)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleEnviar() {
    if (!titulo.trim() || !descricao.trim() || !materia || !valor) {
      setErro('Preencha título, descrição, matéria e valor.')
      return
    }
    setErro('')
    setEnviando(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    adicionarMaterial({ titulo, descricao, materia, valor: Number(valor), arquivoNome })
    setEnviando(false)
    showToast('✅ Material enviado para publicação!', 'success')
    onClose()
  }

  return (
    <Modal
      title="Compartilhar novo material didático"
      onClose={onClose}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleEnviar} loading={enviando}>Enviar</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input ref={fileInputRef} type="file" onChange={e => setArquivoNome(e.target.files?.[0]?.name)} style={{ display: 'none' }} />
        <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--c-text-2)' }}>Arquivo do material</label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px',
            borderRadius: 'var(--radius-sm)', border: '1.5px dashed var(--c-border-lg)', background: 'var(--c-glass-bg-sm)',
            color: 'var(--c-text-2)', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
          }}
        >
          <FiUpload size={16} />
          {arquivoNome || 'Selecionar arquivo (PDF, imagem, apresentação...)'}
        </button>

        <Textarea
          label="Descrição"
          rows={4}
          placeholder="Descreva o conteúdo do material, para quem é indicado e o que inclui."
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <Input label="Título do material" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ex: Caderno de exercícios — Frações" />

        <Select
          label="Matéria"
          value={materia}
          onChange={e => setMateria(e.target.value)}
          placeholder="Selecione a matéria"
          options={MATERIAS_FILTRO.map(m => ({ value: m, label: m }))}
        />

        <Input label="Valor (R$)" type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" />

        {erro && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-error)' }}>{erro}</div>}
      </div>
    </Modal>
  )
}

