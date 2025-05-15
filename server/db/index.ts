import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { drizzle as neon } from 'drizzle-orm/neon-http'
import { Pool } from 'pg'
import * as schema from './schema'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined
}

const conn =
  globalForDb.conn ??
  new Pool({
    connectionString: env.DATABASE_URL,
  })
if (env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db =
  env.NODE_ENV === 'production'
    ? neon(env.DATABASE_URL, { schema })
    : drizzle(conn, { schema })
