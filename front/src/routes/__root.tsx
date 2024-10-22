import * as React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="bg-background antialised min-h-screen font-sans">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
