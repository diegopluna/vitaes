'use client'

import { client } from '@/lib/auth-client'
import { useQuery } from '@tanstack/react-query'
import { createContext, use } from 'react'

type SessionContextProps = {
  session: typeof client.$Infer.Session | null | undefined
  isLoading: boolean
  error: Error | null
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

interface SessionProviderProps {
  children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await client.getSession()
      return session.data
    },
  })

  return (
    <SessionContext value={{ session: data, isLoading: isPending, error }}>
      {children}
    </SessionContext>
  )
}

export const useSession = () => {
  const context = use(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }

  return context
}
