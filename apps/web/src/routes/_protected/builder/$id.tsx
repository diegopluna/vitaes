import { PDFViewer } from '@/components/pdf-viewer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { Editor } from './-components/editor'
import { orpc } from '@/utils/orpc'
import { safeCall } from '@/lib/utils'
import { toast } from 'sonner'
import { ResumeProvider } from '@/context/resume-provider'
import BuilderHeader from '@/components/builder-header'

export const Route = createFileRoute('/_protected/builder/$id')({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const data = await safeCall(orpc.getResumeById.call({ id: params.id }))
    if (data.error) {
      toast.error('Failed to load resume')
      redirect({ to: '/dashboard' })
    }
    return { resume: data.data! }
  },
})

function RouteComponent() {
  const { resume: initialResume } = Route.useRouteContext()

  const [documentUrl, setDocumentUrl] = useState<string | null | undefined>(
    null,
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  console.log(documentUrl)
  console.log(error)

  return (
    <ResumeProvider
      initialLastSaved={initialResume.updatedAt}
      initialResume={initialResume.data!}
      initialResumeName={initialResume.name}
    >
      <BuilderHeader documentUrl={documentUrl ?? ''} />
      <div className="h-full flex overflow-hidden">
        <div className="flex flex-col overflow-hidden border-r  w-[525px]">
          <Editor initialResume={initialResume.data!} />
        </div>
        <ScrollArea className="flex-1 h-full bg-muted/50">
          <PDFViewer onUrlChange={setDocumentUrl} onRenderError={setError} />
        </ScrollArea>
      </div>
    </ResumeProvider>
  )
}
