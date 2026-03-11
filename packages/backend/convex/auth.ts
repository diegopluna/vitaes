import { expo } from '@better-auth/expo'
import type { GenericCtx } from '@convex-dev/better-auth'
import { createClient } from '@convex-dev/better-auth'
import { convex, crossDomain } from '@convex-dev/better-auth/plugins'
import type { BetterAuthOptions } from 'better-auth/minimal'
import { betterAuth } from 'better-auth/minimal'
import { lastLoginMethod } from 'better-auth/plugins'
import { components } from './_generated/api'
import { query } from './_generated/server'
import authConfig from './auth.config'

import type { DataModel } from './_generated/dataModel'
import authSchema from './betterAuth/schema'

const siteUrl = process.env.SITE_URL!
const nativeAppUrl = process.env.NATIVE_APP_URL || 'vitaes://'

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  },
)

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    // ... auth config
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
      apple: {
        clientId: process.env.APPLE_CLIENT_ID!,
        clientSecret: process.env.APPLE_CLIENT_SECRET!,
      },
    },
    trustedOrigins: [
      siteUrl,
      nativeAppUrl,
      ...(process.env.NODE_ENV === 'development'
        ? ['exp://', 'exp://**', 'exp://192.168.*.*:*/**']
        : []),
      'https://appleid.apple.com',
    ],
    plugins: [
      expo(),
      crossDomain({ siteUrl }),
      convex({ authConfig, jwksRotateOnTokenGenerationError: true }),
      lastLoginMethod(),
    ],
  } satisfies BetterAuthOptions
}

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx))
}

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx)
  },
})
