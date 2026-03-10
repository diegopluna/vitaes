import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { authComponent } from './auth'
import { ResumeDocumentSchema } from './shared/resume'

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)

    return await ctx.db
      .query('resumes')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})

export const getById = query({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)

    const resume = await ctx.db.get(args.id)

    if (!resume) {
      return null
    }

    if (resume.userId !== user._id.toString()) {
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
    const user = await authComponent.getAuthUser(ctx)

    const parsed = ResumeDocumentSchema.parse(args.data)

    return await ctx.db.insert('resumes', {
      userId: user._id,
      title: args.title,
      templateId: args.templateId,
      templateVersion: args.templateVersion,
      documentVersion: parsed.version,
      data: parsed,
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
    const user = await authComponent.getAuthUser(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== user._id.toString()) {
      throw new ConvexError('FORBIDDEN')
    }

    const parsed = ResumeDocumentSchema.parse(args.data)

    await ctx.db.patch(args.id, {
      title: args.title,
      templateId: args.templateId,
      templateVersion: args.templateVersion,
      documentVersion: parsed.version,
      data: parsed,
    })

    return args.id
  },
})

export const remove = mutation({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== user._id.toString()) {
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
    const user = await authComponent.getAuthUser(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('Not found')
    }

    if (existing.userId !== user._id.toString()) {
      throw new ConvexError('FORBIDDEN')
    }

    return await ctx.db.insert('resumes', {
      userId: user._id,
      title: args.title || `${existing.title} (Copy)`,
      templateId: existing.templateId,
      templateVersion: existing.templateVersion,
      documentVersion: existing.documentVersion,
      data: existing.data,
    })
  },
})
