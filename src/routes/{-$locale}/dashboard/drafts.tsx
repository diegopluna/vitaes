import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/drafts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/dashboard/drafts"!</div>
}
