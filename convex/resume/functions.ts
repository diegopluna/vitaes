import { ConvexError, v } from 'convex/values'
import type { Locale } from '../../i18n/config'
import { mutation, query } from '../_generated/server'
import { getExampleData } from './exampleData/getExampleData'
import type { Resume } from './type'

export const clone = mutation({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resumeToClone = await ctx.db.get(args.id)
    if (resumeToClone === null) {
      throw new ConvexError({
        code: 'NOT_FOUND',
        message: 'Resume not found',
      })
    }

    if (resumeToClone.userEmail !== identity.email) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Resume does not belong to the user',
      })
    }

    await ctx.db.insert('resumes', {
      data: resumeToClone.data,
      name: `${resumeToClone.name} (Copy)`,
      userEmail: resumeToClone.userEmail,
      updatedAt: Date.now(),
    })
  },
})

export const deleteOne = mutation({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resumeToDelete = await ctx.db.get(args.id)
    if (resumeToDelete === null) {
      throw new ConvexError({
        code: 'NOT_FOUND',
        message: 'Resume not found',
      })
    }

    if (resumeToDelete.userEmail !== identity.email) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Resume does not belong to the user',
      })
    }

    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: {
    id: v.id('resumes'),
    name: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resumeToUpdate = await ctx.db.get(args.id)
    if (resumeToUpdate === null) {
      throw new ConvexError({
        code: 'NOT_FOUND',
        message: 'Resume not found',
      })
    }

    if (resumeToUpdate.userEmail !== identity.email) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Resume does not belong to the user',
      })
    }

    await ctx.db.patch(args.id, {
      name: args.name,
      data: args.data,
    })
  },
})

export const updateName = mutation({
  args: {
    id: v.id('resumes'),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resumeToUpdate = await ctx.db.get(args.id)
    if (resumeToUpdate === null) {
      throw new ConvexError({
        code: 'NOT_FOUND',
        message: 'Resume not found',
      })
    }

    if (resumeToUpdate.userEmail !== identity.email) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Resume does not belong to the user',
      })
    }

    await ctx.db.patch(args.id, {
      name: args.name,
    })
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const newResumeId = await ctx.db.insert('resumes', {
      name: args.name,
      userEmail: identity.email as string,
      data: getExampleData(args.locale as Locale),
      updatedAt: Date.now(),
    })

    return newResumeId
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resumes = await ctx.db
      .query('resumes')
      .withIndex('by_user_email', (q) => q.eq('userEmail', identity.email as string))
      .order('desc')
      .collect()

    const parsedResumes = resumes.map((r) => {
      return {
        ...r,
        data: r.data as Resume,
      }
    })

    return parsedResumes
  },
})

export const get = query({
  args: {
    id: v.id('resumes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'User not found',
      })
    }

    const resume = await ctx.db.get(args.id)

    if (resume === null) {
      throw new ConvexError({
        code: 'NOT_FOUND',
        message: 'Resume not found',
      })
    }

    if (resume.userEmail !== identity.email) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Resume does not belong to the user',
      })
    }

    const parsedResume = {
      ...resume,
      data: resume.data as Resume,
    }

    return parsedResume
  },
})
