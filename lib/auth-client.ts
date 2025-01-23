import { env } from '@/env/client'
import { createAuthClient } from 'better-auth/client'
import { passkeyClient } from 'better-auth/plugins/passkey'

export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [passkeyClient()],
})
