import { createAuthClient } from 'better-auth/react'
import { magicLinkClient, passkeyClient } from 'better-auth/client/plugins'

import { env } from '@/env/client'

export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [magicLinkClient(), passkeyClient()],
})
