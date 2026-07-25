import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../components/GlassCard'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { useAuth } from '../lib/AuthContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [entrando, setEntrando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setEntrando(true)
    const result = await login(email, senha)
    setEntrando(false)

    if (result.success) {
      navigate('/painel/aulas')
    } else {
      setErro(result.error || 'Erro ao fazer login.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      padding: '20px',
    }}>
      <GlassCard variant="lg" style={{ width: '100%', maxWidth: '420px', animation: 'slide-in-up 400ms var(--ease-spring, ease)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ animation: 'logo-reveal 500ms ease forwards', opacity: 0 }}>
            <Logo variant="original" size="md" />
          </div>
          <p style={{
            margin: '10px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--c-text-3)',
            animation: 'logo-reveal 400ms ease forwards', animationDelay: '150ms', opacity: 0,
          }}>
            Área do Professor
          </p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--c-notif-info-bg)', border: '1px solid var(--c-notif-info-border)',
          color: 'var(--c-text-blue)', borderRadius: 'var(--radius-sm)',
          padding: '10px 14px', fontSize: 'var(--font-size-xs)', marginBottom: '20px', lineHeight: 1.5,
        }}>
          Ambiente de demonstração — qualquer e-mail e senha preenchidos entram no painel.
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <div>
            <Input
              label="Senha"
              type={showSenha ? 'text' : 'password'}
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              error={erro || undefined}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowSenha(s => !s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--c-text-3)', fontSize: 'var(--font-size-xs)',
                padding: 0, marginTop: '6px',
              }}
            >
              {showSenha ? 'Ocultar senha' : 'Mostrar senha'}
            </button>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={entrando}>
            Entrar
          </Button>
        </form>

        <p style={{
          margin: '28px 0 0', textAlign: 'center', fontSize: '11px', color: 'var(--c-text-3)',
        }}>
          © 2026 Master Educação LTDA · Ambiente de demonstração
        </p>
      </GlassCard>
    </div>
  )
}
