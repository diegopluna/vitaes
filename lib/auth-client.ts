import { env } from '@/env/client'
import { createAuthClient } from 'better-auth/client'
import { magicLinkClient, passkeyClient } from 'better-auth/client/plugins'

export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [passkeyClient(), magicLinkClient()],
})
