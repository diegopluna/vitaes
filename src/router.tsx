import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from './components/default-catch-boundary'
import { NotFound } from './components/not-found'
import { getRouterBasePath } from './lib/router-basepath'

// Create a new router instance
export const createRouter = (pathname?: string) => {
	const queryClient = new QueryClient()

	return routerWithQueryClient(
		createTanstackRouter({
			routeTree,
			context: {
				queryClient,
				user: null,
			},
			scrollRestoration: true,
			defaultPreloadStaleTime: 0,
			basepath: getRouterBasePath(pathname),
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
		}),
		queryClient,
	)
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
