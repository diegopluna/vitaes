import { authClient } from '@/lib/auth-client'
import { op } from '@/lib/op'
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
  const { session } = Route.useRouteContext()
  op.identify({
    profileId: session.data?.user.id ?? '',
    email: session.data?.user.email,
    firstName: session.data?.user.name.split(' ')[0],
    lastName: session.data?.user.name.split(' ')[1],
    avatar: session.data?.user.image ?? '',
  })

  return <Outlet />
}
