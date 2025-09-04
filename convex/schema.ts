import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    userId: v.string(),
    name: v.string(),
    data: v.any(),
    updatedAt: v.number(), // UNIX Timestamp
  }).index('by_user_id', ['userId']),
})
