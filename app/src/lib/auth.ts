import { betterAuth } from 'better-auth'
// import { twoFactor } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import {
  user,
  account,
  session,
  verification,
  twoFactor as twoFactorSchema,
} from '@/db/schema'

import { db } from '@/db'
import { env } from '@/env/server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      session,
      verification,
      twoFactor: twoFactorSchema,
    },
  }),
  plugins: [
    // twoFactor({
    //   issuer: 'Vitaes',
    // }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google'],
    },
  },
})
