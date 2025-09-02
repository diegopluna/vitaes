import { convexAdapter } from '@convex-dev/better-auth'
import { convex } from '@convex-dev/better-auth/plugins'
import { requireEnv } from '@convex-dev/better-auth/utils'
import { betterAuth } from 'better-auth'
import type { GenericCtx } from '../convex/_generated/server'
import { betterAuthComponent } from '../convex/auth'

const siteUrl = requireEnv('SITE_URL')

export const createAuth = (ctx: GenericCtx) => {
  return betterAuth({
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    // TODO: Remove before deployment
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['github', 'google'],
        allowDifferentEmails: true,
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    plugins: [
      // Pass in options so plugin schema inference flows through. Only required
      // for plugins that customize the user or session schema.
      // See "Some caveats":
      // https://www.better-auth.com/docs/concepts/session-management#customizing-session-response
      convex(),
    ],
  })
}
