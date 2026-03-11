import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { authComponent } from './auth'
import { parseResumeTemplateDefinition } from './shared/template'

const getCurrentUserId = async (ctx: any) => {
  const user = await authComponent.getAuthUser(ctx)
  return user._id.toString()
}

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('templates')
      .withIndex('by_public', (q) => q.eq('isPublic', true))
      .collect()
  },
})

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx)

    return await ctx.db
      .query('templates')
      .withIndex('by_owner', (q) => q.eq('ownerId', userId))
      .collect()
  },
})

export const getAccessibleBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query('templates')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (!template) {
      return null
    }

    if (template.isPublic || template.isBuiltIn) {
      return template
    }

    const user = await authComponent.safeGetAuthUser(ctx)

    if (!user || template.ownerId !== user._id.toString()) {
      throw new ConvexError('FORBIDDEN')
    }

    return template
  },
})

export const createMine = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    definition: v.any(),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const parsed = parseResumeTemplateDefinition(args.definition)

    const existing = await ctx.db
      .query('templates')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (existing) {
      throw new ConvexError('CONFLICT')
    }

    return await ctx.db.insert('templates', {
      slug: args.slug,
      name: args.name,
      description: args.description,
      version: parsed.version,
      isBuiltIn: false,
      isPublic: args.isPublic,
      ownerId: userId,
      definition: parsed,
      thumbnailUrl: args.thumbnailUrl,
      updatedAt: Date.now(),
    })
  },
})

export const updateMine = mutation({
  args: {
    id: v.id('templates'),
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    definition: v.any(),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('NOT_FOUND')
    }

    if (existing.isBuiltIn || existing.ownerId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    const slugConflict = await ctx.db
      .query('templates')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (slugConflict && slugConflict._id !== args.id) {
      throw new ConvexError('CONFLICT')
    }

    const parsed = parseResumeTemplateDefinition(args.definition)

    await ctx.db.patch(args.id, {
      slug: args.slug,
      name: args.name,
      description: args.description,
      version: parsed.version,
      isPublic: args.isPublic,
      definition: parsed,
      thumbnailUrl: args.thumbnailUrl,
      updatedAt: Date.now(),
    })

    return args.id
  },
})

export const removeMine = mutation({
  args: {
    id: v.id('templates'),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('NOT_FOUND')
    }

    if (existing.isBuiltIn || existing.ownerId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    await ctx.db.delete(args.id)

    return args.id
  },
})

export const duplicateIntoMine = mutation({
  args: {
    id: v.id('templates'),
    slug: v.string(),
    name: v.string(),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx)
    const existing = await ctx.db.get(args.id)

    if (!existing) {
      throw new ConvexError('NOT_FOUND')
    }

    if (!existing.isBuiltIn && existing.ownerId !== userId) {
      throw new ConvexError('FORBIDDEN')
    }

    const slugConflict = await ctx.db
      .query('templates')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (slugConflict) {
      throw new ConvexError('CONFLICT')
    }

    return await ctx.db.insert('templates', {
      slug: args.slug,
      name: args.name,
      description: existing.description,
      version: existing.definition.version,
      isBuiltIn: false,
      isPublic: args.isPublic ?? false,
      ownerId: userId,
      definition: existing.definition,
      thumbnailUrl: existing.thumbnailUrl,
      updatedAt: Date.now(),
    })
  },
})
