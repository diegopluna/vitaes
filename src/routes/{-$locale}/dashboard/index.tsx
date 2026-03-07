import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/dashboard/"!</div>
}
