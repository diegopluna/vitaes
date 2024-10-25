import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAsync } from 'react-use'
import { pdf } from '@react-pdf/renderer'

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
  z-index: 500;
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

export const PDFViewer = ({ value, onUrlChange, onRenderError }) => {
  const [numPages, setNumPages] = React.useState<number | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  const [previousRenderValue, setPreviousRenderValue] = React.useState(null)

  const render = useAsync(async () => {
    if (!value) return null

    const blob = await pdf(value).toBlob()
    const url = URL.createObjectURL(blob)
    return url
  }, [value])

  useEffect(() => onUrlChange(render.value), [render.value])

  useEffect(() => onRenderError(render.error), [render.error])

  const onPreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const onDocumentLoad = (document) => {
    setNumPages(document.numPages)
    setCurrentPage((prev) => Math.min(prev, document.numPages))
  }

  const isFirstRendering = !previousRenderValue

  const isLatestValueRendered = previousRenderValue === render.value
  const isBusy = render.loading || !isLatestValueRendered

  return (
    <Wrapper>
      <DocumentWrapper>{}</DocumentWrapper>
    </Wrapper>
  )
}
