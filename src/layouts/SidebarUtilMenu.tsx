import React, { useState } from 'react'
import { FiDownload, FiHeadphones, FiKey, FiMessageCircle } from 'react-icons/fi'
import { AlterarSenhaModal } from '../components/AlterarSenhaModal'
import { FeedbackModal } from '../components/FeedbackModal'
import { WHATSAPP_SUPORTE, MANUAL_PROFESSOR_URL } from '../lib/constants'

interface SidebarUtilMenuProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export const SidebarUtilMenu: React.FC<SidebarUtilMenuProps> = ({ collapsed = false, onNavigate }) => {
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false)
  const [modalFeedbackAberto, setModalFeedbackAberto] = useState(false)

  const itens = [
    { icon: <FiKey size={16} />, label: 'Alterar senha', onClick: () => { setModalSenhaAberto(true); onNavigate?.() } },
    { icon: <FiHeadphones size={16} />, label: 'Contatar suporte', onClick: () => { window.open(WHATSAPP_SUPORTE, '_blank'); onNavigate?.() } },
    { icon: <FiDownload size={16} />, label: 'Manual Professor', onClick: () => { window.open(MANUAL_PROFESSOR_URL, '_blank'); onNavigate?.() } },
    { icon: <FiMessageCircle size={16} />, label: 'Feedback', onClick: () => { setModalFeedbackAberto(true); onNavigate?.() } },
  ]

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {itens.map(item => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            title={collapsed ? item.label : undefined}
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
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {modalSenhaAberto && <AlterarSenhaModal onClose={() => setModalSenhaAberto(false)} />}
      {modalFeedbackAberto && <FeedbackModal onClose={() => setModalFeedbackAberto(false)} />}
    </>
  )
}
