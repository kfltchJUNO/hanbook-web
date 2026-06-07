'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { subscribeAuth, logout } from '@/lib/firebase'

interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthCtx {
  user: AuthUser | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeAuth((u: AuthUser | null) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)