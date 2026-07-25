import React from 'react'
import { Modal } from '../../components/Modal'
import { AulaCard } from './AulaCard'
import type { Aula } from '../../lib/types'
import { diaSemanaExtenso, formatarDataBR } from '../../lib/dateUtils'

interface DiaModalProps {
  data: string
  aulas: Aula[]
  onClose: () => void
  onConfirmar: (aula: Aula) => void
  onRelatorio: (aula: Aula) => void
  onDetalhes: (aula: Aula) => void
}

export const DiaModal: React.FC<DiaModalProps> = ({ data, aulas, onClose, onConfirmar, onRelatorio, onDetalhes }) => (
  <Modal title={`${diaSemanaExtenso(data)}, ${formatarDataBR(data)}`} onClose={onClose} size="md">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {aulas.map(aula => (
        <AulaCard
          key={aula.id}
          aula={aula}
          onConfirmar={() => onConfirmar(aula)}
          onRelatorio={() => onRelatorio(aula)}
          onDetalhes={() => onDetalhes(aula)}
        />
      ))}
    </div>
  </Modal>
)
