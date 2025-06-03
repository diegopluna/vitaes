import { getResume } from '@/api/resume'
import { env } from '@/env/client'
import { auth } from '@/lib/auth'
import chromium from '@sparticuz/chromium'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import puppeteerCore from 'puppeteer-core'

export const APIRoute = createAPIFileRoute('/api/pdf')({
	POST: async ({ request }) => {
		const session = await auth.api.getSession({ headers: request.headers })
		if (!session) {
			return new Response('Unauthorized', { status: 401 })
		}

		const data = (await request.json()) as { id: string }

		const resume = await getResume({ data: { id: data.id } }).catch(() => {
			return null
		})

		if (!resume) {
			return new Response('Resume not found', { status: 404 })
		}

		if (resume.userId !== session.user.id) {
			return new Response('Unauthorized', { status: 401 })
		}

		chromium.setGraphicsMode = false
		const browser = await puppeteerCore.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			// @ts-expect-error - chromium.headless is not typed
			headless: chromium.headless === true ? 'shell' : true,
		})
		const page = await browser.newPage()

		const cookie = request.headers.get('cookie')
		if (cookie) {
			await page.setExtraHTTPHeaders({ cookie })
		}

		await page.goto(`${env.VITE_APP_URL}/resume_only/${data.id}`, {
			waitUntil: 'domcontentloaded',
		})
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
	},
})
