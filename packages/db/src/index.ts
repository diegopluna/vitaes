import { drizzle } from 'drizzle-orm/node-postgres'
import * as authSchema from './schema/auth'
import * as appSchema from './schema/app'
import type { NodePgClient } from 'drizzle-orm/node-postgres'

export const db = drizzle(
  process.env.DATABASE_URL || ('' as string | NodePgClient),
  {
    schema: {
      ...authSchema,
      ...appSchema,
    },
  },
)
