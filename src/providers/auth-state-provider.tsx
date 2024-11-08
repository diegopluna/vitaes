'use client'

import { createContext, useContext, useState } from 'react'

type Step = 'email' | 'otp'

type AuthStateContextProps = {
  step: Step
  email: string
  setEmail: (email: string) => void
  setStep: (step: Step) => void
}

const AuthStateContext = createContext<AuthStateContextProps | null>(null)

type AuthStateProviderProps = {
  children: React.ReactNode
}

export const AuthStateProvider = ({ children }: AuthStateProviderProps) => {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')

  return (
    <AuthStateContext.Provider value={{ step, setStep, email, setEmail }}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (!context) {
    throw new Error('useAuthState must be used within an AuthStateProvider')
  }
  return context
}
