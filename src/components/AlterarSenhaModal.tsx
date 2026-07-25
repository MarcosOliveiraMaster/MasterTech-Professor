import React, { useMemo, useState } from 'react'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button'
import { useToast } from '../lib/ToastContext'

interface AlterarSenhaModalProps {
  onClose: () => void
}

interface Forca {
  pct: number
  cor: string
  texto: string
}

function calcularForca(senha: string): Forca {
  if (senha.length >= 10 && /[a-zA-Z]/.test(senha) && /\d/.test(senha) && /[^A-Za-z0-9]/.test(senha)) {
    return { pct: 100, cor: 'var(--color-success)', texto: 'Forte' }
  }
  if (senha.length >= 8 && /[a-z]/.test(senha) && /[A-Z]/.test(senha) && /\d/.test(senha)) {
    return { pct: 70, cor: 'var(--color-warning)', texto: 'Média' }
  }
  if (senha.length >= 8 && /[a-zA-Z]/.test(senha) && /\d/.test(senha)) {
    return { pct: 40, cor: 'var(--mint-400)', texto: 'Suficiente' }
  }
  if (senha.length >= 4) {
    return { pct: 15, cor: 'var(--color-error)', texto: 'Fraca' }
  }
  return { pct: 0, cor: 'var(--c-border-lg)', texto: '—' }
}

export const AlterarSenhaModal: React.FC<AlterarSenhaModalProps> = ({ onClose }) => {
  const { showToast } = useToast()
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  const forca = useMemo(() => calcularForca(novaSenha), [novaSenha])

  async function handleSalvar() {
    setErro('')

    if (!senhaAtual) {
      setErro('Informe sua senha atual.')
      return
    }
    if (novaSenha.length < 12) {
      setErro('A nova senha deve ter pelo menos 12 caracteres.')
      return
    }
    if (!/[a-zA-Z]/.test(novaSenha) || !/\d/.test(novaSenha) || !/[^A-Za-z0-9]/.test(novaSenha)) {
      setErro('A nova senha deve conter letras, números e pelo menos um caractere especial.')
      return
    }
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setSalvando(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setSalvando(false)
    showToast('✅ Senha alterada com sucesso!', 'success')
    onClose()
  }

  return (
    <Modal title="Alterar Senha" onClose={onClose} size="sm" footer={
      <>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSalvar} loading={salvando}>Salvar Senha</Button>
      </>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Input
          label="Senha atual:"
          type="password"
          placeholder="Sua senha atual"
          value={senhaAtual}
          onChange={e => setSenhaAtual(e.target.value)}
        />
        <Input
          label="Nova senha:"
          type="password"
          placeholder="Mín. 12 caracteres, com letras, números e símbolo"
          value={novaSenha}
          onChange={e => setNovaSenha(e.target.value)}
        />
        <Input
          label="Confirmar nova senha:"
          type="password"
          placeholder="Repita a nova senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
        />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--c-text-2)', marginBottom: '6px' }}>
            <span>Força da senha:</span>
            <span style={{ color: forca.cor, fontWeight: 600 }}>{forca.texto}</span>
          </div>
          <div style={{ height: '6px', borderRadius: 'var(--radius-full)', background: 'var(--c-border)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${forca.pct}%`, background: forca.cor, transition: 'width 200ms ease, background 200ms ease' }} />
          </div>
        </div>

        {erro && (
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-error)' }}>{erro}</div>
        )}
      </div>
    </Modal>
  )
}
