import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    name: v.string(),
    userEmail: v.string(),
  }).index('userEmail', ['userEmail']),
})
