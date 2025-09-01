import { TanstackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useRouteContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'

import { env } from '@/env/client'
import { authClient } from '@/lib/auth-client'
import { seo } from '@/lib/seo'
import { fetchSession, getCookieName } from '@/lib/server-auth-utils'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import type { ConvexQueryClient } from '@convex-dev/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { getCookie, getWebRequest } from '@tanstack/react-start/server'
import type { ConvexReactClient } from 'convex/react'
import appCss from '../styles.css?url'

// Server side session request
const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
	const sessionCookieName = await getCookieName()
	const token = getCookie(sessionCookieName)
	const request = getWebRequest()
	const { session } = await fetchSession(request)
	return {
		userId: session?.user.id,
		token,
	}
})

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
	convexClient: ConvexReactClient
	convexQueryClient: ConvexQueryClient
}>()({
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
	}),
	beforeLoad: async (ctx) => {
		// all queries, mutations and action made with TanStack Query will be
		// authenticated by an identity token.
		const auth = await fetchAuth()
		const { userId, token } = auth
		// During SSR only (the only time serverHttpClient exists),
		// set the auth token for Convex to make HTTP queries with.
		if (token) {
			ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
		}
		return { userId, token }
	},
	component: RootComponent,
})

function RootComponent() {
	const context = useRouteContext({ from: Route.id })
	return (
		<ConvexBetterAuthProvider
			client={context.convexClient}
			authClient={authClient}
		>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ConvexBetterAuthProvider>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanstackDevtools
					config={{
						position: 'bottom-left',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						{
							name: 'TanstackQuery',
							render: <ReactQueryDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
