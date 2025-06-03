import { db } from '@/db'
import { env as clientEnv } from '@/env/client'
import { env } from '@/env/server'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { reactStartCookies } from 'better-auth/react-start'

export const auth = betterAuth({
	advanced: {
		cookiePrefix: 'vitaes',
	},
	database: drizzleAdapter(db, { provider: 'pg' }),
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['google', 'github'],
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
	trustedOrigins: [clientEnv.VITE_APP_URL],
	plugins: [reactStartCookies()],
})

export type User = typeof auth.$Infer.Session.user
