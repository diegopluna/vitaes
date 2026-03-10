import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    userId: v.string(),
    title: v.string(),
    templateId: v.string(),
    documentVersion: v.number(),
    data: v.any(),
  }).index('userId', ['userId']),
})
