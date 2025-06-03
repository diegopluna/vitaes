import { env } from '@/env/client'
import { useEffect } from 'react'

export function Posthog() {
	useEffect(() => {
		import('posthog-js').then(({ default: posthog }) => {
			posthog.init(env.VITE_POSTHOG_API_KEY)
		})
	}, [])

	return null
}
