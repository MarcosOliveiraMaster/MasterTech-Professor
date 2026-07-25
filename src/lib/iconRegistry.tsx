import React from 'react'
import {
  FiActivity, FiAlertCircle, FiBook, FiBookOpen, FiCheckSquare, FiClock, FiCloud, FiCoffee,
  FiCompass, FiDroplet, FiEdit3, FiEyeOff, FiFeather, FiGlobe, FiHash, FiHeart, FiMeh,
  FiMessageCircle, FiMic, FiMoon, FiRefreshCw, FiShield, FiSmile, FiStar, FiSun, FiThumbsUp,
  FiTool, FiTrendingUp, FiUsers, FiWifi, FiZap,
} from 'react-icons/fi'

const REGISTRY: Record<string, React.ComponentType<{ size?: number }>> = {
  book: FiBook, 'book-open': FiBookOpen, 'check-square': FiCheckSquare, clock: FiClock,
  cloud: FiCloud, droplet: FiDroplet, 'edit-3': FiEdit3, feather: FiFeather, globe: FiGlobe,
  hash: FiHash, heart: FiHeart, meh: FiMeh, 'message-circle': FiMessageCircle, moon: FiMoon,
  star: FiStar, users: FiUsers, wifi: FiWifi, zap: FiZap,
  activity: FiActivity, 'alert-circle': FiAlertCircle, coffee: FiCoffee, compass: FiCompass,
  'eye-off': FiEyeOff, mic: FiMic, 'refresh-cw': FiRefreshCw, shield: FiShield, smile: FiSmile,
  sun: FiSun, 'thumbs-up': FiThumbsUp, tool: FiTool, 'trending-up': FiTrendingUp,
}

export const Icone: React.FC<{ nome: string; size?: number }> = ({ nome, size = 15 }) => {
  const Componente = REGISTRY[nome] || FiStar
  return <Componente size={size} />
}
