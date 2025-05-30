import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import { DefaultCatchBoundary } from './components/default-catch-boundary'
import { NotFound } from './components/not-found'
import { getRouterBasePath } from './lib/router-basepath'

// Create a new router instance
export const createRouter = (pathname?: string) => {
	const router = routerWithQueryClient(
		createTanstackRouter({
			routeTree,
			context: {
				...TanstackQuery.getContext(),
				user: null,
			},
			scrollRestoration: true,
			defaultPreloadStaleTime: 0,

			Wrap: (props: { children: React.ReactNode }) => {
				return <TanstackQuery.Provider>{props.children}</TanstackQuery.Provider>
			},
			basepath: getRouterBasePath(pathname),
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
		}),
		TanstackQuery.getContext().queryClient,
	)

	return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
