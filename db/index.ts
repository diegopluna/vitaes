import { env } from '@/env/server'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: 'snake_case',
})
