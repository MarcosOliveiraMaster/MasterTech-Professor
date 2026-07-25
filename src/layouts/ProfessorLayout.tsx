import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { HeaderMenu } from './HeaderMenu'
import { useIsDesktop } from '../lib/useMediaQuery'

export const ProfessorLayout: React.FC = () => {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gradient-hero)' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <header style={{
            flexShrink: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
            padding: '14px 28px', borderBottom: '1px solid var(--c-border)',
          }}>
            <HeaderMenu />
          </header>
          <main style={{ flex: 1, minWidth: 0 }}>
            <Outlet />
          </main>
          <footer style={{
            flexShrink: 0, textAlign: 'center', padding: '10px', fontSize: 'var(--font-size-xs)',
            color: 'var(--c-text-3)', borderTop: '1px solid var(--c-border)',
          }}>
            © 2026 Master Educação. Todos os direitos reservados.
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <MobileHeader />
      <main style={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </main>
      <footer style={{
        flexShrink: 0, textAlign: 'center', padding: '10px', fontSize: 'var(--font-size-xs)',
        color: 'var(--c-text-3)', borderTop: '1px solid var(--c-border)',
      }}>
        © 2026 Master Educação
      </footer>
    </div>
  )
}
