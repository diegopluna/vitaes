import { env } from '@/env/client'
import { type Locale, isLocale, strategy } from '@/paraglide/runtime'

export function extractLocale(url: string): Locale | undefined {
	const urlObj = new URL(url, env.VITE_APP_URL)
	const pathSegments = urlObj.pathname.split('/').filter(Boolean)
	if (pathSegments.length > 0) {
		const potentialLocale = pathSegments[0]
		if (isLocale(potentialLocale)) {
			return potentialLocale
		}
	}
}

export function getRouterBasePath(pathname?: string): string | undefined {
	const extractedLocale = extractLocale(pathname ?? '/')
	return strategy.includes('url') && extractedLocale
		? `/${extractedLocale}`
		: undefined
}
