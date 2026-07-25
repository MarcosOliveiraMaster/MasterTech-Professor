import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const listener = () => setMatches(mql.matches)
    listener()
    mql.addEventListener('change', listener)
    return () => mql.removeEventListener('change', listener)
  }, [query])

  return matches
}

export const BREAKPOINT_MOBILE = '(max-width: 640px)'
export const BREAKPOINT_TABLET = '(min-width: 768px)'
export const BREAKPOINT_DESKTOP = '(min-width: 1100px)'

export function useIsDesktop(): boolean {
  return useMediaQuery(BREAKPOINT_DESKTOP)
}

export function useIsTabletUp(): boolean {
  return useMediaQuery(BREAKPOINT_TABLET)
}

export function useIsMobile(): boolean {
  return useMediaQuery(BREAKPOINT_MOBILE)
}
