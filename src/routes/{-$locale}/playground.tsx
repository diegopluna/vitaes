import { createFileRoute } from '@tanstack/react-router'

import { PlaygroundScreen } from '#/features/pdf-playground/playground-screen'

export const Route = createFileRoute('/{-$locale}/playground')({
  ssr: false,
  component: RouteComponent,
})

function RouteComponent() {
  return <PlaygroundScreen />
}
