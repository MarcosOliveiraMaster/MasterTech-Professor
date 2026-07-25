import type { IconType } from 'react-icons'
import {
  FiAward, FiBarChart2, FiBell, FiBookOpen, FiDollarSign, FiFileText, FiGlobe,
  FiGrid, FiLayers, FiPackage, FiUser, FiUsers,
} from 'react-icons/fi'

export interface NavItem {
  id: string
  label: string
  path: string
  icon: IconType
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'aulas', label: 'Aulas', path: '/painel/aulas', icon: FiBookOpen },
  { id: 'financeiro', label: 'Financeiro', path: '/painel/financeiro', icon: FiDollarSign },
  { id: 'analise', label: 'Análise', path: '/painel/analise', icon: FiBarChart2 },
  { id: 'materiais', label: 'Materiais Didáticos', path: '/painel/materiais', icon: FiPackage },
  { id: 'avisos', label: 'Avisos', path: '/painel/avisos', icon: FiBell },
  { id: 'fichas', label: 'Fichas de Cliente', path: '/painel/fichas-cliente', icon: FiUsers },
  { id: 'contratos', label: 'Contratos', path: '/painel/contratos', icon: FiFileText },
  { id: 'recursos', label: 'Recursos', path: '/painel/recursos', icon: FiLayers },
  { id: 'canvas', label: 'Canvas', path: '/painel/canvas', icon: FiGrid },
  { id: 'perfil', label: 'Perfil', path: '/painel/perfil', icon: FiUser },
  { id: 'minha-area', label: 'Minha Área', path: '/painel/minha-area', icon: FiGlobe },
  { id: 'certificacoes', label: 'Certificações', path: '/painel/certificacoes', icon: FiAward },
]
