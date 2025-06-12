import { type Locale, locales } from '@/paraglide/runtime'
import { useMatch, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest, setCookie } from '@tanstack/react-start/server'

export const DEFAULT_LANGUAGE: Locale = 'en'

export const readLanguageFromHtmlLangAttribute = () => {
	const language = document.documentElement.lang
	if (isSupportedLanguage(language)) {
		return language
	}
	return DEFAULT_LANGUAGE
}

export const getLanguageFromRequest = createServerFn({ method: 'GET' }).handler(
	async () => {
		const request = getWebRequest()
		if (!request) return DEFAULT_LANGUAGE

		const cookie = request.headers.get('cookie')
		const cookieLanguage = cookie
			?.split('; ')
			.find((row: string) => row.startsWith('language='))
		const language = cookieLanguage?.split('=')[1]

		// Check cookie language first
		if (language && isSupportedLanguage(language)) {
			return language
		}

		// Parse accept-language header if no valid cookie language
		const acceptLanguage = request?.headers.get('accept-language')
		if (acceptLanguage) {
			// Split into individual language tags and their quality values
			const languages = acceptLanguage.split(',').map((lang) => {
				const [tag, quality = 'q=1'] = lang.trim().split(';')
				return {
					tag: tag.trim(),
					quality: Number.parseFloat(quality.split('=')[1]),
				}
			})

			// Sort by quality value
			languages.sort((a, b) => b.quality - a.quality)

			// Find the first supported language
			for (const { tag } of languages) {
				if (isSupportedLanguage(tag)) {
					return tag
				}
			}
		}

		// Fallback to default language
		return DEFAULT_LANGUAGE
	},
)

const setLanguage = createServerFn({ method: 'POST' })
	.validator((data: { locale: string }) => data)
	.handler(async ({ data: { locale } }) => {
		setCookie('language', locale)
	})

export const useLanguage = () => {
	const router = useRouter()
	const match = useMatch({ from: '__root__' })
	const language = match?.context.language ?? DEFAULT_LANGUAGE
	const setLanguageFn = async (language: Locale) => {
		await setLanguage({ data: { locale: language } })
		await router.invalidate()
	}
	return [language, setLanguageFn] as const
}

const isSupportedLanguage = (
	language: string | null | undefined,
): language is Locale => {
	if (!language) return false
	return locales.includes(language.trim() as Locale)
}
