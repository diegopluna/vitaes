import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
  useRouteContext,
} from '@tanstack/react-router'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../index.css?url'
import { createServerFn } from '@tanstack/react-start'
import { getToken } from '@/lib/auth-server'
import type { ConvexQueryClient } from '@convex-dev/react-query'
import { authClient } from '@/lib/auth-client'
import { defaultLocale, getHTMLTextDir } from 'intlayer'
import { IntlayerProvider } from 'react-intlayer'
import { Toaster } from '@vitaes/ui/components/sonner'
import { TooltipProvider } from '@vitaes/ui/components/tooltip'

const getAuth = createServerFn({ method: 'GET' }).handler(async () => {
  return await getToken()
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
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
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/logo.svg',
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const token = await getAuth()
    if (token) {
      // During SSR only (the only time serverHttpClient exists),
      // set the auth token to make HTTP queries with.
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }
    return {
      isAuthenticated: !!token,
      token,
    }
  },
  shellComponent: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })
  return (
    <ConvexBetterAuthProvider
      client={context.convexQueryClient.convexClient}
      authClient={authClient}
      initialToken={context.token}
    >
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ConvexBetterAuthProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches()

  const localeRoute = matches.find((match) => match.routeId === '/{-$locale}')
  const locale = localeRoute?.params?.locale ?? defaultLocale

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        <IntlayerProvider locale={locale}>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </IntlayerProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
