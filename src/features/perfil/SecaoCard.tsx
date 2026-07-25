import React from 'react'

interface SecaoCardProps {
  icon: React.ReactNode
  titulo: string
  children: React.ReactNode
  acao?: React.ReactNode
}

export const SecaoCard: React.FC<SecaoCardProps> = ({ icon, titulo, children, acao }) => (
  <div className="glass" style={{ padding: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--c-text-1)' }}>{titulo}</h3>
      </div>
      {acao}
    </div>
    {children}
  </div>
)
