import { createRouter } from '@tanstack/react-router'
import { env } from '@vitaes/env/web'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as Sentry from '@sentry/tanstackstart-react'

import { QueryClient } from '@tanstack/react-query'

import { ConvexQueryClient } from '@convex-dev/react-query'

import './index.css'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const CONVEX_URL = env.VITE_CONVEX_URL
  if (!CONVEX_URL) {
    throw new Error('VITE_CONVEX_URL is not defined')
  }

  const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  })
  convexQueryClient.connect(queryClient)

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: { queryClient, convexQueryClient },
    scrollRestoration: true,
    defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: () => <p>not found</p>,
  })

  if (!router.isServer) {
    Sentry.init({
      dsn: 'https://028ccc49fff6baa9f9e29128f5d6950e@o4508814275051520.ingest.us.sentry.io/4511017249144832',

      // Adds request headers and IP for users, for more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
      sendDefaultPii: true,
      integrations: [],
    })
  }

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
