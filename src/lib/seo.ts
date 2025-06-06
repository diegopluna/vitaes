import { env } from '@/env/client'

export const seo = ({
	title,
	description,
	keywords,
	image,
}: {
	title: string
	description?: string
	image?: string
	keywords?: string
}) => {
	const tags = [
		{ title },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:creator', content: '@diegopeterl' },
		{ name: 'twitter:site', content: '@diegopeterl' },
		{ name: 'og:type', content: 'website' },
		{ name: 'og:title', content: title },
		{ name: 'og:site_name', content: 'Vitaes' },
		{ name: 'og:url', content: env.VITE_APP_URL },
		{ name: 'og:description', content: description },
		...(image
			? [
					{ name: 'twitter:image', content: image },
					{ name: 'twitter:card', content: 'summary_large_image' },
					{ name: 'og:image', content: image },
				]
			: []),
	]

	return tags
}
