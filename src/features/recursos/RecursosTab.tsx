import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight, FiCpu, FiFeather, FiLayers, FiMonitor, FiPackage } from 'react-icons/fi'
import { CanvasModal } from '../../components/CanvasModal'
import { TdicsModal } from './TdicsModal'
import { PlanejamentoIAModal } from './PlanejamentoIAModal'

type RecursoId = 'canva' | 'tdics' | 'materiais' | 'planejamento-ia'

const RECURSOS: { id: RecursoId; titulo: string; descricao: string; icon: React.ReactNode; cor: string; navega?: boolean }[] = [
  { id: 'canva', titulo: 'Canva Master', descricao: 'Canvas complementares de planejamento inicial, aula/aluno e fluxo do Método Master.', icon: <FiFeather size={26} />, cor: '#7c6fe0' },
  { id: 'tdics', titulo: 'TDICs', descricao: 'Categorias de tecnologias digitais para deixar suas aulas mais interativas.', icon: <FiMonitor size={26} />, cor: '#3d8fc9' },
  { id: 'materiais', titulo: 'Materiais Didáticos', descricao: 'Compartilhe e adquira materiais didáticos autorais de outros professores da rede.', icon: <FiPackage size={26} />, cor: '#22a578', navega: true },
  { id: 'planejamento-ia', titulo: 'Planejamento de Aulas IA', descricao: 'Gere um roteiro inicial de aula a partir do tema e nível da turma.', icon: <FiCpu size={26} />, cor: '#b8770f' },
]

export const RecursosTab: React.FC = () => {
  const navigate = useNavigate()
  const [aberto, setAberto] = useState<RecursoId | null>(null)

  function handleClick(recurso: typeof RECURSOS[number]) {
    if (recurso.navega) { navigate('/painel/materiais'); return }
    setAberto(recurso.id)
  }

  return (
    <div className="page-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiLayers size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Recursos</h2>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '18px' }}>
        {RECURSOS.map(r => (
          <button
            key={r.id}
            type="button"
            onClick={() => handleClick(r)}
            className="glass"
            style={{
              textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '26px',
              cursor: 'pointer', border: 'none', color: 'inherit', fontFamily: 'inherit', transition: 'transform 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = '' }}
          >
            <div style={{
              width: '54px', height: '54px', borderRadius: 'var(--radius-md)', background: `${r.cor}22`, color: r.cor,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {r.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: 'var(--c-text-1)' }}>{r.titulo}</h3>
                <FiChevronRight size={16} color="var(--c-text-3)" style={{ flexShrink: 0 }} />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--c-text-3)', lineHeight: 1.55 }}>{r.descricao}</p>
            </div>
          </button>
        ))}
      </div>

      {aberto === 'canva' && <CanvasModal onClose={() => setAberto(null)} />}
      {aberto === 'tdics' && <TdicsModal onClose={() => setAberto(null)} />}
      {aberto === 'planejamento-ia' && <PlanejamentoIAModal onClose={() => setAberto(null)} />}
    </div>
  )
}
