import z from 'zod'

export const ResumeDocumentVersion = 1 as const

export const ResumeProfileSchema = z.object({
  id: z.string(),
  kind: z.string().min(1),
  label: z.string().min(1),
  value: z.string().optional(),
  url: z.url().optional(),
})

export const ResumeBasicsSchema = z.object({
  fullName: z.string().min(1),
  headline: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.url().optional(),
  photoUrl: z.url().optional(),
  profiles: z.array(ResumeProfileSchema).default([]),
})

export const ResumeSectionKindSchema = z.enum([
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'awards',
  'languages',
  'volunteering',
  'publications',
  'custom',
])

export const SectionBaseSchema = z.object({
  id: z.string(),
  kind: ResumeSectionKindSchema,
  title: z.string().optional(),
  visible: z.boolean().default(true),
})

export const SummarySectionSchema = SectionBaseSchema.extend({
  kind: z.literal('summary'),
  content: z.string().min(1),
})

export const DateRangeSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  isCurrent: z.boolean().optional(),
  display: z.string().optional(),
})

export const GenericEntrySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  organization: z.string().optional(),
  subtitle: z.string().optional(),
  location: z.string().optional(),
  dateRange: DateRangeSchema.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  url: z.url().optional(),
})

export const ExperienceSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('experience'),
  items: z.array(GenericEntrySchema).default([]),
})

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1),
  area: z.string().optional(),
  studyType: z.string().optional(),
  location: z.string().optional(),
  dateRange: DateRangeSchema.optional(),
  score: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
})

export const EducationSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('education'),
  items: z.array(EducationItemSchema).default([]),
})

export const SkillGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  items: z.array(z.string()).default([]),
})

export const SkillsSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('skills'),
  groups: z.array(SkillGroupSchema).default([]),
})

export const ProjectsSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('projects'),
  items: z.array(GenericEntrySchema).default([]),
})

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  issuer: z.string().optional(),
  dateRange: DateRangeSchema.optional(),
  credentialId: z.string().optional(),
  url: z.url().optional(),
  summary: z.string().optional(),
})

export const CertificationsSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('certifications'),
  items: z.array(CertificationItemSchema).default([]),
})

export const AwardItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  issuer: z.string().optional(),
  date: z.string().optional(),
  summary: z.string().optional(),
})

export const AwardsSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('awards'),
  items: z.array(AwardItemSchema).default([]),
})

export const LanguageItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  proficiency: z.string().optional(),
})

export const LanguagesSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('languages'),
  items: z.array(LanguageItemSchema).default([]),
})

export const VolunteeringSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('volunteering'),
  items: z.array(GenericEntrySchema).default([]),
})

export const PublicationItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  publisher: z.string().optional(),
  date: z.string().optional(),
  summary: z.string().optional(),
  url: z.url().optional(),
})

export const PublicationsSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('publications'),
  items: z.array(PublicationItemSchema).default([]),
})

export const CustomTextBlockSchema = z.object({
  id: z.string(),
  type: z.literal('text'),
  title: z.string().optional(),
  content: z.string().min(1),
})

export const CustomListBlockSchema = z.object({
  id: z.string(),
  type: z.literal('list'),
  title: z.string().optional(),
  items: z.array(z.string()).default([]),
})

export const CustomEntriesBlockSchema = z.object({
  id: z.string(),
  type: z.literal('entries'),
  title: z.string().optional(),
  items: z.array(GenericEntrySchema).default([]),
})

export const CustomBlockSchema = z.discriminatedUnion('type', [
  CustomTextBlockSchema,
  CustomListBlockSchema,
  CustomEntriesBlockSchema,
])

export const CustomSectionSchema = SectionBaseSchema.extend({
  kind: z.literal('custom'),
  blocks: z.array(CustomBlockSchema).default([]),
})

