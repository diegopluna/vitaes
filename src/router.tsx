import { createRouter as createTanstackRouter } from '@tanstack/react-router'

import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient } from '@tanstack/react-query'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const createRouter = () => {
	// biome-ignore lint: just this time maybe we can use T3Env
	const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!
	if (!CONVEX_URL) {
		throw new Error('missing VITE_CONVEX_URL envar')
	}
	const convex = new ConvexReactClient(CONVEX_URL, {
		unsavedChangesWarning: false,
	})
	const convexQueryClient = new ConvexQueryClient(convex)

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	})
	convexQueryClient.connect(queryClient)

	const router = routerWithQueryClient(
		createTanstackRouter({
			routeTree,
			defaultPreload: 'intent',
			scrollRestoration: true,
			context: { queryClient, convexClient: convex, convexQueryClient },
			Wrap: ({ children }) => (
				<ConvexProvider client={convexQueryClient.convexClient}>
					{children}
				</ConvexProvider>
			),
		}),
		queryClient,
	)

	return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
