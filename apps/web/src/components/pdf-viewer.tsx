import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { pdfjs, Document, Page } from 'react-pdf'
import { useAsync } from 'react-use'
import { ResumePDF } from './resume'
import type { OnDocumentLoadSuccess } from 'react-pdf/dist/shared/types.js'
import { useResumeStore } from '@/context/use-resume-store'
import { m } from '@/paraglide/messages'
import { Separator } from './ui/separator'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`

const DocumentWrapper = styled.div`
  flex: 1;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  .react-pdf__Document {
    &.previous-document {
      canvas {
        opacity: 0.5;
      }
    }

    &.rendering-document {
      position: absolute;

      .react-pdf__Page {
        box-shadow: none;
      }
    }
  }
`

const Message = styled.div<{ active: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  transition: all 1s;
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
`

interface PDFViewerProps {
  onUrlChange: (value: string | null | undefined) => void
  onRenderError: (error?: Error) => void
}

export function PDFViewer({
  onUrlChange,
  onRenderError,
}: Readonly<PDFViewerProps>) {
  const { resume: value } = useResumeStore()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [previousRenderValue, setPreviousRenderValue] = useState<
    string | null | undefined
  >(null)

  const render = useAsync(async () => {
    if (!value) return null

    const blob = await pdf(<ResumePDF value={value} />).toBlob()
    const url = URL.createObjectURL(blob)

    return url
  }, [value])

  useEffect(() => onUrlChange(render.value), [render.value, onUrlChange])

  useEffect(() => onRenderError(render.error), [render.error, onRenderError])

  const onDocumentLoad: OnDocumentLoadSuccess = (d) => {
    setNumPages(d.numPages)
    setCurrentPage((prev) => Math.min(prev, d.numPages))
  }

  const isFirstRendering = !previousRenderValue

  const isLatestValueRendered = previousRenderValue === render.value
  const isBusy = render.loading || !isLatestValueRendered

  const shouldShowTextLoader = isFirstRendering && isBusy
  const shouldShowPreviousDocument = !isFirstRendering && isBusy

  return (
    <Wrapper>
      <Message active={shouldShowTextLoader}>Rendering PDF...</Message>

      <Message active={!render.loading && !value}>
        {m['pdfViewer.noDocument']()}
      </Message>
      <DocumentWrapper>
        {shouldShowPreviousDocument && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            className="previous-document"
            file={previousRenderValue}
            loading={null}
          >
            <Page key={currentPage} pageNumber={currentPage} />
          </Document>
        ) : null}
        <Document
          key={render.value}
          className={shouldShowPreviousDocument ? 'rendering-document' : null}
          file={render.value}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          {numPages &&
            Array.from({ length: numPages }).map((_, index) => (
              <Fragment key={index}>
                <Page
                  pageNumber={index + 1}
                  onRenderSuccess={() => setPreviousRenderValue(render.value)}
                />
                {index < numPages - 1 && <Separator className="my-4" />}
              </Fragment>
            ))}
        </Document>
      </DocumentWrapper>
    </Wrapper>
  )
}
