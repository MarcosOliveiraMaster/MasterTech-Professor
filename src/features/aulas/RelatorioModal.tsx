import React, { useRef, useState } from 'react'
import { FiCamera, FiFileText, FiLink, FiPlus, FiStar, FiUpload, FiX } from 'react-icons/fi'
import { Modal } from '../../components/Modal'
import { Textarea } from '../../components/Input'
import { Button } from '../../components/Button'
import { useToast } from '../../lib/ToastContext'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { formatarDataBR } from '../../lib/dateUtils'
import { FERRAMENTAS_AULA } from '../../lib/types'
import type { Aula } from '../../lib/types'

interface RelatorioModalProps {
  aula: Aula
  onClose: () => void
}

type StepId = 'descricao' | 'conteudos' | 'comportamento' | 'recomendacoes' | 'ferramentas' | 'ocorrencias' | 'anexos' | 'nota'

interface StepConfig {
  id: StepId
  titulo: string
  sugestao: string
}

const STEPS: StepConfig[] = [
  { id: 'descricao', titulo: 'Descrição da aula', sugestao: 'Como foi o andamento geral da aula? Conte um resumo do que aconteceu.' },
  { id: 'conteudos', titulo: 'Conteúdos estudados', sugestao: 'Quais conteúdos, tópicos ou exercícios foram trabalhados nesta aula?' },
  { id: 'comportamento', titulo: 'Comportamento do estudante', sugestao: 'Ele se mostrou engajado e participativo? Teve dificuldades de concentração ou desinteresse? Qual comportamento específico merece destaque?' },
  { id: 'recomendacoes', titulo: 'Recomendações', sugestao: 'O que pode ser melhorado para as próximas aulas? Alguma recomendação específica para os responsáveis? Quais materiais podem ser úteis?' },
  { id: 'ferramentas', titulo: 'Ferramentas utilizadas', sugestao: 'Selecione todas as ferramentas e recursos usados nesta aula.' },
  { id: 'ocorrencias', titulo: 'Ocorrências e comunicação para Direção', sugestao: 'Relate qualquer ocorrência relevante que a Direção precise saber: atrasos, imprevistos, comportamento ou segurança. Deixe em branco se não houver nada a relatar.' },
  { id: 'anexos', titulo: 'Anexos da aula', sugestao: 'Anexe uma foto, links ou arquivos em PDF que registrem o material ou o momento da aula (opcional).' },
  { id: 'nota', titulo: 'Nota da aula', sugestao: 'Como você avalia esta aula, de 1 a 5 estrelas?' },
]

