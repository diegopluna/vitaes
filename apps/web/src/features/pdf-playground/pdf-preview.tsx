import { useEffect, useState, startTransition } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Document, Page, pdfjs } from 'react-pdf'

import { PlaygroundPdfDocument } from './playground-pdf-document'
import type { ResumeDocument } from '@vitaes/backend/convex/shared/resume'
import type { ResumeTemplateDefinition } from '@vitaes/backend/convex/shared/template'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type PdfPreviewProps = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

export function PdfPreview({ document, template }: PdfPreviewProps) {
  const [file, setFile] = useState<Blob | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    let isDisposed = false

    setIsRendering(true)
    setError(null)
    setPageCount(0)

    void pdf(<PlaygroundPdfDocument document={document} template={template} />)
      .toBlob()
      .then((blob) => {
        if (isDisposed) {
          return
        }

        startTransition(() => {
          setFile(blob)
          setIsRendering(false)
        })
      })
      .catch((renderError) => {
        if (isDisposed) {
          return
        }

        setError(
          renderError instanceof Error
            ? renderError.message
            : 'Failed to render PDF playground document.',
        )
        setIsRendering(false)
      })

    return () => {
      isDisposed = true
    }
  }, [document, isMounted, template])

  if (!isMounted) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center rounded-3xl border border-white/10 bg-[#0d1117] px-6 text-sm text-white/70">
        Initializing PDF playground…
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center rounded-3xl border border-dashed border-red-400/40 bg-red-500/5 px-6 text-sm text-red-200">
        {error}
      </div>
    )
  }

  return (
    <div className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1117]">
      {isRendering ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d1117]/80 text-sm text-white/70">
          Rendering PDF playground…
        </div>
      ) : null}
      {file ? (
        <div className="max-h-[calc(100vh-11rem)] overflow-y-auto p-6">
          <Document
            file={file}
            loading={null}
            onLoadSuccess={(loadedDocument) =>
              setPageCount(loadedDocument.numPages)
            }
            onLoadError={(loadError) =>
              setError(
                loadError instanceof Error
                  ? loadError.message
                  : 'Failed to load PDF file.',
              )
            }
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <div key={index} className="mb-6 flex justify-center last:mb-0">
                <Page
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={820}
                />
              </div>
            ))}
          </Document>
        </div>
      ) : null}
    </div>
  )
}
