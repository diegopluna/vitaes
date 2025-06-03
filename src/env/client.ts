import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
	clientPrefix: 'VITE_',
	client: {
		VITE_APP_URL: z.string().url(),
		VITE_POSTHOG_API_KEY: z.string(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
})
