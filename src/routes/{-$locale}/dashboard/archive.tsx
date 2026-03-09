import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/archive')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/dashboard/archive"!</div>
}
