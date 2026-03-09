import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/templates')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/dashboard/templates"!</div>
}
