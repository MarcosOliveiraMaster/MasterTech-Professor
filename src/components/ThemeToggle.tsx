import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../lib/ThemeContext'

interface ThemeToggleProps {
  collapsed?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ collapsed = false }) => {
  const { theme, toggleTheme } = useTheme()
  const escuro = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={escuro ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-label={escuro ? 'Ativar modo claro' : 'Ativar modo escuro'}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
        padding: collapsed ? '10px' : '10px 12px', justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 'var(--radius-sm)', border: 'none', background: 'none', cursor: 'pointer',
        color: 'var(--c-text-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600, fontFamily: 'var(--font-sans)',
        transition: 'background 150ms, color 150ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-btn-ghost-hover)'; e.currentTarget.style.color = 'var(--c-text-1)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--c-text-2)' }}
    >
      {escuro ? <FiSun size={16} /> : <FiMoon size={16} />}
      {!collapsed && <span>{escuro ? 'Modo claro' : 'Modo escuro'}</span>}
    </button>
  )
}
