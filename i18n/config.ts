export const locales = ['en', 'de', 'es', 'fr', 'ja', 'pt', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
