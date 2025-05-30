import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import { ThemeProvider, useTheme } from '@/components/theme-provider.tsx'
import type { TRPCRouter } from '@/integrations/trpc/router'
import { seo } from '@/lib/seo.ts'
import { getThemeServerFn } from '@/lib/theme.ts'
import { getLocale } from '@/paraglide/runtime.js'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

interface MyRouterContext {
	queryClient: QueryClient

	trpc: TRPCOptionsProxy<TRPCRouter>
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
	}),

	component: RootComponent,
	loader: () => getThemeServerFn(),
})

function RootComponent() {
	const data = Route.useLoaderData()
	return (
		<ThemeProvider theme={data}>
			<RootDocument>
				<Outlet />
				<TanStackRouterDevtools />

				<TanStackQueryLayout />
			</RootDocument>
		</ThemeProvider>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme()
	return (
		<html className={theme} lang={getLocale()}>
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
