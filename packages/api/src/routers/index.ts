import { db } from '@vitaes/db'
import { protectedProcedure, publicProcedure } from '../index'
import { ORPCError, type RouterClient } from '@orpc/server'
import z from 'zod'
import { exampleResumes } from '@vitaes/types/resume'
import { resume } from '@vitaes/db/schema/app'
import { uuidv7 } from 'uuidv7'
import { uniqueSlug } from '../utils'
import { eq } from 'drizzle-orm'

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
    })
    return resumes
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
      await db
        .update(resume)
        .set({ views: queriedResume.views + 1 })
        .where(eq(resume.id, queriedResume.id))
      return resume
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
      return resume
    }),
  createResume: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        language: z.enum(Object.keys(exampleResumes)),
      }),
    )
    .handler(async ({ context, input }) => {
      const { name, language } = input
      const exampleResume =
        exampleResumes[language as keyof typeof exampleResumes]
      const currentUser = context.session.user
      const [createdResume] = await db
        .insert(resume)
        .values({
          id: uuidv7(),
          name,
          userEmail: currentUser.email,
          data: exampleResume,
          slug: uniqueSlug(currentUser.email, name),
        })
        .returning()

      if (!createdResume) {
        throw new ORPCError('INTERNAL_SERVER_ERROR')
      }

      return createdResume
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
      await db
        .update(resume)
        .set({ downloads: queriedResume.downloads + 1 })
        .where(eq(resume.id, resumeId))
      return queriedResume
    }),
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
