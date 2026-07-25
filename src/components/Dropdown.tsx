import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  minWidth?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Menu flutuante renderizado via portal em document.body — evita ficar
 * preso ao stacking context de ancestrais com backdrop-filter (.glass),
 * que faziam o dropdown ser pintado atrás de irmãos posteriores no DOM.
 */
export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, align = 'left', minWidth = 220, open, onOpenChange }) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  function updatePosition() {
    const r = triggerRef.current?.getBoundingClientRect()
    if (!r) return
    setPos({ top: r.bottom + 6, left: align === 'right' ? Math.max(8, r.right - minWidth) : r.left })
  }

  useEffect(() => { if (open) updatePosition() }, [open, align, minWidth])

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (triggerRef.current?.contains(e.target as Node)) return
      if (menuRef.current?.contains(e.target as Node)) return
      onOpenChange(false)
    }
    function onReposition() { updatePosition() }
    document.addEventListener('mousedown', onDocClick)
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <div ref={triggerRef} onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open && createPortal(
        <div
          ref={menuRef}
          className="glass-lg"
          style={{ position: 'fixed', top: pos.top, left: pos.left, minWidth, zIndex: 9500, maxHeight: '70vh', overflowY: 'auto' }}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  )
}
