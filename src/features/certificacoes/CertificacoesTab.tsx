import React from 'react'
import {
  FiAward, FiBookOpen, FiCheckCircle, FiClock, FiEdit3, FiHeart, FiLock, FiShield, FiStar, FiTarget, FiTrendingUp, FiUsers,
} from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { formatarDataBR } from '../../lib/dateUtils'

const ICONES: Record<string, React.ReactNode> = {
  heart: <FiHeart size={22} />,
  edit: <FiEdit3 size={22} />,
  check: <FiCheckCircle size={22} />,
  clock: <FiClock size={22} />,
  shield: <FiShield size={22} />,
  book: <FiBookOpen size={22} />,
  trending: <FiTrendingUp size={22} />,
  star: <FiStar size={22} />,
  target: <FiTarget size={22} />,
  users: <FiUsers size={22} />,
}

export const CertificacoesTab: React.FC = () => {
  const { certificacoes } = useProfessorData()
  const conquistados = certificacoes.filter(c => c.conquistadoEm).length

  return (
    <div className="page-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiAward size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Certificações</h2>
        <span style={{
          fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: 'var(--radius-full)',
          background: 'var(--c-badge-mint-bg)', color: 'var(--c-badge-mint-text)',
        }}>
          {conquistados}/{certificacoes.length} conquistados
        </span>
      </div>
      <p style={{ margin: '-8px 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--c-text-3)' }}>
        Selos de qualidade enviados individualmente pela Central Master conforme seu desempenho na plataforma.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '16px' }}>
        {certificacoes.map(cert => {
          const conquistado = !!cert.conquistadoEm
          return (
            <div
              key={cert.id}
              className={conquistado ? 'glass-mint' : 'glass'}
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', opacity: conquistado ? 1 : 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: conquistado ? 'var(--gradient-accent)' : 'var(--c-glass-bg-sm)',
                  color: conquistado ? '#fff' : 'var(--c-text-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {ICONES[cert.icone]}
                </div>
                {!conquistado && <FiLock size={14} color="var(--c-text-3)" />}
              </div>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--c-text-1)' }}>{cert.titulo}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--c-text-3)', lineHeight: 1.5, flex: 1 }}>{cert.descricao}</p>
              <span style={{ fontSize: '11px', fontWeight: 700, color: conquistado ? 'var(--c-text-mint)' : 'var(--c-text-3)' }}>
                {conquistado ? `Conquistado em ${formatarDataBR(cert.conquistadoEm!)}` : 'Ainda não conquistado'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
