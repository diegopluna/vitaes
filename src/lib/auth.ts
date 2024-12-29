import { betterAuth } from 'better-auth'
import { magicLink, passkey } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import {
  user,
  account,
  session,
  verification,
  passkey as passkeySchema,
} from '@/db/schema'

import { db } from '@/db'
import { env } from '@/env/server'
import { resend } from './resend'
import MagicLinkEmail from '../../emails/magic-link'
// import { redis } from './redis'

export const auth = betterAuth({
  advanced: {
    cookiePrefix: 'vitaes',
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      account,
      session,
      verification,
      passkey: passkeySchema,
    },
  }),
  // secondaryStorage: {
  //   get: async (key) => await redis.get(key),
  //   set: async (key, value, ttl) => {
  //     if (ttl) await redis.set(key, value, 'EX', ttl)
  //     else await redis.set(key, value)
  //   },
  //   delete: async (key) => {
  //     await redis.del(key)
  //   },
  // },
  rateLimit: {
    // storage: 'secondary-storage',
    enabled: true,
  },
  plugins: [
    magicLink({
      sendMagicLink: async (data: {
        email: string
        token: string
        url: string
      }) => {
        const result = await resend.emails.send({
          from: env.VITAES_EMAIL,
          to: [data.email],
          subject: 'Sign in to Vitaes',
          react: MagicLinkEmail({
            userFirstname: data.email.split('@')[0],
            token: data.token,
            url: data.url,
          }),
        })
        if (result.error) {
          throw new Error(result.error.message)
        }
      },
      rateLimit: {
        window: 60,
        max: 1,
      },
    }),
    passkey({
      rpName: 'Vitaes',
    }),
  ],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google'],
    },
  },
})
