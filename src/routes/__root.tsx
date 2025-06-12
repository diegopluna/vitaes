import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import { ThemeProvider, useTheme } from '@/components/theme-provider.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { env } from '@/env/client'
import { auth } from '@/lib/auth.ts'
import { getLanguageFromRequest } from '@/lib/i18n'
import { Posthog } from '@/lib/posthog'
import { seo } from '@/lib/seo.ts'
import { getThemeServerFn } from '@/lib/theme.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import type { User } from 'better-auth'

const getUser = createServerFn({ method: 'GET' }).handler(async () => {
	const { headers } = getWebRequest()!
	const session = await auth.api.getSession({ headers })
	return session?.user || null
})

interface MyRouterContext {
	queryClient: QueryClient
	user: User | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'Vitaes',
				description: 'Resume Builder',
				keywords:
					'resume, builder, resume builder, resume builder app, resume builder app',
				image: `${env.VITE_APP_URL}/open-graph.png`,
			}),
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				rel: 'apple-touch-icon',
				href: '/apple-touch-icon.png',
				sizes: '180x180',
			},
			{
				rel: 'icon',
				sizes: '32x32',
				type: 'image/png',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				sizes: '16x16',
				type: 'image/png',
				href: '/favicon-16x16.png',
			},
			{
				rel: 'manifest',
				href: '/site.webmanifest',
			},
			{
				rel: 'icon',
				href: '/favicon.ico',
			},
		],
		scripts: [
			{
				defer: true,
				src: '/js/script.js',
				'data-domain': 'vitaes.io',
				'data-website-id': '683f0ec028efdbf0be65ad7d',
			},
		],
	}),

	component: RootComponent,
	beforeLoad: async ({ context }) => {
		const language = await getLanguageFromRequest()
		const user = await context.queryClient.fetchQuery({
			queryKey: ['user'],
			queryFn: ({ signal }) => getUser({ signal }),
		})
		return { user, language }
	},
	loader: async ({ context }) => {
		const theme = await getThemeServerFn()
		return { theme, language: context.language }
	},
})

function RootComponent() {
	const { theme } = Route.useLoaderData()
	return (
		<ThemeProvider theme={theme}>
			<RootDocument>
				<Outlet />
				<Toaster richColors />
				<Posthog />
				<TanStackRouterDevtools />

				<ReactQueryDevtools buttonPosition="bottom-right" />
			</RootDocument>
		</ThemeProvider>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme()
	const { language } = Route.useLoaderData()
	return (
		<html className={theme} lang={language} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
