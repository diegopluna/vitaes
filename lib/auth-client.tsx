import { env } from '@/env'
import { createAuthClient } from 'better-auth/react'
import {
  passkeyClient,
  magicLinkClient,
  anonymousClient,
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [passkeyClient(), magicLinkClient(), anonymousClient()],
})
