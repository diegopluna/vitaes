import { authClient } from '@/lib/auth-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession()
    if (!session.data) {
      redirect({
        to: '/login',
        throw: true,
      })
    }
    return { session }
  },
})

function RouteComponent() {
  return <Outlet />
}
