import React from 'react'
import { MapContainer, Marker, Tooltip as LeafletTooltip, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MACEIO_BAIRROS_MAPA, MARECHAL_DEODORO, REGIAO_METROPOLITANA } from '../../lib/constants'

function criarIcone(selecionado: boolean): L.DivIcon {
  const cor = selecionado ? '#22a578' : '#7e85cf'
  return L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${cor};border:2px solid #fff;
      box-shadow:0 0 0 2px ${cor}99;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

interface MapaBairrosProps {
  selecionados: string[]
  onToggleBairro: (nome: string) => void
}

export const MapaBairros: React.FC<MapaBairrosProps> = ({ selecionados, onToggleBairro }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
      <MapContainer center={[-9.615, -35.735]} zoom={11} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {MACEIO_BAIRROS_MAPA.map(b => {
          const ativo = selecionados.includes(b.nome)
          return (
            <Marker
              key={b.nome}
              position={[b.lat, b.lng]}
              icon={criarIcone(ativo)}
              eventHandlers={{ click: () => onToggleBairro(b.nome) }}
            >
              <LeafletTooltip direction="top" offset={[0, -6]}>{b.nome}{ativo ? ' ✓' : ''}</LeafletTooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {[REGIAO_METROPOLITANA, MARECHAL_DEODORO].map(regiao => {
        const ativo = selecionados.includes(regiao)
        return (
          <button
            key={regiao}
            type="button"
            onClick={() => onToggleBairro(regiao)}
            style={{
              padding: '8px 14px', borderRadius: 'var(--radius-full)', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${ativo ? 'var(--c-border-mint)' : 'var(--c-border)'}`,
              background: ativo ? 'var(--c-glass-bg-mint)' : 'var(--c-glass-bg-sm)',
              color: ativo ? 'var(--c-text-mint)' : 'var(--c-text-1)',
            }}
          >
            {regiao}
          </button>
        )
      })}
    </div>

    {selecionados.some(s => MACEIO_BAIRROS_MAPA.some(b => b.nome === s) || s === REGIAO_METROPOLITANA || s === MARECHAL_DEODORO) && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {selecionados.filter(s => MACEIO_BAIRROS_MAPA.some(b => b.nome === s) || s === REGIAO_METROPOLITANA || s === MARECHAL_DEODORO).map(s => (
          <span key={s} style={{
            fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
            background: 'var(--c-badge-mint-bg)', color: 'var(--c-badge-mint-text)',
          }}>
            {s}
          </span>
        ))}
      </div>
    )}
  </div>
)
