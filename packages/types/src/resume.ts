import z from 'zod'
import { AwesomeColorSchema } from './colors'
import { kendallRoyNew } from './example-data/en'
import { inigoMontoyaNew } from './example-data/es'
import { arseneLupinNew } from './example-data/fr'
import { kingSchultzNew } from './example-data/de'
import { golDRogerNew } from './example-data/ja'
import { agostinhoCarraraResume } from './example-data/pt'
import { sunTzuNew } from './example-data/zh'

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

export const TemplateSchema = z.enum([
  'awesome',
  'modern',
  'professional',
  'bold',
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

export const FooterOptionSchema = z.object({
  text: z.string(),
  showPageNumber: z.boolean(),
})

const defaultFooterOption: z.infer<typeof FooterOptionSchema> = {
  text: '',
  showPageNumber: false,
}

const defaultFooterRight: z.infer<typeof FooterOptionSchema> = {
  text: '',
  showPageNumber: true,
}

const ResumeConfigInputSchema = z.object({
  template: TemplateSchema.optional(),
  themeColor: AwesomeColorSchema,
  headerAlign: z.enum(['left', 'center', 'right']),
  sectionColorHighlight: z.boolean(),
  fontSize: z.number().positive(),
  pageSize: z.enum(['A4', 'LETTER']),
  footerLeft: FooterOptionSchema.optional(),
  footerCenter: FooterOptionSchema.optional(),
  footerRight: FooterOptionSchema.optional(),
})

export const ResumeConfigSchema = ResumeConfigInputSchema.transform((data) => ({
  ...data,
  template: data.template ?? 'awesome',
  footerLeft: data.footerLeft ?? defaultFooterOption,
  footerCenter: data.footerCenter ?? defaultFooterOption,
  footerRight: data.footerRight ?? defaultFooterRight,
}))

const ResumeConfigValidationSchema = z.object({
  template: TemplateSchema,
  themeColor: AwesomeColorSchema,
  headerAlign: z.enum(['left', 'center', 'right']),
  sectionColorHighlight: z.boolean(),
  fontSize: z.number().positive(),
  pageSize: z.enum(['A4', 'LETTER']),
  footerLeft: FooterOptionSchema,
  footerCenter: FooterOptionSchema,
  footerRight: FooterOptionSchema,
})

const ResumeInputSchema = z.object({
  config: ResumeConfigInputSchema,
  personalInfo: PersonalInfoSchema,
  sections: z.array(SectionSchema),
})

export const ResumeSchema = ResumeInputSchema.transform((data) => ({
  ...data,
  config: {
    ...data.config,
    footerLeft: data.config.footerLeft ?? defaultFooterOption,
    footerCenter: data.config.footerCenter ?? defaultFooterOption,
    footerRight: data.config.footerRight ?? defaultFooterRight,
  },
}))

export const ResumeValidationSchema = z.object({
  config: ResumeConfigValidationSchema,
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
export type Template = z.infer<typeof TemplateSchema>
export type FooterOption = z.infer<typeof FooterOptionSchema>
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

export const exampleResumes = {
  en: kendallRoyNew,
  es: inigoMontoyaNew,
  fr: arseneLupinNew,
  de: kingSchultzNew,
  ja: golDRogerNew,
  pt: agostinhoCarraraResume,
  zh: sunTzuNew,
}
