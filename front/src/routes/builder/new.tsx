import { Builder } from '@/components/builder/builder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/builder/new')({
  component: () => Builder(),
})
