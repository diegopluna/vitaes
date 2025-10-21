import Loader from '@/components/loader'
import { Toaster } from '@/components/ui/sonner'
import { orpc, link } from '@/utils/orpc'
import { createORPCClient } from '@orpc/client'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { AppRouterClient } from '@vitaes/api/routers/index'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

export interface RouterAppContext {
  orpc: typeof orpc
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootLayout,
  head: () => ({
    meta: [
      {
        title: 'Vitaes',
      },
      {
        name: 'description',
        content: 'Vitaes is a web application',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
})

function RootLayout() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  })

  const [client] = useState<AppRouterClient>(() => createORPCClient(link))
  const [orpcUtils] = useState(() => createTanstackQueryUtils(client))

  return (
    <>
      <HeadContent />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="grid grid-rows-[auto_1fr] h-svh">
          <Header />
          {isFetching ? <Loader /> : <Outlet />}
          <Toaster richColors />
        </div>
      </ThemeProvider>
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
