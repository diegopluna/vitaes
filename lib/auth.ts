import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { passkey } from 'better-auth/plugins/passkey'

export const auth = betterAuth({
  advanced: {
    cookiePrefix: 'vitaes',
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  rateLimit: {
    enabled: true,
  },
  plugins: [
    passkey({
      // TODO: Pass this data as environment variables
      rpName: 'Vitaes',
      rpID: 'vitaes-cvbuilder',
    }),
  ],
  socialProviders: {},
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google'],
    },
  },
})
