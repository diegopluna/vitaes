import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/dashboard/my-resumes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/-$locale/dashboard/my-resumes"!</div>
}
