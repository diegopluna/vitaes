import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { authComponent } from './auth'
import { ResumeDocumentSchema } from './shared/resume'

const getCurrentUserId = async (ctx: any) => {
  const user = await authComponent.getAuthUser(ctx)
  return user._id.toString()
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx)

    return await ctx.db
      .query('resumes')
      .withIndex('by_user_updated_at', (q) => q.eq('userId', userId))
      .order('desc')
      .collect()
  },
})

export const getById = query({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)

    const resume = await ctx.db.get(args.id)

    if (!resume) {
      return null
    }

    if (resume.userId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    return resume
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    templateId: v.string(),
    templateVersion: v.number(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const parsed = ResumeDocumentSchema.parse(args.data)

    return await ctx.db.insert('resumes', {
      userId,
      title: args.title,
      templateId: args.templateId,
      templateVersion: args.templateVersion,
      documentVersion: parsed.version,
      data: parsed,
      updatedAt: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('resumes'),
    title: v.optional(v.string()),
    templateId: v.optional(v.string()),
    templateVersion: v.optional(v.number()),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    const parsed = ResumeDocumentSchema.parse(args.data)

    await ctx.db.patch(args.id, {
      title: args.title,
      templateId: args.templateId,
      templateVersion: args.templateVersion,
      documentVersion: parsed.version,
      data: parsed,
      updatedAt: Date.now(),
    })

    return args.id
  },
})

export const remove = mutation({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    await ctx.db.delete(args.id)

    return args.id
  },
})

export const duplicate = mutation({
  args: {
    id: v.id('resumes'),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    return await ctx.db.insert('resumes', {
      userId,
      title: args.title || `${existing.title} (Copy)`,
      templateId: existing.templateId,
      templateVersion: existing.templateVersion,
      documentVersion: existing.documentVersion,
      data: existing.data,
      updatedAt: Date.now(),
    })
  },
})
