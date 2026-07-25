import React from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { Input } from '../../components/Input'
import type { Professor } from '../../lib/types'
import { SecaoCard } from './SecaoCard'

interface PagamentoSubTabProps {
  draft: Professor
  onChange: (patch: Partial<Professor>) => void
}

export const PagamentoSubTab: React.FC<PagamentoSubTabProps> = ({ draft, onChange }) => (
  <SecaoCard icon={<FiDollarSign size={16} />} titulo="Dados de Pagamento">
    <Input
      label="Chave Pix"
      placeholder="CPF, e-mail, telefone ou chave aleatória"
      value={draft.pix}
      onChange={e => onChange({ pix: e.target.value })}
    />
  </SecaoCard>
)
