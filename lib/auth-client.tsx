import { env } from '@/env'
import { createAuthClient } from 'better-auth/react'
import { passkeyClient } from 'better-auth/client/plugins'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [passkeyClient(), magicLinkClient()],
})
