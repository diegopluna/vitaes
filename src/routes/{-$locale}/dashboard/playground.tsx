import { createFileRoute } from '@tanstack/react-router'
import { PlaygroundScreen } from '#/features/pdf-playground/playground-screen'

export const Route = createFileRoute('/{-$locale}/dashboard/playground')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PlaygroundScreen />
}
