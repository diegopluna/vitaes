'use client'

import { SignIn } from '@clerk/nextjs'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { AuthLayout } from './auth-layout'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </Unauthenticated>
    </>
  )
}
