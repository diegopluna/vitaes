import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    userId: v.string(),
    name: v.string(),
    data: v.string(), // When inserting we call JSON.stringify and whe getting we use JSON.parse
    updatedAt: v.int64(), // UNIX Timestamp
  }),
})
