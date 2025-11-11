import { db } from '@vitaes/db'
import { protectedProcedure, publicProcedure } from '../index'
import { ORPCError, type RouterClient } from '@orpc/server'
import z from 'zod'

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
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
