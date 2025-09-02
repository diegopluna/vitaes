import {
	type Locale,
	baseLocale,
	extractLocaleFromRequest,
	getLocale,
} from '@/paraglide/runtime'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import { paraglideMiddleware } from '@/paraglide/server'

export const resolveLocale = createIsomorphicFn()
	.client(getLocale)
	.server(() => {
		const request = getWebRequest()

		if (!request) {
			return baseLocale
		}

		// biome-ignore lint: just ignore it
		return new Promise<Locale>(async (resolve) => {
			await paraglideMiddleware(request, ({ locale }) => {
				resolve(locale)
			})

			resolve(extractLocaleFromRequest(request))
		})
	})
