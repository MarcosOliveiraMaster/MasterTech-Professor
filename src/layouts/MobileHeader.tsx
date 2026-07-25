import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { Logo } from '../components/Logo'
import { HeaderMenu } from './HeaderMenu'
import { SidebarUtilMenu } from './SidebarUtilMenu'
import { NAV_ITEMS } from '../config/navigation'

export const MobileHeader: React.FC = () => {
  const [drawerAberto, setDrawerAberto] = useState(false)

  return (
    <>
      <header className="glass" style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setDrawerAberto(true)}
            aria-label="Abrir menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)',
              color: 'var(--c-text-1)', cursor: 'pointer',
            }}
          >
            <FiMenu size={17} />
          </button>
          <Logo variant="original" size="xs" />
        </div>
        <HeaderMenu />
      </header>

      {drawerAberto && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setDrawerAberto(false) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 400, display: 'flex' }}
        >
          <div className="glass-lg" style={{
            width: '84vw', maxWidth: '300px', height: '100%', borderRadius: 0, display: 'flex', flexDirection: 'column',
            animation: 'slide-in-right 200ms ease-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 16px', borderBottom: '1px solid var(--c-border)' }}>
              <Logo variant="original" size="xs" />
              <button
                type="button"
                onClick={() => setDrawerAberto(false)}
                aria-label="Fechar menu"
                style={{ background: 'none', border: 'none', color: 'var(--c-text-2)', cursor: 'pointer', display: 'flex' }}
              >
                <FiX size={20} />
              </button>
            </div>
            <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {NAV_ITEMS.map(item => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setDrawerAberto(false)}
                    style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                      borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                      fontSize: 'var(--font-size-sm)', fontWeight: 600,
                      color: isActive ? 'var(--c-text-mint)' : 'var(--c-text-1)',
                      background: isActive ? 'var(--c-glass-bg-mint)' : 'transparent',
                      border: isActive ? '1px solid var(--c-border-mint)' : '1px solid transparent',
                    })}
                  >
                    <Icon size={17} />
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>
            <div style={{ padding: '10px', borderTop: '1px solid var(--c-border)', flexShrink: 0 }}>
              <SidebarUtilMenu onNavigate={() => setDrawerAberto(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
