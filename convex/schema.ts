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
    authorId: v.string(),
    visibility: v.union(
      v.literal('system'),
      v.literal('public'),
      v.literal('private'),
    ),
    status: v.union(
      v.literal('draft'),
      v.literal('published'),
      v.literal('archived'),
    ),
    currentVersion: v.number(),
    definition: v.any(),
  })
    .index('by_slug', ['slug'])
    .index('by_author', ['authorId']),
})
