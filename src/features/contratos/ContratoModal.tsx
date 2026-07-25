import React, { useState } from 'react'
import { FiCheckCircle, FiPenTool } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { useToast } from '../../lib/ToastContext'
import { formatarDataBR } from '../../lib/dateUtils'
import type { Contrato } from '../../lib/types'

export const ContratoModal: React.FC<{ contrato: Contrato; onClose: () => void }> = ({ contrato, onClose }) => {
  const { assinarContrato } = useProfessorData()
  const { showToast } = useToast()
  const [assinando, setAssinando] = useState(false)

  async function handleAssinar() {
    setAssinando(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    assinarContrato(contrato.id)
    setAssinando(false)
    showToast('✅ Contrato assinado com sucesso!', 'success')
  }

  return (
    <Modal
      title={contrato.titulo}
      onClose={onClose}
      size="md"
      footer={
        contrato.dataAssinatura ? (
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleAssinar} loading={assinando}>
              <FiPenTool size={14} style={{ marginRight: '6px' }} />
              Assinar contrato
            </Button>
          </>
        )
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--c-text-3)' }}>
          <span>Enviado em <strong style={{ color: 'var(--c-text-1)' }}>{formatarDataBR(contrato.dataEnvio)}</strong></span>
          {contrato.dataAssinatura && (
            <span style={{ color: 'var(--c-text-mint)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FiCheckCircle size={13} /> Assinado em <strong>{formatarDataBR(contrato.dataAssinatura)}</strong>
            </span>
          )}
        </div>

        <div className="glass-sm" style={{ padding: '16px', fontSize: '13.5px', color: 'var(--c-text-1)', lineHeight: 1.7 }}>
          {contrato.conteudo}
        </div>

        {!contrato.dataAssinatura && (
          <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--c-text-3)' }}>
            Ao clicar em "Assinar contrato", você declara ciência e concordância com os termos acima.
          </p>
        )}
      </div>
    </Modal>
  )
}
