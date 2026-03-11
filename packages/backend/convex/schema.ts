import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  resumes: defineTable({
    userId: v.string(),
    title: v.string(),
    templateId: v.string(),
    templateVersion: v.number(),
    documentVersion: v.number(),
    data: v.any(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_updated_at', ['userId', 'updatedAt']),
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
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_owner', ['ownerId'])
    .index('by_public', ['isPublic']),
})
