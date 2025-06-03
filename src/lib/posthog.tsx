import { env } from '@/env/client'
import { useEffect } from 'react'

export function Posthog() {
	useEffect(() => {
		import('posthog-js').then(({ default: posthog }) => {
			posthog.init(env.VITE_POSTHOG_API_KEY, {
				api_host: `${env.VITE_APP_URL}/prx/ph`,
			})
		})
	}, [])

	return null
}
