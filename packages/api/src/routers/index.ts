import { db } from '@vitaes/db'
import { protectedProcedure, publicProcedure } from '../index'
import { ORPCError, type RouterClient } from '@orpc/server'
import z from 'zod'
import {
  exampleResumes,
  ResumeSchema,
  ResumeValidationSchema,
  TemplateSchema,
} from '@vitaes/types/resume'
import { resume } from '@vitaes/db/schema/app'
import { uuidv7 } from 'uuidv7'
import { uniqueSlug } from '../utils'
import { eq } from 'drizzle-orm'
import { uploadThumbnail as uploadThumbnailToS3 } from '../utils/s3'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    }
  }),
  helloWorld: publicProcedure.handler(() => {
    return 'Hello World'
  }),
  listResumes: protectedProcedure.handler(async ({ context }) => {
    const currentUser = context.session.user
    const resumes = await db.query.resume.findMany({
      where: ({ userEmail }, { eq }) => eq(userEmail, currentUser.email),
      orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
    })
    return resumes.map((resume) => ({
      ...resume,
      data: resume.data ? ResumeSchema.parse(resume.data) : null,
    }))
  }),
  getResumeBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .handler(async ({ context, input }) => {
      const { slug: resumeSlug } = input
      const queriedResume = await db.query.resume.findFirst({
        where: ({ slug }, { eq }) => eq(slug, resumeSlug),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      if (
        !queriedResume.isPublic &&
        queriedResume.userEmail !== context.session?.user.email
      ) {
        throw new ORPCError('FORBIDDEN')
      }
      // Only increment views for public resumes
      if (queriedResume.isPublic) {
        await db
          .update(resume)
          .set({ views: queriedResume.views + 1 })
          .where(eq(resume.id, queriedResume.id))
      }
      return {
        ...queriedResume,
        data: queriedResume.data
          ? ResumeSchema.parse(queriedResume.data)
          : null,
      }
    }),
  getResumeById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const { id: resumeId } = input
      const currentUser = context.session.user
      const resume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!resume) {
        throw new ORPCError('NOT_FOUND')
      }
      return {
        ...resume,
        data: resume.data ? ResumeSchema.parse(resume.data) : null,
      }
    }),
  createResume: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        language: z.enum(Object.keys(exampleResumes) as [string, ...string[]]),
        template: TemplateSchema.optional(),
      }),
    )
    .handler(async ({ context, input }) => {
      const { name, language, template = 'awesome' } = input
      const exampleResume =
        exampleResumes[language as keyof typeof exampleResumes]

      const initialData = {
        ...exampleResume,
        config: {
          ...exampleResume.config,
          template,
        },
      }

      const currentUser = context.session.user
      const [createdResume] = await db
        .insert(resume)
        .values({
          id: uuidv7(),
          name,
          userEmail: currentUser.email,
          data: initialData,
          slug: uniqueSlug(currentUser.email, name),
        })
        .returning()

      if (!createdResume) {
        throw new ORPCError('INTERNAL_SERVER_ERROR')
      }

      return createdResume
    }),
  updateResume: protectedProcedure
    .input(z.object({ id: z.string(), data: ResumeValidationSchema }))
    .handler(async ({ context, input }) => {
      const { id: resumeId, data } = input
      const currentUser = context.session.user
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      await db
        .update(resume)
        .set({ data, updatedAt: new Date() })
        .where(eq(resume.id, resumeId))
      return queriedResume
    }),
  setDownloadCount: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const { id: resumeId } = input
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id }, { eq }) => eq(id, resumeId),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      if (
        !queriedResume.isPublic &&
        queriedResume.userEmail !== context.session?.user.email
      ) {
        throw new ORPCError('FORBIDDEN')
      }
      // Only increment downloads for public resumes
      if (queriedResume.isPublic) {
        await db
          .update(resume)
          .set({ downloads: queriedResume.downloads + 1 })
          .where(eq(resume.id, resumeId))
      }
      return queriedResume
    }),
  updateResumeName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .handler(async ({ context, input }) => {
      const { id: resumeId, name } = input
      const currentUser = context.session.user
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      await db
        .update(resume)
        .set({ name, updatedAt: new Date() })
        .where(eq(resume.id, resumeId))
      return queriedResume
    }),
  uploadThumbnail: protectedProcedure
    .input(
      z.object({
        resumeId: z.string(),
        thumbnail: z.string(), // base64 encoded image data
      }),
    )
    .handler(async ({ context, input }) => {
      const { resumeId, thumbnail } = input
      const currentUser = context.session.user

      // Verify resume belongs to user
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }

      // Convert base64 to buffer
      const base64Data = thumbnail.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      // Upload thumbnail to MinIO
      const thumbnailUrl = await uploadThumbnailToS3(resumeId, buffer)

      // Update resume with thumbnail URL
      await db
        .update(resume)
        .set({ thumbnailUrl, updatedAt: new Date() })
        .where(eq(resume.id, resumeId))

      return { thumbnailUrl }
    }),
  deleteResume: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const { id: resumeId } = input
      const currentUser = context.session.user
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      await db.delete(resume).where(eq(resume.id, resumeId))
      return { success: true }
    }),
  duplicateResume: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const currentUser = context.session.user
      const originalResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, input.id), eq(userEmail, currentUser.email)),
      })
      if (!originalResume) {
        throw new ORPCError('NOT_FOUND')
      }

      const existingNames = new Set(
        (
          await db.query.resume.findMany({
            where: ({ userEmail }, { eq }) => eq(userEmail, currentUser.email),
            columns: { name: true },
          })
        ).map((entry) => entry.name),
      )

      const baseName = `${originalResume.name} copy`
      let candidateName = baseName
      let suffix = 2
      while (existingNames.has(candidateName)) {
        candidateName = `${baseName} ${suffix}`
        suffix += 1
      }

      const [duplicatedResume] = await db
        .insert(resume)
        .values({
          id: uuidv7(),
          name: candidateName,
          userEmail: currentUser.email,
          data: originalResume.data,
          slug: uniqueSlug(currentUser.email, candidateName),
          thumbnailUrl: originalResume.thumbnailUrl,
        })
        .returning()

      if (!duplicatedResume) {
        throw new ORPCError('INTERNAL_SERVER_ERROR')
      }

      return {
        ...duplicatedResume,
        data: duplicatedResume.data
          ? ResumeSchema.parse(duplicatedResume.data)
          : null,
      }
    }),
  updateResumePublicStatus: protectedProcedure
    .input(z.object({ id: z.string(), isPublic: z.boolean() }))
    .handler(async ({ context, input }) => {
      const { id: resumeId, isPublic } = input
      const currentUser = context.session.user
      const queriedResume = await db.query.resume.findFirst({
        where: ({ id, userEmail }, { eq, and }) =>
          and(eq(id, resumeId), eq(userEmail, currentUser.email)),
      })
      if (!queriedResume) {
        throw new ORPCError('NOT_FOUND')
      }
      await db
        .update(resume)
        .set({ isPublic, updatedAt: new Date() })
        .where(eq(resume.id, resumeId))
      const updatedResume = await db.query.resume.findFirst({
        where: ({ id }, { eq }) => eq(id, resumeId),
      })
      return updatedResume!
    }),
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
