import { env } from '@/env/server'
import { drizzle as neon } from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

/**
 * Cache the database connection in development. This avoids a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL)
if (env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db =
	env.NODE_ENV === 'production'
		? neon(env.DATABASE_URL, { schema })
		: drizzle(conn, { schema })
