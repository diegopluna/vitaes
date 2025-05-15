import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { resume } from '@/server/db/schema'
import type { Resume } from '@/@types/resume'
import { TRPCError } from '@trpc/server'
import { and, eq } from 'drizzle-orm'

export const resumeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input

      const resumeCreated = await ctx.db
        .insert(resume)
        .values({
          userId: ctx.session.user.id,
          name,
          data: {} as Resume,
        })
        .returning()

      if (resumeCreated.length === 0) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create resume',
        })
      }

      return resumeCreated[0]
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const existingResume = await ctx.db.query.resume.findFirst({
        where(fields, operators) {
          return operators.and(
            operators.eq(fields.id, id),
            operators.eq(fields.userId, ctx.session.user.id),
          )
        },
      })

      if (!existingResume) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Resume not found',
        })
      }

      return existingResume
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), data: z.any(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, data, name } = input

      const updatedResume = await ctx.db
        .update(resume)
        .set({
          data,
          updatedAt: new Date(),
          name,
        })
        .where(and(eq(resume.id, id), eq(resume.userId, ctx.session.user.id)))
        .returning()

      if (updatedResume.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Resume not found',
        })
      }

      return updatedResume[0]
    }),
})
