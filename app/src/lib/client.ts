import { createAuthClient } from 'better-auth/react'
// import { twoFactorClient } from 'better-auth/client/plugins'
import { env } from '@/env/client'

export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    // twoFactorClient({
    //   twoFactorPage: '/auth/two-factor',
    // }),
  ],
})
