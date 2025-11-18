import { pdf } from '@react-pdf/renderer'
import { ResumePDF } from '@/components/resume'
import type { IResume } from '@vitaes/types/resume'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
if (typeof globalThis.window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
}

const THUMBNAIL_WIDTH = 800
const THUMBNAIL_HEIGHT = 1000
const JPEG_QUALITY = 0.9

export async function generateThumbnail(
  resume: IResume,
): Promise<string | null> {
  try {
    // Generate PDF blob
    const pdfBlob = await pdf(<ResumePDF value={resume} />).toBlob()

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: await pdfBlob.arrayBuffer(),
    })
    const pdfDocument = await loadingTask.promise

    // Get first page
    const page = await pdfDocument.getPage(1)

    // Calculate scale to fit thumbnail dimensions
    const viewport = page.getViewport({ scale: 1.0 })
    const scale = Math.min(
      THUMBNAIL_WIDTH / viewport.width,
      THUMBNAIL_HEIGHT / viewport.height,
    )
    const scaledViewport = page.getViewport({ scale })

    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = THUMBNAIL_WIDTH
    canvas.height = THUMBNAIL_HEIGHT
    const context = canvas.getContext('2d')

    if (!context) {
      return null
    }

    // Fill background with white
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)

    // Center the PDF content on canvas
    const xOffset = (THUMBNAIL_WIDTH - scaledViewport.width) / 2
    const yOffset = (THUMBNAIL_HEIGHT - scaledViewport.height) / 2

    // Render PDF page to canvas
    await page.render({
      canvasContext: context,
      canvas: canvas,
      viewport: scaledViewport,
      transform: [1, 0, 0, 1, xOffset, yOffset],
    }).promise

    // Convert canvas to base64 JPEG string
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null)
            return
          }
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.onerror = () => {
            resolve(null)
          }
          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        JPEG_QUALITY,
      )
    })
  } catch (error) {
    console.error('Failed to generate thumbnail:', error)
    return null
  }
}
