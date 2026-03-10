import z from 'zod'
import { ResumeSectionKindSchema } from './resume'

export const TemplateVersion = 1 as const

export const TemplatePageSizeSchema = z.enum(['A4', 'LETTER'])

export const TemplateDensitySchema = z.enum(['compact', 'comfortable', 'airy'])

export const TemplateLengthSchema = z.number().nonnegative()

export const TemplateSpacingSchema = z.object({
  xs: TemplateLengthSchema,
  sm: TemplateLengthSchema,
  md: TemplateLengthSchema,
  lg: TemplateLengthSchema,
  xl: TemplateLengthSchema,
})

export const TemplateMarginsSchema = z.object({
  top: TemplateLengthSchema,
  right: TemplateLengthSchema,
  bottom: TemplateLengthSchema,
  left: TemplateLengthSchema,
})

export const TemplateColumnsSchema = z.object({
  left: z.number().positive(),
  right: z.number().positive(),
  gap: TemplateLengthSchema,
})

export const TemplatePageSchema = z.object({
  size: TemplatePageSizeSchema,
  margins: TemplateMarginsSchema,
  columns: TemplateColumnsSchema.optional(),
})

export const TemplateColorsSchema = z.object({
  text: z.string().min(1),
  accent: z.string().min(1),
  muted: z.string().min(1),
  background: z.string().min(1).optional(),
  surface: z.string().min(1).optional(),
  border: z.string().min(1).optional(),
})

export const TemplateFontsSchema = z.object({
  heading: z.string().min(1),
  body: z.string().min(1),
})

export const TemplateTypographySchema = z.object({
  baseSize: z.number().positive(),
  lineHeight: z.number().positive(),
  nameSize: z.number().positive().optional(),
  headingSize: z.number().positive().optional(),
  sectionTitleSize: z.number().positive().optional(),
  metaSize: z.number().positive().optional(),
})

export const TemplateThemeSchema = z.object({
  colors: TemplateColorsSchema,
  fonts: TemplateFontsSchema,
  typography: TemplateTypographySchema,
  spacing: TemplateSpacingSchema,
  density: TemplateDensitySchema,
})

export const BasicsBlockVariantSchema = z.enum([
  'hero',
  'compact',
  'split',
  'sidebar',
])

export const SummaryBlockVariantSchema = z.enum([
  'paragraph',
  'compact',
  'highlight',
])

export const EntryBlockVariantSchema = z.enum([
  'timeline',
  'stacked',
  'compact-list',
  'cards',
])

export const SkillsBlockVariantSchema = z.enum([
  'badges',
  'groups',
  'compact-list',
])

export const EducationBlockVariantSchema = z.enum(['stacked', 'compact-list'])

export const CertificationsBlockVariantSchema = z.enum(['list', 'compact-list'])

export const AwardsBlockVariantSchema = z.enum(['list', 'compact-list'])

export const LanguagesBlockVariantSchema = z.enum([
  'list',
  'badges',
  'compact-list',
])

export const PublicationsBlockVariantSchema = z.enum(['list', 'compact-list'])

export const CustomBlockVariantSchema = z.enum(['stacked', 'compact'])

export const TemplateTextStyleRefSchema = z.enum([
  'body',
  'muted',
  'heading',
  'sectionTitle',
  'meta',
])

export const TemplateAlignSchema = z.enum(['left', 'center', 'right'])

export const TemplateVisibilityRuleSchema = z.object({
  minItems: z.number().int().nonnegative().optional(),
  sectionKinds: z.array(ResumeSectionKindSchema).optional(),
})

export const TemplateBasicsBlockSchema = z.object({
  type: z.literal('basics'),
  variant: BasicsBlockVariantSchema,
  align: TemplateAlignSchema.optional(),
  showPhoto: z.boolean().optional(),
  showHeadline: z.boolean().optional(),
  showProfiles: z.boolean().optional(),
})

export const TemplateSummaryBlockSchema = z.object({
  type: z.literal('summary'),
  variant: SummaryBlockVariantSchema,
  title: z.string().optional(),
})

export const TemplateSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: ResumeSectionKindSchema.exclude(['summary']),
  variant: z.union([
    EntryBlockVariantSchema,
    SkillsBlockVariantSchema,
    EducationBlockVariantSchema,
    CertificationsBlockVariantSchema,
    AwardsBlockVariantSchema,
    LanguagesBlockVariantSchema,
    PublicationsBlockVariantSchema,
    CustomBlockVariantSchema,
  ]),
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateDividerBlockSchema = z.object({
  type: z.literal('divider'),
})

