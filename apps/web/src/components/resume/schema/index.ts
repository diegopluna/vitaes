import { z } from 'zod'

const socialPlatformSchema = z.enum([
  'mobile',
  'email',
  'homepage',
  'github',
  'gitlab',
  'linkedin',
  'twitter',
  'stackoverflow',
  'skype',
  'reddit',
  'xing',
  'medium',
  'googlescholar',
])

const socialProfileSchema = z.object({
  id: z.string(),
  platform: socialPlatformSchema,
  value: z.string(),
  display: z.string().optional(),
  url: z.string().optional(),
})

const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  address: z.string(),
  socials: z.array(socialProfileSchema),
  quote: z.string().optional(),
  photo: z.string().optional(),
  photoShape: z.enum(['circle', 'rectangle']).optional(),
  photoEdge: z.enum(['edge', 'noedge']).optional(),
  photoAlign: z.enum(['left', 'right']).optional(),
})

const baseItemSchema = z.object({
  id: z.string(),
})

const entryItemSchema = baseItemSchema.extend({
  position: z.string(),
  title: z.string(),
  location: z.string(),
  date: z.string(),
  description: z.string().optional(),
  items: z.array(z.string()).optional(),
})

const honorItemSchema = baseItemSchema.extend({
  date: z.string(),
  position: z.string(),
  title: z.string(),
  location: z.string(),
})

const skillItemSchema = baseItemSchema.extend({
  type: z.string(),
  skills: z.array(z.string()),
})

const subentryItemSchema = baseItemSchema.extend({
  position: z.string().optional(),
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
})

const sectionTypeSchema = z.enum([
  'paragraph',
  'entries',
  'honors',
  'skills',
  'custom',
])

const baseSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: sectionTypeSchema,
})

const paragraphSectionSchema = baseSectionSchema.extend({
  type: z.literal('paragraph'),
  content: z.string(),
})

const entriesSectionSchema = baseSectionSchema.extend({
  type: z.literal('entries'),
  entries: z.array(entryItemSchema),
})

const honorsSectionSchema = baseSectionSchema.extend({
  type: z.literal('honors'),
  subsections: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        honors: z.array(honorItemSchema),
      }),
    )
    .optional(),
  honors: z.array(honorItemSchema).optional(),
})

const skillsSectionSchema = baseSectionSchema.extend({
  type: z.literal('skills'),
  skills: z.array(skillItemSchema),
})

const sectionSchema = z.discriminatedUnion('type', [
  paragraphSectionSchema,
  entriesSectionSchema,
  honorsSectionSchema,
  skillsSectionSchema,
])

export const awesomeColorSchema = z.enum([
  'awesome-emerald',
  'awesome-skyblue',
  'awesome-red',
  'awesome-pink',
  'awesome-orange',
  'awesome-nephritis',
  'awesome-concrete',
  'awesome-darknight',
])

const resumeConfigSchema = z.object({
  themeColor: z.string(), // Replace with awesomeColorSchema if you have it
  headerAlign: z.enum(['left', 'center', 'right']),
  sectionColorHighlight: z.boolean(),
  fontSize: z.number(),
  pageSize: z.enum(['A4', 'LETTER']),
  margins: z.object({
    top: z.string(),
    right: z.string(),
    bottom: z.string(),
    left: z.string(),
  }),
})

export const resumeSchema = z.object({
  config: resumeConfigSchema,
  personalInfo: personalInfoSchema,
  sections: z.array(sectionSchema),
})
