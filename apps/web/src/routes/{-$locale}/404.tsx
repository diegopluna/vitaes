import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/404')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/404"!</div>
}
