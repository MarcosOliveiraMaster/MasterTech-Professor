import React from 'react'
import { FiHome, FiUser } from 'react-icons/fi'
import { Input } from '../../components/Input'
import type { Professor } from '../../lib/types'
import { maskCEP, maskData, maskTelefone } from '../../lib/masks'
import { SecaoCard } from './SecaoCard'

interface GeralSubTabProps {
  draft: Professor
  onChange: (patch: Partial<Professor>) => void
}

export const GeralSubTab: React.FC<GeralSubTabProps> = ({ draft, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
    <SecaoCard icon={<FiUser size={16} />} titulo="Dados Pessoais">
      <div className="grid grid-cols-2" style={{ gap: '14px' }}>
        <Input label="Nome" value={draft.nome} onChange={e => onChange({ nome: e.target.value })} />
        <Input label="E-mail  🔒 fixo" value={draft.email} disabled />
        <Input label="CPF  🔒 fixo" value={draft.cpf} disabled />
        <Input label="Contato" value={draft.contato} onChange={e => onChange({ contato: maskTelefone(e.target.value) })} placeholder="(00) 00000-0000" />
        <Input label="Data de Nascimento" value={draft.dataNascimento} onChange={e => onChange({ dataNascimento: maskData(e.target.value) })} placeholder="dd/mm/aaaa" />
        <Input label="Rede Social" value={draft.redeSocial} onChange={e => onChange({ redeSocial: e.target.value })} placeholder="@seuinstagram" />
      </div>
    </SecaoCard>

    <SecaoCard icon={<FiHome size={16} />} titulo="Endereço">
      <div className="grid grid-cols-2" style={{ gap: '14px' }}>
        <Input label="CEP" value={draft.cep} onChange={e => onChange({ cep: maskCEP(e.target.value) })} placeholder="00000-000" />
        <Input label="Endereço" value={draft.endereco} onChange={e => onChange({ endereco: e.target.value })} />
        <Input label="Complemento" value={draft.complemento} onChange={e => onChange({ complemento: e.target.value })} />
        <Input label="Cidade / UF" value={draft.cidadeUF} onChange={e => onChange({ cidadeUF: e.target.value })} />
      </div>
    </SecaoCard>
  </div>
)
