import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import puppeteer from 'puppeteer'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { env } from '@/env/client'
import { env as envServer} from '@/env/server'

export async function POST(request: Request) {
  console.log("Received Download Request")
  const { getToken } = await auth()
  console.log("Getting the token retrieval function")

  const jwtToken = await getToken({ template: 'convex ' })
  console.log("JWT TOKEN:", jwtToken)
  if (jwtToken === null) return new Response('Unauthorized', { status: 401 })

  const { id } = (await request.json()) as { id: string }
  console.log("RESUME ID:", id)

  const resume = await fetchQuery(
    api.resume.functions.get,
    {
      id: id as Id<'resumes'>,
    },
    { token: jwtToken, url: envServer.INTERNAL_CONVEX_URL },
  )

  console.log("RESUME:", resume)

  if (!resume) return new Response('Not Found', { status: 404 })

  console.log("Launching puppeteer...")

  try {
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
      '--disable-crash-reporter'
    ],
    ...(process.env.NODE_ENV === "production" && { executablePath: "/usr/bin/chromium"})
  })
  console.log("Opening new page")
  const page = await browser.newPage()

  console.log("Setting the cookies")
  const cookie = request.headers.get('cookie')
  const cookies = cookie?.split(';')
  const sessionCookie = cookies?.find((c) => c.includes('__session'))
  console.log("COOKIES:", sessionCookie)

  if (sessionCookie) {
    await page.setExtraHTTPHeaders({ cookie: cookie as string })
  }

  console.log("Going to the page")
  await page.goto(`${env.NEXT_PUBLIC_APP_URL}/resume/${id}`, {
    waitUntil: 'load',
  })
  console.log("Setting emulate media type")
  await page.emulateMediaType('screen')
  console.log("Getting the PDF")
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '0.8cm', bottom: '1.8cm' },
  })
  await browser.close()
  console.log("Closing the browser")

  console.log("Sending the PDF")
  // @ts-expect-error
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${resume.name}.pdf`,
    },
  })
  } catch (e) {
    console.error("[ERROR]:",e)
    throw e
  }
}