export const TemplateSpacerBlockSchema = z.object({
  type: z.literal('spacer'),
  size: z.number().positive(),
})

export const TemplateTextBlockSchema = z.object({
  type: z.literal('text'),
  content: z.string().min(1),
  style: TemplateTextStyleRefSchema.optional(),
  align: TemplateAlignSchema.optional(),
})

export const TemplateGroupLayoutSchema = z.enum(['stack', 'row'])

export const TemplateBlockSchema: z.ZodTypeAny = z.lazy(() =>
  z.discriminatedUnion('type', [
    TemplateBasicsBlockSchema,
    TemplateSummaryBlockSchema,
    TemplateSectionBlockSchema,
    TemplateDividerBlockSchema,
    TemplateSpacerBlockSchema,
    TemplateTextBlockSchema,
    z.object({
      type: z.literal('group'),
      layout: TemplateGroupLayoutSchema,
      gap: z.number().positive().optional(),
      children: z.array(TemplateBlockSchema).default([]),
    }),
  ]),
)

export const TemplateRegionsSchema = z.object({
  header: z.array(TemplateBlockSchema).optional(),
  sidebar: z.array(TemplateBlockSchema).optional(),
  main: z.array(TemplateBlockSchema).min(1),
  footer: z.array(TemplateBlockSchema).optional(),
})

export const ResumeTemplateDefinitionSchema = z.object({
  id: z.string().min(1),
  version: z.literal(TemplateVersion),
  name: z.string().min(1),
  description: z.string().optional(),
  page: TemplatePageSchema,
  theme: TemplateThemeSchema,
  regions: TemplateRegionsSchema,
})

export type TemplateVersionType = typeof TemplateVersion
export type TemplatePageSize = z.infer<typeof TemplatePageSizeSchema>
export type TemplateDensity = z.infer<typeof TemplateDensitySchema>
export type TemplateSpacing = z.infer<typeof TemplateSpacingSchema>
export type TemplateMargins = z.infer<typeof TemplateMarginsSchema>
export type TemplateColumns = z.infer<typeof TemplateColumnsSchema>
export type TemplatePage = z.infer<typeof TemplatePageSchema>
export type TemplateColors = z.infer<typeof TemplateColorsSchema>
export type TemplateFonts = z.infer<typeof TemplateFontsSchema>
export type TemplateTypography = z.infer<typeof TemplateTypographySchema>
export type TemplateTheme = z.infer<typeof TemplateThemeSchema>
export type BasicsBlockVariant = z.infer<typeof BasicsBlockVariantSchema>
export type SummaryBlockVariant = z.infer<typeof SummaryBlockVariantSchema>
export type EntryBlockVariant = z.infer<typeof EntryBlockVariantSchema>
export type SkillsBlockVariant = z.infer<typeof SkillsBlockVariantSchema>
export type EducationBlockVariant = z.infer<typeof EducationBlockVariantSchema>
export type CertificationsBlockVariant = z.infer<
  typeof CertificationsBlockVariantSchema
>
export type AwardsBlockVariant = z.infer<typeof AwardsBlockVariantSchema>
export type LanguagesBlockVariant = z.infer<typeof LanguagesBlockVariantSchema>
export type PublicationsBlockVariant = z.infer<
  typeof PublicationsBlockVariantSchema
>
export type CustomBlockVariant = z.infer<typeof CustomBlockVariantSchema>
export type TemplateTextStyleRef = z.infer<typeof TemplateTextStyleRefSchema>
export type TemplateAlign = z.infer<typeof TemplateAlignSchema>
export type TemplateVisibilityRule = z.infer<
  typeof TemplateVisibilityRuleSchema
>
export type TemplateBasicsBlock = z.infer<typeof TemplateBasicsBlockSchema>
export type TemplateSummaryBlock = z.infer<typeof TemplateSummaryBlockSchema>
export type TemplateSectionBlock = z.infer<typeof TemplateSectionBlockSchema>
export type TemplateDividerBlock = z.infer<typeof TemplateDividerBlockSchema>
export type TemplateSpacerBlock = z.infer<typeof TemplateSpacerBlockSchema>
export type TemplateTextBlock = z.infer<typeof TemplateTextBlockSchema>
export type TemplateBlock = z.infer<typeof TemplateBlockSchema>
export type TemplateRegions = z.infer<typeof TemplateRegionsSchema>
export type ResumeTemplateDefinition = z.infer<
  typeof ResumeTemplateDefinitionSchema
>
