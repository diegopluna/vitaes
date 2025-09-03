import { ConvexError } from 'convex/values'
import { query } from './_generated/server'

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

    return {
      identity,
    }
  },
})
