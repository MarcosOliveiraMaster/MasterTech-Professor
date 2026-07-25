import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function criarIcone(cor: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:16px;height:16px;border-radius:50%;
      background:${cor};border:3px solid #fff;
      box-shadow:0 0 0 2px ${cor}, 0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

const ICONE_PROFESSOR = criarIcone('#3d8fc9')
const ICONE_CLIENTE = criarIcone('#22a578')

interface ClienteMapProps {
  clienteLat: number
  clienteLng: number
  clienteLabel: string
  professorLat: number
  professorLng: number
  professorLabel: string
}

export const ClienteMap: React.FC<ClienteMapProps> = ({ clienteLat, clienteLng, clienteLabel, professorLat, professorLng, professorLabel }) => {
  const bounds = L.latLngBounds([[clienteLat, clienteLng], [professorLat, professorLng]])

  return (
    <div style={{ height: '260px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
      <MapContainer bounds={bounds} boundsOptions={{ padding: [36, 36] }} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[clienteLat, clienteLng]} icon={ICONE_CLIENTE}>
          <Popup>📍 {clienteLabel}</Popup>
        </Marker>
        <Marker position={[professorLat, professorLng]} icon={ICONE_PROFESSOR}>
          <Popup>👩‍🏫 {professorLabel}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
