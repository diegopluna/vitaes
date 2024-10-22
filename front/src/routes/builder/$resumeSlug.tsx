import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/$resumeSlug')({
  component: () => <div>Hello /builder/$resumeSlug!</div>,
})
