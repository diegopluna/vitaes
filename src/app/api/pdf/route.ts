import { AwesomeCVTemplate } from '@/templates/awesome-cv'
import { renderToStream } from '@react-pdf/renderer'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const paramsSchema = z.object({
  preview: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url)

  const result = paramsSchema.safeParse(
    Object.fromEntries(requestUrl.searchParams.entries()),
  )

  if (!result.success) {
    return new Response('Invalid parameters', { status: 400 })
  }

  const { preview } = result.data

  const stream = await renderToStream(AwesomeCVTemplate())

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
