'use client'

import { type DocumentProps, pdf } from '@react-pdf/renderer'

import clsx from 'clsx'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Document, Page, pdfjs } from 'react-pdf'

import { useAsync, useDebounce } from 'react-use'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',

  import.meta.url,
).toString()

type PDFViewerProps = {
  children?: React.ReactElement<DocumentProps>

  onUrlChange?: (url: string | null) => void

  onRenderError?: (error: Error | null) => void

  pageSpacing?: number // Space between pages in pixels

  className?: string

  scale?: number // PDF scale factor
}

const PDFViewer = ({
  children,

  onUrlChange,

  onRenderError,

  pageSpacing = 16,

  className,

  scale = 1.0,
}: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)

  const [debouncedChildren, setDebouncedChildren] = useState(children)

  const scrollRef = useRef<HTMLDivElement>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  // Debounce children changes to prevent rapid re-renders

  useDebounce(
    () => {
      setDebouncedChildren(children)
    },

    300,

    [children],
  )

  const render = useAsync(async () => {
    if (!debouncedChildren) return null

    // Cancel any previous render

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this render

    abortControllerRef.current = new AbortController()

    try {
      const blob = await pdf(debouncedChildren).toBlob()

      // Check if we were aborted

      if (abortControllerRef.current.signal.aborted) {
        return null
      }

      const url = URL.createObjectURL(blob)

      return url
    } catch (error) {
      // If aborted, don't throw error

      if (abortControllerRef.current?.signal.aborted) {
        return null
      }

      throw error
    }
  }, [debouncedChildren])

  // Cleanup function

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  useEffect(() => {
    onUrlChange?.(render.value || null)
  }, [render.value, onUrlChange])

  useEffect(() => {
    onRenderError?.(render.error || null)
  }, [render.error, onRenderError])

  const onDocumentLoad = useCallback((document: { numPages: number }) => {
    setNumPages(document.numPages)
  }, [])

  const onDocumentError = useCallback(
    (error: Error) => {
      console.warn('PDF Document load error:', error)

      onRenderError?.(error)
    },
    [onRenderError],
  )

  const isFirstRendering = !render.value && render.loading

  const hasValidDocument = !!children && !!render.value

  const pageNumbers = numPages
    ? Array.from({ length: numPages }, (_, i) => i + 1)
    : []

  return (
    <div className={clsx('flex flex-col h-full relative', className)}>
      {/* Loading overlay */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000 ${
          isFirstRendering ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-lg text-gray-600">Rendering PDF...</div>
      </div>

      {/* Invalid document overlay */}

      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000 ${
          !render.loading && !children
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-lg text-gray-600">
          You are not rendering a valid document
        </div>
      </div>
      {/* Scrollable document container */}

      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 flex flex-col items-center bg-background/95"
        style={{ scrollBehavior: 'smooth' }}
      >
        {hasValidDocument && (
          <Document
            key={render.value} // Force re-render when URL changes
            file={render.value}
            loading={
              <div className="flex flex-col items-center">
                {Array.from({ length: Math.max(numPages ?? 1, 1) }, (_, i) => (
                  <div
                    key={`skeleton-${i + 1}`}
                    className="relative shadow-lg bg-background/95"
                    style={{
                      marginBottom: i < (numPages ?? 1) - 1 ? pageSpacing : 0,
                    }}
                  >
                    <div className="flex items-center justify-center h-96 bg-gray-50">
                      <div className="text-gray-400">
                        Loading page {i + 1}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
            onLoadSuccess={onDocumentLoad}
            onLoadError={onDocumentError}
            className="flex flex-col items-center"
          >
            {pageNumbers.map((pageNumber, index) => (
              <div
                key={pageNumber}
                className="relative shadow-lg bg-background/95"
                style={{
                  marginBottom:
                    index < pageNumbers.length - 1 ? pageSpacing : 0,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  className="max-w-full"
                  loading={
                    <div className="flex items-center justify-center h-96 bg-gray-50">
                      <div className="text-gray-400">
                        Loading page {pageNumber}...
                      </div>
                    </div>
                  }
                />
              </div>
            ))}
          </Document>
        )}
      </div>
    </div>
  )
}

export default PDFViewer
