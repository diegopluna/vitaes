'use client'

import { useState, createContext, use } from 'react'

type Step = 'email' | 'otp'

type AuthStateContextProps = {
  step: Step
  email: string
  setEmail: (email: string) => void
  setStep: (step: Step) => void
}

const AuthStateContext = createContext<AuthStateContextProps | undefined>(
  undefined,
)

type AuthStateProviderProps = {
  children: React.ReactNode
}

export const AuthStateProvider = ({ children }: AuthStateProviderProps) => {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')

  return (
    <AuthStateContext value={{ step, email, setStep, setEmail }}>
      {children}
    </AuthStateContext>
  )
}

export const useAuthState = () => {
  const context = use(AuthStateContext)

  if (!context) {
    throw new Error('useAuthState must be used within an AuthStateProvider')
  }

  return context
}
