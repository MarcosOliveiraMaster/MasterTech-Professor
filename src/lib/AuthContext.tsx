import React, { createContext, useContext, useEffect, useState } from 'react'

interface Session {
  email: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthContextValue {
  user: Session | null
  loading: boolean
  login: (email: string, senha: string) => Promise<AuthResult>
  logout: () => void
}

const SESSION_KEY = 'mep:session'

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(SESSION_KEY)
      }
    }
    setLoading(false)
  }, [])

  async function login(email: string, senha: string): Promise<AuthResult> {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return { success: false, error: 'Informe seu e-mail.' }
    if (!senha || senha.length < 1) return { success: false, error: 'Informe sua senha.' }

    // Ambiente mockado: qualquer credencial preenchida autentica com sucesso.
    const session: Session = { email: trimmedEmail }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return { success: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
