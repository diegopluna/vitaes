import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    userId: v.string(),
    title: v.string(),
    templateId: v.id('templates'),
    templateVersion: v.number(),
    documentVersion: v.number(),
    data: v.any(),
  }).index('by_user', ['userId']),
  templates: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    version: v.number(),
    isBuiltIn: v.boolean(),
    isPublic: v.boolean(),
    ownerId: v.string(),
    definition: v.any(),
    thumbnailUrl: v.optional(v.string()),
  })
    .index('by_slug', ['slug'])
    .index('by_owner', ['ownerId']),
})
