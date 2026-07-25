import React, { useState } from 'react'
import { FiShoppingCart, FiUser } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { useToast } from '../../lib/ToastContext'
import { formatarMoeda } from '../../lib/dateUtils'
import { MaterialCapa } from './MaterialCapa'
import type { MaterialDidatico } from '../../lib/types'

export const ComprarMaterialModal: React.FC<{ material: MaterialDidatico; onClose: () => void }> = ({ material, onClose }) => {
  const { showToast } = useToast()
  const [comprando, setComprando] = useState(false)
  const [comprado, setComprado] = useState(false)

  async function handleComprar() {
    setComprando(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setComprando(false)
    setComprado(true)
    showToast('✅ Material adquirido! Já está disponível para download.', 'success')
  }

  return (
    <Modal
      title={material.titulo}
      onClose={onClose}
      size="sm"
      footer={
        comprado ? (
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleComprar} loading={comprando}>
              <FiShoppingCart size={14} style={{ marginRight: '6px' }} />
              Comprar por {formatarMoeda(material.valor)}
            </Button>
          </>
        )
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: `1px solid ${material.capaCor}55` }}>
          <MaterialCapa cor={material.capaCor} variante={material.capaVariante} altura={140} />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="blue">{material.materia}</Badge>
          <Badge variant="outline"><FiUser size={11} style={{ marginRight: '4px' }} />{material.autor}</Badge>
        </div>

        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--c-text-2)', lineHeight: 1.6 }}>
          {material.descricao}
        </p>

        {comprado && (
          <div style={{
            padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--c-badge-success-bg)',
            border: '1px solid var(--c-badge-success-border)', color: 'var(--c-badge-success-text)', fontSize: '13px', fontWeight: 600,
          }}>
            Compra confirmada — material liberado no seu acervo.
          </div>
        )}
      </div>
    </Modal>
  )
}
