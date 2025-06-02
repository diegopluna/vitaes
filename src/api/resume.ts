import { db } from '@/db'
import { resume } from '@/db/schema'
import { locales } from '@/paraglide/runtime'
import { getExampleData } from '@/templates/example-resume-data/get-example-data'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { authMiddleware, loggingMiddleware } from './middlewares'

export const listResumes = createServerFn({ method: 'GET' })
	.middleware([loggingMiddleware, authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context
		const resumes = await db.query.resume.findMany({
			where: eq(resume.userId, user.id),
		})

		return resumes
	})

export const createResume = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			name: z.string().min(1),
			locale: z.enum(locales),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { name, locale } = data
		const newResume = await db
			.insert(resume)
			.values({
				name,
				userId: user.id,
				data: getExampleData(locale),
			})
			.returning()

		if (newResume.length === 0) {
			throw new Error('Failed to create resume')
		}

		return newResume[0]
	})

export const getResume = createServerFn({ method: 'GET' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			id: z.string().uuid(),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { id } = data

		const foundResume = await db.query.resume.findFirst({
			where: and(eq(resume.id, id), eq(resume.userId, user.id)),
		})

		if (!foundResume) {
			throw new Error('Resume not found')
		}

		return foundResume
	})
