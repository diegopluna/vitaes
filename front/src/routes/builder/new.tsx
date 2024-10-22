import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/new')({
  component: () => <div>Hello /builder/new!</div>,
})
