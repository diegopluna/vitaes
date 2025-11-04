import z from 'zod'
import { AwesomeColorSchema } from './colors'

export const SocialPlatformSchema = z.enum([
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

export const SocialProfileSchema = z.object({
  id: z.string(),
  platform: SocialPlatformSchema,
  value: z.string(),
  display: z.string().optional(),
  url: z.string().url().optional(),
})

export const PersonalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  address: z.string(),
  socials: z.array(SocialProfileSchema),
  quote: z.string().optional(),
  photo: z
    .object({
      url: z.string().url(),
      shape: z.enum(['circle', 'rectangle']).optional(),
      edge: z.enum(['edge', 'noedge']).optional(),
      align: z.enum(['left', 'right']).optional(),
    })
    .optional(),
})

export const BaseItemSchema = z.object({
  id: z.string(),
})

export const EntryItemSchema = BaseItemSchema.extend({
  position: z.string(),
  title: z.string(),
  location: z.string(),
  date: z.string(),
  description: z.string().optional(),
  items: z.array(z.string()).optional(),
})

export const ListItemSchema = BaseItemSchema.extend({
  date: z.string(),
  position: z.string(),
  title: z.string(),
  location: z.string(),
})

export const ListSubsectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(ListItemSchema),
})

export const CategoryItemSchema = BaseItemSchema.extend({
  type: z.string(),
  items: z.array(z.string()),
})

export const SubentryItemSchema = BaseItemSchema.extend({
  position: z.string().optional(),
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
})

export const SectionTypeSchema = z.enum([
  'text',
  'timeline',
  'list',
  'taxonomy',
])

export const BaseSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: SectionTypeSchema,
})

export const TextSectionSchema = BaseSectionSchema.extend({
  type: z.literal('text'),
  content: z.string(),
})

export const TimelineSectionSchema = BaseSectionSchema.extend({
  type: z.literal('timeline'),
  entries: z.array(EntryItemSchema),
})

export const ListSectionSchema = BaseSectionSchema.extend({
  type: z.literal('list'),
  structure: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('flat'),
      items: z.array(ListItemSchema),
    }),
    z.object({
      type: z.literal('grouped'),
      subsections: z.array(ListSubsectionSchema),
    }),
  ]),
})

export const TaxonomySectionSchema = BaseSectionSchema.extend({
  type: z.literal('taxonomy'),
  categories: z.array(CategoryItemSchema),
})

export const SectionSchema = z.discriminatedUnion('type', [
  TextSectionSchema,
  TimelineSectionSchema,
  ListSectionSchema,
  TaxonomySectionSchema,
])

export const ResumeConfigSchema = z.object({
  themeColor: AwesomeColorSchema,
  headerAlign: z.enum(['left', 'center', 'right']),
  sectionColorHighlight: z.boolean(),
  fontSize: z.number().positive(),
  pageSize: z.enum(['A4', 'LETTER']),
})

export const ResumeSchema = z.object({
  config: ResumeConfigSchema,
  personalInfo: PersonalInfoSchema,
  sections: z.array(SectionSchema),
})

export type SocialPlatform = z.infer<typeof SocialPlatformSchema>
export type SocialProfile = z.infer<typeof SocialProfileSchema>
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>
export type BaseItem = z.infer<typeof BaseItemSchema>
export type EntryItem = z.infer<typeof EntryItemSchema>
export type ListItem = z.infer<typeof ListItemSchema>
export type ListSubsection = z.infer<typeof ListSubsectionSchema>
export type CategoryItem = z.infer<typeof CategoryItemSchema>
export type SubentryItem = z.infer<typeof SubentryItemSchema>
export type SectionType = z.infer<typeof SectionTypeSchema>
export type TextSection = z.infer<typeof TextSectionSchema>
export type TimelineSection = z.infer<typeof TimelineSectionSchema>
export type ListSection = z.infer<typeof ListSectionSchema>
export type TaxonomySection = z.infer<typeof TaxonomySectionSchema>
export type Section = z.infer<typeof SectionSchema>
export type ResumeConfig = z.infer<typeof ResumeConfigSchema>
export type IResume = z.infer<typeof ResumeSchema>

export const isTextSection = (section: Section): section is TextSection =>
  section.type === 'text'

export const isTimelineSection = (
  section: Section,
): section is TimelineSection => section.type === 'timeline'

export const isListSection = (section: Section): section is ListSection =>
  section.type === 'list'

export const isTaxonomySection = (
  section: Section,
): section is TaxonomySection => section.type === 'taxonomy'
