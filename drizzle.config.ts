import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './server/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './server/db/migrations',
} satisfies Config