export const ResumeSectionSchema = z.discriminatedUnion('kind', [
  SummarySectionSchema,
  ExperienceSectionSchema,
  EducationSectionSchema,
  SkillsSectionSchema,
  ProjectsSectionSchema,
  CertificationsSectionSchema,
  AwardsSectionSchema,
  LanguagesSectionSchema,
  VolunteeringSectionSchema,
  PublicationsSectionSchema,
  CustomSectionSchema,
])

export const ResumeDocumentSchema = z.object({
  version: z.literal(ResumeDocumentVersion),
  locale: z.string().optional(),
  basics: ResumeBasicsSchema,
  sections: z.array(ResumeSectionSchema).default([]),
})

export const ResumeRecordSchema = z.object({
  title: z.string().min(1),
  templateId: z.string().min(1),
  templateVersion: z.number().int().positive(),
  documentVersion: z.literal(ResumeDocumentVersion),
  data: ResumeDocumentSchema,
})

export type ResumeProfile = z.infer<typeof ResumeProfileSchema>
export type ResumeBasics = z.infer<typeof ResumeBasicsSchema>
export type ResumeSectionKind = z.infer<typeof ResumeSectionKindSchema>
export type DateRange = z.infer<typeof DateRangeSchema>
export type GenericEntry = z.infer<typeof GenericEntrySchema>
export type SummarySection = z.infer<typeof SummarySectionSchema>
export type ExperienceSection = z.infer<typeof ExperienceSectionSchema>
export type EducationItem = z.infer<typeof EducationItemSchema>
export type EducationSection = z.infer<typeof EducationSectionSchema>
export type SkillGroup = z.infer<typeof SkillGroupSchema>
export type SkillsSection = z.infer<typeof SkillsSectionSchema>
export type ProjectsSection = z.infer<typeof ProjectsSectionSchema>
export type CertificationItem = z.infer<typeof CertificationItemSchema>
export type CertificationsSection = z.infer<typeof CertificationsSectionSchema>
export type AwardItem = z.infer<typeof AwardItemSchema>
export type AwardsSection = z.infer<typeof AwardsSectionSchema>
export type LanguageItem = z.infer<typeof LanguageItemSchema>
export type LanguagesSection = z.infer<typeof LanguagesSectionSchema>
export type VolunteeringSection = z.infer<typeof VolunteeringSectionSchema>
export type PublicationItem = z.infer<typeof PublicationItemSchema>
export type PublicationsSection = z.infer<typeof PublicationsSectionSchema>
export type CustomBlock = z.infer<typeof CustomBlockSchema>
export type CustomSection = z.infer<typeof CustomSectionSchema>
export type ResumeSection = z.infer<typeof ResumeSectionSchema>
export type ResumeDocument = z.infer<typeof ResumeDocumentSchema>
export type ResumeRecord = z.infer<typeof ResumeRecordSchema>

export const isSummarySection = (
  section: ResumeSection,
): section is SummarySection => section.kind === 'summary'

export const isExperienceSection = (
  section: ResumeSection,
): section is ExperienceSection => section.kind === 'experience'

export const isEducationSection = (
  section: ResumeSection,
): section is EducationSection => section.kind === 'education'

export const isSkillsSection = (
  section: ResumeSection,
): section is SkillsSection => section.kind === 'skills'

export const isProjectsSection = (
  section: ResumeSection,
): section is ProjectsSection => section.kind === 'projects'

export const isCertificationsSection = (
  section: ResumeSection,
): section is CertificationsSection => section.kind === 'certifications'

export const isAwardsSection = (
  section: ResumeSection,
): section is AwardsSection => section.kind === 'awards'

export const isLanguagesSection = (
  section: ResumeSection,
): section is LanguagesSection => section.kind === 'languages'

export const isVolunteeringSection = (
  section: ResumeSection,
): section is VolunteeringSection => section.kind === 'volunteering'

export const isPublicationsSection = (
  section: ResumeSection,
): section is PublicationsSection => section.kind === 'publications'

export const isCustomSection = (
  section: ResumeSection,
): section is CustomSection => section.kind === 'custom'
