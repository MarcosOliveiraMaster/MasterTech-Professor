import React, { useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { useToast } from '../../lib/ToastContext'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import type { Aula } from '../../lib/types'

interface ConfirmarAulaModalProps {
  aula: Aula
  onClose: () => void
}

export const ConfirmarAulaModal: React.FC<ConfirmarAulaModalProps> = ({ aula, onClose }) => {
  const { confirmarAula } = useProfessorData()
  const { showToast } = useToast()
  const [salvando, setSalvando] = useState(false)

  async function handleConfirmar() {
    setSalvando(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    confirmarAula(aula.id)
    setSalvando(false)
    showToast('✅ Aula confirmada com sucesso!', 'success')
    onClose()
  }

  return (
    <Modal title=" " onClose={onClose} size="sm">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center', alignItems: 'center' }}>
        <FiHelpCircle size={32} color="var(--c-text-mint)" />
        <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-md)', color: 'var(--c-text-1)' }}>
          Deseja mudar o status da aula?
        </h4>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--c-text-2)', lineHeight: 1.5 }}>
          Ao confirmar, entenderemos que a aula foi concluída por você. Após esta marcação, não poderá ser desfeita.
        </p>
        <Button variant="primary" fullWidth loading={salvando} onClick={handleConfirmar}>
          Confirmar
        </Button>
      </div>
    </Modal>
  )
}
