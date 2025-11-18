import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { PDFViewer } from './pdf-viewer'
import { ResumeProvider } from '@/context/resume-provider'
import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { m } from '@/paraglide/messages'
import { orpc } from '@/utils/orpc'
import { useMutation } from '@tanstack/react-query'
import { safeCall } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'
import { LanguageSelector } from './language-selector'
import type { IResume } from '@vitaes/types/resume'

interface PublicResumeViewerProps {
  resume: {
    id: string
    name: string
    data: IResume | null
    updatedAt: Date
    isPublic: boolean
  }
}

export function PublicResumeViewer({ resume }: PublicResumeViewerProps) {
  const [documentUrl, setDocumentUrl] = useState<string | null | undefined>(
    null,
  )
  const [error, setError] = useState<Error | undefined>(undefined)
  console.log(error)

  const setDownloadCount = useMutation(orpc.setDownloadCount.mutationOptions())

  const handleDownload = async () => {
    if (!documentUrl) return

    // Only increment download count for public resumes
    if (resume.isPublic) {
      await safeCall(setDownloadCount.mutateAsync({ id: resume.id }))
    }

    // Trigger download
    const link = document.createElement('a')
    link.href = documentUrl
    link.download = `${resume.name}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!resume.data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {m['publicViewer.notFound']()}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ResumeProvider
      initialResume={resume.data}
      initialLastSaved={resume.updatedAt}
      initialResumeName={resume.name}
    >
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="Vitaes" className="h-6 w-6" />
              <span className="text-lg font-semibold">Vitaes</span>
            </Link>
            <div className="flex-1 flex justify-center">
              <h1 className="text-lg font-semibold">{resume.name}</h1>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <ModeToggle />
              <LanguageSelector />
              {resume.isPublic && documentUrl && (
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="size-4" />
                  {m['publicViewer.download']()}
                </Button>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <PDFViewer onUrlChange={setDocumentUrl} onRenderError={setError} />
        </main>
      </div>
    </ResumeProvider>
  )
}
