import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import puppeteer from 'puppeteer'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { env } from '@/env/client'

export async function POST(request: Request) {
  const { getToken } = await auth()
  const jwtToken = await getToken({ template: 'convex ' })
  if (jwtToken === null) return new Response('Unauthorized', { status: 401 })

  const { id } = (await request.json()) as { id: string }

  const resume = await fetchQuery(
    api.resume.functions.get,
    {
      id: id as Id<'resumes'>,
    },
    { token: jwtToken },
  )

  if (!resume) return new Response('Not Found', { status: 404 })

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
    ],
  })
  const page = await browser.newPage()

  const cookie = request.headers.get('cookie')
  const cookies = cookie?.split(';')
  const sessionCookie = cookies?.find((c) => c.includes('__session'))

  if (sessionCookie) {
    await page.setExtraHTTPHeaders({ cookie: cookie as string })
  }

  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/resume/${id}`, {
    waitUntil: 'load',
  })
  await page.emulateMediaType('screen')
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '0.8cm', bottom: '1.8cm' },
  })
  await browser.close()

  // @ts-expect-error
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${resume.name}.pdf`,
    },
  })
}
