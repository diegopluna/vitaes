import { PDFViewer } from '@/components/pdf-viewer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Editor } from './-components/editor'
import { useResumeStore } from '@/store/resume-store'

export const Route = createFileRoute('/builder/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resume } = useResumeStore()
  const [documentUrl, setDocumentUrl] = useState<string | null | undefined>(
    null,
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  console.log(documentUrl)
  console.log(error)

  return (
    <div className="h-full flex overflow-hidden">
      <div className="flex flex-col overflow-hidden border-r">
        <Editor />
      </div>
      <ScrollArea className="flex-1 h-full bg-muted/50">
        <PDFViewer
          value={resume}
          onUrlChange={setDocumentUrl}
          onRenderError={setError}
        />
      </ScrollArea>
    </div>
  )
}
