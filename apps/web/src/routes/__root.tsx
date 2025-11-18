import Loader from '@/components/loader'
import { Toaster } from '@/components/ui/sonner'
import { orpc } from '@/utils/orpc'
// import { createORPCClient } from '@orpc/client'
// import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { op } from '@/lib/op'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import type { AppRouterClient } from '@vitaes/api/routers/index'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools'

// import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import '../index.css'
import { seo } from '@/lib/seo'
import { Providers } from '@/components/providers'

export interface RouterAppContext {
  orpc: typeof orpc
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootLayout,
  head: () => ({
    meta: [
      ...seo({
        title: 'Vitaes',
        description: 'Resume Builder',
        keywords:
          'resume, builder, resume builder, resume builder app, resume builder app',
        image: `${import.meta.env.VITE_APP_URL}/open-graph.png`,
      }),
    ],
    links: [
      {
        rel: 'icon',
        href: '/logo.svg',
      },
    ],
  }),
})

function RootLayout() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  })

  // const [client] = useState<AppRouterClient>(() => createORPCClient(link))
  // const [orpcUtils] = useState(() => createTanstackQueryUtils(client))
  op.track('Landing Page')

  return (
    <>
      <HeadContent />
      <Providers>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="grid grid-rows-[auto_1fr] h-svh">
            {isFetching ? <Loader /> : <Outlet />}
            <Toaster richColors />
          </div>
        </ThemeProvider>
      </Providers>
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
          FormDevtoolsPlugin(),
        ]}
      />
    </>
  )
}
