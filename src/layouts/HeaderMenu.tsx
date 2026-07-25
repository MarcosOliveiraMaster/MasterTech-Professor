import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../lib/AuthContext'
import { useProfessorData } from '../lib/ProfessorDataContext'

function getInitials(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

export const HeaderMenu: React.FC = () => {
  const { logout } = useAuth()
  const { professor } = useProfessorData()
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickFora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('click', onClickFora)
    return () => document.removeEventListener('click', onClickFora)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setAberto(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--c-glass-bg-sm)',
          border: '1px solid var(--c-border)', borderRadius: 'var(--radius-full)', padding: '6px 12px 6px 6px',
          cursor: 'pointer', color: 'var(--c-text-1)',
        }}
      >
        <span style={{
          width: '30px', height: '30px', borderRadius: '50%', background: 'var(--c-avatar-bg)',
          color: 'var(--c-avatar-text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700, flexShrink: 0,
        }}>
          {getInitials(professor.nome)}
        </span>
        <span className="hide-mobile" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
          Olá, {professor.nome.split(' ')[0]}
        </span>
        <FiChevronDown size={14} color="var(--c-text-3)" />
      </button>

      {aberto && (
        <div className="glass-lg" style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: '180px',
          padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', zIndex: 300,
        }}>
          <MenuItem icon={<FiLogOut size={15} />} label="Sair" danger onClick={() => { setAberto(false); logout() }} />
        </div>
      )}
    </div>
  )
}

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }> = ({ icon, label, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: 'var(--radius-sm)',
      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
      color: danger ? 'var(--c-btn-danger-text)' : 'var(--c-text-1)', fontSize: 'var(--font-size-sm)', fontWeight: 500,
      transition: 'background 150ms',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-btn-ghost-hover)' }}
    onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
  >
    {icon}
    {label}
  </button>
)
