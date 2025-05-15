import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { api } from '@/trpc/server'
import { auth } from '@/server/auth'

export async function POST(request: Request): Promise<Response> {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const data = (await request.json()) as { id: string }

  const resume = await api.resume.getById({ id: data.id }).catch(() => {
    return null
  })

  if (!resume) {
    return new Response('Resume not found', { status: 404 })
  }

  if (resume.userId !== session.user.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  chromium.setGraphicsMode = false
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    // @ts-expect-error - chromium.headless is not typed
    headless: chromium.headless === true ? 'shell' : true,
  })

  const page = await browser.newPage()

  await page.goto(
    `${process.env.NEXT_PUBLIC_APP_URL}/en/resume_only/${data.id}`,
  )

  await page.emulateMediaType('screen')
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '0.8cm', bottom: '1.8cm' },
  })
  await browser.close()
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="vitaes.pdf"`,
    },
  })
}
