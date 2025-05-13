import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { passkey } from 'better-auth/plugins/passkey'
import { magicLink, anonymous } from 'better-auth/plugins'
import { db } from '../db'
import { env } from '@/env'
import { resend } from '../resend'
import MagicLink from '@/emails/magic-link'
import DeleteAccount from '@/emails/delete-account'

export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        const result = await resend.emails.send({
          from: env.FROM_EMAIL,
          to: [user.email],
          subject: 'Delete your account',
          react: DeleteAccount({
            userName: user.name,
            url,
          }),
        })
        if (result.error) {
          throw new Error(result.error.message)
        }
      },
    },
  },
  advanced: {
    cookiePrefix: 'vitaes',
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  // rateLimit: {
  //   enabled: true,
  // },
  plugins: [
    passkey({
      rpID: env.NODE_ENV === 'production' ? 'vitaes.io' : 'localhost',
      rpName: 'Vitaes',
    }),
    magicLink({
      sendMagicLink: async (data: {
        email: string
        token: string
        url: string
      }) => {
        const result = await resend.emails.send({
          from: env.FROM_EMAIL,
          to: [data.email],
          subject: 'Sign in to Vitaes',
          react: MagicLink({
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
    anonymous(),
  ],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google'],
      allowDifferentEmails: true,
    },
  },
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
})

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>
