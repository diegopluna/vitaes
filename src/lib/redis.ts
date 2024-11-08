import { env } from '@/env/server'
import { Redis } from 'ioredis'

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
})
