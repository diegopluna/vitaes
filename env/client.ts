import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_CONVEX_URL: z.url(),
    NEXT_PUBLIC_CONVEX_SITE_URL: z.url(),
    NEXT_PUBLIC_CLERK_FRONTEND_API_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    NEXT_PUBLIC_CLERK_FRONTEND_API_URL:
      process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
  },
})
