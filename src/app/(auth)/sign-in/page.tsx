'use client'
import { useAuthState } from '@/providers/auth-state-provider'
import { LoginForm } from './_components/login-form'
import { OtpForm } from './_components/otp-form'

export default function Page() {
  const { step } = useAuthState()
  return (
    <div className="flex w-full justify-center items-center h-screen">
      {step === 'email' && <LoginForm />}
      {step === 'otp' && <OtpForm />}
    </div>
  )
}
