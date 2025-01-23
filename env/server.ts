import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    DATABASE_URL: z.string().url(),
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.string().min(1),
    REDIS_PASSWORD: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    VITAES_EMAIL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
})