export const RelatorioModal: React.FC<RelatorioModalProps> = ({ aula, onClose }) => {
  const { salvarRelatorio } = useProfessorData()
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const [passoAtual, setPassoAtual] = useState(0)
  const [descricao, setDescricao] = useState(aula.descricao || '')
  const [conteudos, setConteudos] = useState(aula.conteudosEstudados || '')
  const [comportamento, setComportamento] = useState(aula.comportamento || '')
  const [recomendacoes, setRecomendacoes] = useState(aula.recomendacoes || '')
  const [ferramentas, setFerramentas] = useState<Set<string>>(new Set(aula.ferramentasUtilizadas || []))
  const [ocorrencias, setOcorrencias] = useState(aula.ocorrencias || '')
  const [foto, setFoto] = useState<string | undefined>(aula.fotoAula)
  const [links, setLinks] = useState<string[]>(aula.anexoLinks || [])
  const [novoLink, setNovoLink] = useState('')
  const [arquivos, setArquivos] = useState<string[]>(aula.anexoArquivos || [])
  const [nota, setNota] = useState(aula.notaAula || 0)
  const [salvando, setSalvando] = useState(false)

  const step = STEPS[passoAtual]
  const progresso = ((passoAtual + 1) / STEPS.length) * 100
  const ultimoPasso = passoAtual === STEPS.length - 1

  function toggleFerramenta(f: string) {
    const novo = new Set(ferramentas)
    if (novo.has(f)) novo.delete(f); else novo.add(f)
    setFerramentas(novo)
  }

  function handleFotoSelecionada(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const reader = new FileReader()
    reader.onload = () => setFoto(reader.result as string)
    reader.readAsDataURL(arquivo)
  }

  function handlePdfSelecionado(e: React.ChangeEvent<HTMLInputElement>) {
    const nomes = Array.from(e.target.files || []).map(f => f.name)
    if (nomes.length) setArquivos(prev => [...prev, ...nomes])
    e.target.value = ''
  }

  function adicionarLink() {
    const valor = novoLink.trim()
    if (!valor) return
    setLinks(prev => [...prev, valor])
    setNovoLink('')
  }

  async function handleFinalizar() {
    setSalvando(true)
    await new Promise(resolve => setTimeout(resolve, 450))
    salvarRelatorio(aula.id, {
      descricao,
      conteudosEstudados: conteudos,
      comportamento,
      recomendacoes,
      ferramentasUtilizadas: [...ferramentas],
      ocorrencias,
      fotoAula: foto,
      notaAula: nota,
      anexoLinks: links,
      anexoArquivos: arquivos,
    })
    setSalvando(false)
    showToast('✅ Relatório salvo com sucesso!', 'success')
    onClose()
  }

  function avancar() {
    if (ultimoPasso) { void handleFinalizar(); return }
    setPassoAtual(p => Math.min(STEPS.length - 1, p + 1))
  }

  function voltar() {
    setPassoAtual(p => Math.max(0, p - 1))
  }

  return (
    <Modal
      title={`Relatório da Aula${aula.data ? ` · ${formatarDataBR(aula.data)}` : ''}`}
      onClose={onClose}
      size="md"
      footer={
        <>
          {passoAtual > 0 && <Button variant="secondary" onClick={voltar} disabled={salvando}>Voltar</Button>}
          <Button variant="primary" onClick={avancar} loading={salvando}>
            {ultimoPasso ? 'Salvar Relatório' : 'Avançar'}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <div style={{ height: '6px', borderRadius: 'var(--radius-full)', background: 'var(--c-border)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progresso}%`, background: 'var(--gradient-accent)', transition: 'width 250ms ease' }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--c-text-3)', fontWeight: 600 }}>
            Etapa {passoAtual + 1} de {STEPS.length}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-md)', color: 'var(--c-text-1)' }}>
            {step.titulo}
          </h4>
          <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--c-text-3)', lineHeight: 1.5 }}>{step.sugestao}</p>
        </div>

        {step.id === 'descricao' && <Textarea rows={6} value={descricao} onChange={e => setDescricao(e.target.value)} />}
        {step.id === 'conteudos' && <Textarea rows={6} value={conteudos} onChange={e => setConteudos(e.target.value)} />}
        {step.id === 'comportamento' && <Textarea rows={6} value={comportamento} onChange={e => setComportamento(e.target.value)} />}
        {step.id === 'recomendacoes' && <Textarea rows={6} value={recomendacoes} onChange={e => setRecomendacoes(e.target.value)} />}
        {step.id === 'ocorrencias' && <Textarea rows={6} value={ocorrencias} onChange={e => setOcorrencias(e.target.value)} />}

        {step.id === 'ferramentas' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {FERRAMENTAS_AULA.map(f => {
              const ativo = ferramentas.has(f)
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFerramenta(f)}
                  style={{
                    padding: '10px 16px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
                    background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
                    color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>
        )}

        {step.id === 'anexos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFotoSelecionada} style={{ display: 'none' }} />
              {foto ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={foto} alt="Foto da aula" style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: 'var(--radius-sm)', display: 'block' }} />
                  <button
                    type="button"
                    onClick={() => setFoto(undefined)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px', width: '26px', height: '26px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', padding: '22px',
                    borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--c-border-lg)', background: 'var(--c-glass-bg-sm)',
                    color: 'var(--c-text-2)', cursor: 'pointer',
                  }}
                >
                  <FiCamera size={20} />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Anexar foto da aula</span>
                </button>
              )}
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Links
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  value={novoLink}
                  onChange={e => setNovoLink(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); adicionarLink() } }}
                  placeholder="https://..."
                  style={{
                    flex: 1, height: '38px', padding: '0 12px', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--c-input-border)', background: 'var(--c-input-bg)', color: 'var(--c-input-text)', fontSize: '13px',
                  }}
                />
                <button type="button" onClick={adicionarLink} style={{ ...btnAcaoStyle, width: '38px' }}>
                  <FiPlus size={16} />
                </button>
              </div>
              {links.map((link, i) => (
                <AnexoLinha key={link + i} icon={<FiLink size={13} />} texto={link} onRemover={() => setLinks(prev => prev.filter((_, idx) => idx !== i))} />
              ))}
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--c-text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Arquivos PDF
              </label>
              <input ref={pdfInputRef} type="file" accept="application/pdf" multiple onChange={handlePdfSelecionado} style={{ display: 'none' }} />
              <button type="button" onClick={() => pdfInputRef.current?.click()} style={{ ...btnAcaoStyle, width: '100%', gap: '8px' }}>
                <FiUpload size={14} /> Selecionar PDF
              </button>
              <div style={{ marginTop: '8px' }}>
                {arquivos.map((arq, i) => (
                  <AnexoLinha key={arq + i} icon={<FiFileText size={13} />} texto={arq} onRemover={() => setArquivos(prev => prev.filter((_, idx) => idx !== i))} />
                ))}
              </div>
            </div>
          </div>
        )}

        {step.id === 'nota' && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', padding: '10px 0' }}>
            {[1, 2, 3, 4, 5].map(valor => (
              <button
                key={valor}
                type="button"
                onClick={() => setNota(valor)}
                aria-label={`${valor} estrela(s)`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <FiStar size={34} color={valor <= nota ? '#f5a623' : 'var(--c-border-lg)'} fill={valor <= nota ? '#f5a623' : 'none'} />
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

const AnexoLinha: React.FC<{ icon: React.ReactNode; texto: string; onRemover: () => void }> = ({ icon, texto, onRemover }) => (
  <div className="glass-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', marginBottom: '6px', fontSize: '12px', color: 'var(--c-text-1)' }}>
    <span style={{ color: 'var(--c-text-mint)', display: 'flex' }}>{icon}</span>
    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{texto}</span>
    <button type="button" onClick={onRemover} style={{ background: 'none', border: 'none', color: 'var(--c-text-3)', cursor: 'pointer', display: 'flex' }}>
      <FiX size={13} />
    </button>
  </div>
)

const btnAcaoStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--c-border)', background: 'var(--c-glass-bg-sm)', color: 'var(--c-text-1)', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
}
