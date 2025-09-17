import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
  server: {
    CONVEX_SELF_HOSTED_URL: z.url(),
    CONVEX_SELF_HOSTED_ADMIN_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    INTERNAL_CONVEX_URL: z.url(),
    INTERNAL_FRONTEND_URL: z.url()
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  // },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
})
