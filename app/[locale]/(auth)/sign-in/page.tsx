'use client'

import { useAuthState } from '@/providers/auth-state-provider'
import { LoginForm } from './_components/login-form'
import { SentView } from './_components/sent-view'

export default function SignInPage() {
  const { step } = useAuthState()

  return (
    <div className="flex w-full justify-center items-center h-screen">
      {step === 'email' && <LoginForm />}
      {step === 'sent' && <SentView />}
    </div>
  )
}
