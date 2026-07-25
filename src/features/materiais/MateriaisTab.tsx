import React, { useState } from 'react'
import { FiPackage, FiPlus } from 'react-icons/fi'
import { useProfessorData } from '../../lib/ProfessorDataContext'
import { Button } from '../../components/Button'
import { MaterialCard } from './MaterialCard'
import { CompartilharMaterialModal } from './CompartilharMaterialModal'
import { ComprarMaterialModal } from './ComprarMaterialModal'
import type { MaterialDidatico } from '../../lib/types'

export const MateriaisTab: React.FC = () => {
  const { materiais } = useProfessorData()
  const [modalCompartilharAberto, setModalCompartilharAberto] = useState(false)
  const [materialSelecionado, setMaterialSelecionado] = useState<MaterialDidatico | null>(null)

  return (
    <div className="page-wrap page-wrap-wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiPackage size={20} color="var(--c-text-mint)" />
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-lg)', color: 'var(--c-text-1)' }}>Materiais Didáticos</h2>
        </div>
        <Button variant="primary" onClick={() => setModalCompartilharAberto(true)}>
          <FiPlus size={14} style={{ marginRight: '6px' }} />
          Compartilhar novo material didático
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: '16px' }}>
        {materiais.map(material => (
          <MaterialCard key={material.id} material={material} onClick={() => setMaterialSelecionado(material)} />
        ))}
      </div>

      {modalCompartilharAberto && <CompartilharMaterialModal onClose={() => setModalCompartilharAberto(false)} />}
      {materialSelecionado && <ComprarMaterialModal material={materialSelecionado} onClose={() => setMaterialSelecionado(null)} />}
    </div>
  )
}
