import {
	type Locale,
	isLocale,
	strategy as strategies,
} from '@/paraglide/runtime'
import { createMiddleware } from '@tanstack/react-start'
import { resolveLocale } from './resolve-locale'

export const localeMiddleware = createMiddleware({ type: 'function' }).client(
	async ({ router, next }) => {
		const standardLocale = await resolveLocale()
		return next({
			sendContext: {
				locale:
					extractLocaleFromStrategies(router.latestLocation.href) ??
					standardLocale,
			},
		})
	},
)

function extractLocaleFromStrategies(url: string): Locale | undefined {
	for (const strategy of strategies) {
		if (strategy === 'url') {
			const locale = extractLocaleFromUrl(url)
			if (locale) return locale
		}
	}
}

function extractLocaleFromUrl(url: string): Locale | undefined {
	const urlObj = new URL(url, 'https://vitaes.io')
	const pathSegments = urlObj.pathname.split('/').filter(Boolean)
	if (pathSegments.length > 0) {
		const potentialLocale = pathSegments[0]
		if (isLocale(potentialLocale)) {
			return potentialLocale
		}
	}
}
