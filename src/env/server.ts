import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
	server: {
		SITE_URL: z.string().url(),
		CONVEX_SELF_HOSTED_URL: z.string().url(),
		CONVEX_SELF_HOSTED_ADMIN_KEY: z.string().min(1),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
})
