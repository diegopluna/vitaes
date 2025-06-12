import { db } from '@/db'
import { resume } from '@/db/schema'
import { env } from '@/env/client'
import { auth } from '@/lib/auth'
import chromium from '@sparticuz/chromium'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { and } from 'drizzle-orm'
import { eq } from 'drizzle-orm'
import puppeteerCore from 'puppeteer-core'

export const ServerRoute = createServerFileRoute('/api/pdf').methods({
	POST: async ({ request }) => {
		const session = await auth.api.getSession({ headers: request.headers })
		if (!session) {
			return new Response('Unauthorized', { status: 401 })
		}

		const data = (await request.json()) as { id: string }

		const foundResume = await db.query.resume.findFirst({
			where: and(eq(resume.id, data.id), eq(resume.userId, session.user.id)),
		})

		if (!foundResume) {
			return new Response('Resume not found', { status: 404 })
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
		const cookies = cookie?.split(';')
		const sessionCookie = cookies?.find((c) => c.includes('session_token'))

		if (sessionCookie) {
			await page.setExtraHTTPHeaders({ cookie: sessionCookie })
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
