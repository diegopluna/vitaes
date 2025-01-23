import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { passkey } from 'better-auth/plugins/passkey'
import { magicLink } from 'better-auth/plugins'
import { resend } from './resend'
import { env } from '@/env/server'
import MagicLinkEmail from '@/emails/magic-link'

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
