import { db } from '@/db'
import { resume } from '@/db/schema'
import { locales } from '@/paraglide/runtime'
import { getExampleData } from '@/templates/example-resume-data/get-example-data'
import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { authMiddleware, loggingMiddleware } from './middlewares'

export const listResumes = createServerFn({ method: 'GET' })
	.middleware([loggingMiddleware, authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context
		const resumes = await db.query.resume.findMany({
			where: eq(resume.userId, user.id),
			orderBy: [desc(resume.updatedAt)],
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

export const updateResumeName = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			id: z.string().uuid(),
			name: z.string().min(1),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { id, name } = data

		const updatedResume = await db
			.update(resume)
			.set({ name })
			.where(and(eq(resume.id, id), eq(resume.userId, user.id)))
			.returning()

		if (updatedResume.length === 0) {
			throw new Error('Failed to update resume name')
		}

		return updatedResume[0]
	})

export const updateResume = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			id: z.string().uuid(),
			name: z.string().min(1),
			resumeData: z.any(),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { id, name, resumeData } = data

		const updatedResume = await db
			.update(resume)
			.set({ name, data: resumeData })
			.where(and(eq(resume.id, id), eq(resume.userId, user.id)))
			.returning()

		if (updatedResume.length === 0) {
			throw new Error('Failed to update resume data')
		}

		return updatedResume[0]
	})

export const deleteResume = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			id: z.string().uuid(),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { id } = data

		const deletedResume = await db
			.delete(resume)
			.where(and(eq(resume.id, id), eq(resume.userId, user.id)))
			.returning()

		if (deletedResume.length === 0) {
			throw new Error('Failed to delete resume')
		}

		return deletedResume[0]
	})

export const cloneResume = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, authMiddleware])
	.validator(
		z.object({
			id: z.string().uuid(),
		}),
	)
	.handler(async ({ context, data }) => {
		const { user } = context
		const { id } = data

		// First, get the resume to clone
		const originalResume = await db.query.resume.findFirst({
			where: and(eq(resume.id, id), eq(resume.userId, user.id)),
		})

		if (!originalResume) {
			throw new Error('Resume not found')
		}

		// Create a new resume with the same data
		const clonedResume = await db
			.insert(resume)
			.values({
				name: `${originalResume.name} (Copy)`,
				userId: user.id,
				data: originalResume.data,
			})
			.returning()

		if (clonedResume.length === 0) {
			throw new Error('Failed to clone resume')
		}

		return clonedResume[0]
	})
