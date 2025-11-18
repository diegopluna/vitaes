import { createFileRoute, redirect } from '@tanstack/react-router'
import { PublicResumeViewer } from '@/components/public-resume-viewer'
import { orpc } from '@/utils/orpc'
import { safeCall } from '@/lib/utils'
import { toast } from 'sonner'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/view/$slug')({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const data = await safeCall(
      orpc.getResumeBySlug.call({ slug: params.slug }),
    )
    if (data.error) {
      if (data.error.cause === 'NOT_FOUND') {
        throw redirect({
          to: '/',
          throw: true,
        })
      }
      if (data.error.cause === 'FORBIDDEN') {
        // Resume exists but is private
        return { resume: null, error: 'FORBIDDEN' as const }
      }
      toast.error('Failed to load resume')
      throw redirect({
        to: '/',
        throw: true,
      })
    }
    return { resume: data.data, error: undefined }
  },
})

function RouteComponent() {
  const { resume, error } = Route.useRouteContext()

  if (error === 'FORBIDDEN' || !resume) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {m['publicViewer.notPublic']()}
          </p>
        </div>
      </div>
    )
  }

  return <PublicResumeViewer resume={resume} />
}
