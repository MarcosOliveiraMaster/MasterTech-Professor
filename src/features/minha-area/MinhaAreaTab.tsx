import React, { useRef } from 'react'
import { FiCamera, FiGlobe, FiStar } from 'react-icons/fi'
import { FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { Textarea } from '../../components/Input'
import { formatarDataBR } from '../../lib/dateUtils'

function lerArquivoComoDataUrl(arquivo: File, callback: (url: string) => void) {
  const reader = new FileReader()
  reader.onload = () => callback(reader.result as string)
  reader.readAsDataURL(arquivo)
}

export const MinhaAreaTab: React.FC = () => {
  const { professor, updateProfessor, feedbacks } = useProfessorData()
  const capaInputRef = useRef<HTMLInputElement>(null)
  const fotoInputRef = useRef<HTMLInputElement>(null)

  const textoCompartilhar = encodeURIComponent(`Confira o perfil de ${professor.nome} na Master Educação!`)
  const urlAtual = encodeURIComponent(window.location.href)

  const notaMedia = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.nota, 0) / feedbacks.length).toFixed(1)
    : '—'

  return (
    <div className="page-wrap page-wrap-narrow">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiGlobe size={20} color="var(--c-text-mint)" />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Minha Área</h2>
      </div>

      <div className="glass" style={{ overflow: 'hidden', padding: 0 }}>
        <input ref={capaInputRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) lerArquivoComoDataUrl(f, url => updateProfessor({ capaUrl: url })) }} />
        <div
          onClick={() => capaInputRef.current?.click()}
          style={{
            height: '160px', cursor: 'pointer', position: 'relative',
            background: professor.capaUrl ? `url(${professor.capaUrl}) center/cover` : 'var(--gradient-btn-primary, var(--gradient-accent))',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.25)', opacity: 0, transition: 'opacity 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
              <FiCamera size={14} /> Alterar capa
            </span>
          </div>
        </div>

        <div style={{ padding: '0 24px 24px', marginTop: '-42px' }}>
          <input ref={fotoInputRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) lerArquivoComoDataUrl(f, url => updateProfessor({ fotoUrl: url })) }} />
          <div
            onClick={() => fotoInputRef.current?.click()}
            style={{
              width: '84px', height: '84px', borderRadius: '50%', border: '4px solid var(--c-bg)', cursor: 'pointer',
              background: professor.fotoUrl ? `url(${professor.fotoUrl}) center/cover` : 'var(--c-avatar-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-avatar-text)', fontWeight: 700, fontSize: '24px',
              position: 'relative',
            }}
          >
            {!professor.fotoUrl && professor.nome.split(' ').map(p => p[0]).slice(0, 2).join('')}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%',
              background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--c-bg)',
            }}>
              <FiCamera size={11} color="#fff" />
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '19px', color: 'var(--c-text-1)' }}>{professor.nome}</h3>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--c-text-3)' }}>{professor.curso}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <FiStar size={14} color="#f5a623" fill="#f5a623" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-text-1)' }}>{notaMedia}</span>
              <span style={{ fontSize: '12px', color: 'var(--c-text-3)' }}>({feedbacks.length} avaliações)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <ShareBtn href={`https://wa.me/?text=${textoCompartilhar}%20${urlAtual}`} cor="#25d366" icon={<FaWhatsapp size={16} />} label="WhatsApp" />
            <ShareBtn href="https://www.instagram.com/" cor="#e1306c" icon={<FaInstagram size={16} />} label="Instagram" />
            <ShareBtn href={`https://x.com/intent/tweet?text=${textoCompartilhar}&url=${urlAtual}`} cor="#000000" icon={<FaXTwitter size={16} />} label="X" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <CampoDescricao label="Sobre" valor={professor.sobre} onChange={v => updateProfessor({ sobre: v })} />
        <CampoDescricao label="Diferenciais" valor={professor.diferenciais} onChange={v => updateProfessor({ diferenciais: v })} />
        <CampoDescricao label="Habilidades" valor={professor.habilidades} onChange={v => updateProfessor({ habilidades: v })} />
        <CampoDescricao label="Qualificações" valor={professor.qualificacoes} onChange={v => updateProfessor({ qualificacoes: v })} />
      </div>

      <div className="glass" style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-base)', color: 'var(--c-text-1)' }}>Feedbacks</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {feedbacks.map(f => (
            <div key={f.id} className="glass-sm" style={{ padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-text-1)' }}>{f.cliente}</span>
                <span style={{ fontSize: '11px', color: 'var(--c-text-3)' }}>{formatarDataBR(f.data)}</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                {[1, 2, 3, 4, 5].map(i => <FiStar key={i} size={12} color="#f5a623" fill={i <= f.nota ? '#f5a623' : 'none'} />)}
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--c-text-2)', lineHeight: 1.5 }}>{f.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CampoDescricao: React.FC<{ label: string; valor: string; onChange: (v: string) => void }> = ({ label, valor, onChange }) => (
  <div className="glass" style={{ padding: '18px' }}>
    <Textarea label={label} rows={3} value={valor} onChange={e => onChange(e.target.value)} />
  </div>
)

const ShareBtn: React.FC<{ href: string; cor: string; icon: React.ReactNode; label: string }> = ({ href, cor, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: 'var(--radius-sm)',
      background: `${cor}22`, color: cor, fontSize: '12px', fontWeight: 700, textDecoration: 'none', border: `1px solid ${cor}44`,
    }}
  >
    {icon} {label}
  </a>
)
