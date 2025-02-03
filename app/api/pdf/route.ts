import { AwesomeCVPDF } from '@/templates/awesome-cv/pdf'
import { renderToStream } from '@react-pdf/renderer'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid().optional(),
  size: z.enum(['a4', 'letter']).default('a4'),
  preview: z.preprocess((val) => val === 'true', z.boolean().default(false)),
})

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)

  const result = paramsSchema.safeParse(
    Object.fromEntries(requestUrl.searchParams.entries()),
  )

  if (!result.success) {
    return new Response('Invalid query params', { status: 400 })
  }

  const { id, size, preview } = result.data

  const stream = await renderToStream(await AwesomeCVPDF())

  // @ts-expect-error TODO: WTF Typescript
  const blob = await new Response(stream).blob()

  const headers: Record<string, string> = {
    'Content-Type': 'application/pdf',
    'Cache-Control': 'no-store, max-age=0',
  }

  if (!preview) {
    headers['Content-Disposition'] = 'attachment; filename="awesome-cv.pdf"'
  }

  return new Response(blob, { headers })
}
