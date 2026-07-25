import React from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'

interface ConfirmarSalvarModalProps {
  salvando: boolean
  onConfirmar: () => void
  onClose: () => void
}

export const ConfirmarSalvarModal: React.FC<ConfirmarSalvarModalProps> = ({ salvando, onConfirmar, onClose }) => (
  <Modal
    title="Confirmação"
    onClose={onClose}
    size="sm"
    footer={
      <>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirmar} loading={salvando}>Salvar</Button>
      </>
    }
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <FiHelpCircle size={22} color="var(--c-text-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--c-text-1)', lineHeight: 1.5 }}>
        Deseja salvar as alterações no seu perfil?
      </p>
    </div>
  </Modal>
)
