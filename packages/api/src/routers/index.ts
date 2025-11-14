import { db } from '@vitaes/db'
import { protectedProcedure, publicProcedure } from '../index'
import { ORPCError, type RouterClient } from '@orpc/server'
import z from 'zod'
import { exampleResumes } from '@vitaes/types/resume'
import { resume } from '@vitaes/db/schema/app'
import { uuidv7 } from 'uuidv7'

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
  getResumeByUrl: protectedProcedure
    .input(z.object({ url: z.string() }))
    .handler(async ({ context, input }) => {
      const { url: resumeUrl } = input
      const currentUser = context.session.user
      const resume = await db.query.resume.findFirst({
        where: ({ url }, { eq }) => eq(url, resumeUrl),
      })
      if (!resume) {
        throw new ORPCError('NOT_FOUND')
      }
      if (!resume.isPublic && resume.userEmail !== currentUser.email) {
        throw new ORPCError('FORBIDDEN')
      }
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
          url: uuidv7(),
        })
        .returning()

      if (!createdResume) {
        throw new ORPCError('INTERNAL_SERVER_ERROR')
      }

      return createdResume
    }),
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
