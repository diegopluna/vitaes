import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { passkey } from 'better-auth/plugins/passkey'
import { passkey as passkeySchema } from '@/db/schema'
import { magicLink } from 'better-auth/plugins'
import { resend } from './resend'
import { env } from '@/env/server'
import MagicLinkEmail from '@/emails/magic-link'
import DeleteAccountEmail from '@/emails/delete-account'
import { eq } from 'drizzle-orm'

export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        // TODO: Delete passkeys and resumes
        await db.delete(passkeySchema).where(eq(passkeySchema.userId, user.id))
      },
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        const result = await resend.emails.send({
          from: env.VITAES_EMAIL,
          to: [user.email],
          subject: 'Delete your Vitaes account',
          react: DeleteAccountEmail({
            userFirstname: user.email.split('@')[0],
            url,
            token,
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
  rateLimit: {
    enabled: true,
  },
  plugins: [
    passkey({
      // TODO: Pass this data as environment variables
      // rpName: 'Vitaes',
      // rpID: 'vitaes-cvbuilder',
      // rpID: 'localhost',
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
