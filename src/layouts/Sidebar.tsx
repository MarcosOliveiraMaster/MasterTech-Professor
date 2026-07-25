import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { Logo } from '../components/Logo'
import { NAV_ITEMS } from '../config/navigation'
import { SidebarUtilMenu } from './SidebarUtilMenu'

const COLLAPSE_KEY = 'mep:sidebar-collapsed'
const EXPANDED_WIDTH = '256px'
const COLLAPSED_WIDTH = '72px'

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === '1')

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <aside
      className="glass"
      style={{
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRadius: 0,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        transition: 'width 200ms ease',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
        padding: '18px 16px', borderBottom: '1px solid var(--c-border)', minHeight: '72px', boxSizing: 'border-box', flexShrink: 0,
      }}>
        {!collapsed && <Logo variant="original" size="xs" />}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px',
            flexShrink: 0, borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)',
            background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-2)', cursor: 'pointer',
          }}
        >
          {collapsed ? <FiChevronsRight size={15} /> : <FiChevronsLeft size={15} />}
        </button>
      </div>

      <nav style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={collapsed ? item.label : undefined}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: collapsed ? '10px' : '10px 12px', justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontSize: 'var(--font-size-sm)', fontWeight: 600,
                color: isActive ? 'var(--c-text-mint)' : 'var(--c-text-2)',
                background: isActive ? 'var(--c-glass-bg-mint)' : 'transparent',
                border: isActive ? '1px solid var(--c-border-mint)' : '1px solid transparent',
                whiteSpace: 'nowrap', overflow: 'hidden',
              })}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div style={{ padding: '10px 8px', borderTop: '1px solid var(--c-border)', flexShrink: 0 }}>
        <SidebarUtilMenu collapsed={collapsed} />
      </div>
    </aside>
  )
}
