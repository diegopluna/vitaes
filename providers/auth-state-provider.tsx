'use client'

import React, { createContext } from 'react'

type Step = 'email' | 'sent'

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
  const [step, setStep] = React.useState<Step>('email')
  const [email, setEmail] = React.useState<string>('')

  return (
    <AuthStateContext value={{ step, email, setEmail, setStep }}>
      {children}
    </AuthStateContext>
  )
}

export const useAuthState = () => {
  const context = React.use(AuthStateContext)

  if (!context) {
    throw new Error('useAuthState must be used within an AuthStateProvider')
  }

  return context
}
