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

export const EntrySectionKindSchema = z.enum([
  'experience',
  'projects',
  'volunteering',
])

export const TemplateEntrySectionBlockSchema = z.object({
  type: z.literal('section'),
  section: EntrySectionKindSchema,
  variant: EntryBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateEducationSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('education'),
  variant: EducationBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateSkillsSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('skills'),
  variant: SkillsBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateCertificationsSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('certifications'),
  variant: CertificationsBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateAwardsSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('awards'),
  variant: AwardsBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateLanguagesSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('languages'),
  variant: LanguagesBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplatePublicationsSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('publications'),
  variant: PublicationsBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateCustomSectionBlockSchema = z.object({
  type: z.literal('section'),
  section: z.literal('custom'),
  variant: CustomBlockVariantSchema,
  title: z.string().optional(),
  visibleWhen: TemplateVisibilityRuleSchema.optional(),
})

export const TemplateSectionBlockSchema = z.union([
  TemplateEntrySectionBlockSchema,
  TemplateEducationSectionBlockSchema,
  TemplateSkillsSectionBlockSchema,
  TemplateCertificationsSectionBlockSchema,
  TemplateAwardsSectionBlockSchema,
  TemplateLanguagesSectionBlockSchema,
  TemplatePublicationsSectionBlockSchema,
  TemplateCustomSectionBlockSchema,
])

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
  z.union([
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

const ResumeTemplateDefinitionBaseSchema = z.object({
  id: z.string().min(1),
  version: z.literal(TemplateVersion),
  name: z.string().min(1),
  description: z.string().optional(),
  page: TemplatePageSchema,
  theme: TemplateThemeSchema,
  regions: TemplateRegionsSchema,
})

type TemplateSchemaRegionKey = 'header' | 'sidebar' | 'main' | 'footer'

const REGION_ALLOWED_BLOCK_TYPES: Record<
  TemplateSchemaRegionKey,
  Array<
    'basics' | 'summary' | 'section' | 'divider' | 'spacer' | 'text' | 'group'
  >
> = {
  header: ['basics', 'text', 'divider', 'spacer', 'group'],
  sidebar: ['basics', 'section', 'text', 'divider', 'spacer', 'group'],
  main: ['basics', 'summary', 'section', 'text', 'divider', 'spacer', 'group'],
  footer: ['text', 'divider', 'spacer', 'group'],
}

function hasContentBlock(blocks: any[]): boolean {
  return blocks.some((block) => {
    switch (block.type) {
      case 'basics':
      case 'summary':
      case 'section':
      case 'text':
        return true
      case 'group':
        return hasContentBlock(block.children)
      default:
        return false
    }
  })
}

function validateBlockForRegion(
  block: any,
  ctx: z.RefinementCtx,
  region: TemplateSchemaRegionKey,
  path: Array<string | number>,
  basicsCount: { value: number },
) {
  if (!REGION_ALLOWED_BLOCK_TYPES[region].includes(block.type)) {
    ctx.addIssue({
      code: 'custom',
      path,
      message: `"${block.type}" blocks are not allowed in the ${region} region.`,
    })
  }

  if (block.type === 'basics') {
    basicsCount.value += 1

    if (basicsCount.value > 1) {
      ctx.addIssue({
        code: 'custom',
        path,
        message: 'A template may only contain one basics block.',
      })
    }

    if (block.variant === 'sidebar' && region !== 'sidebar') {
      ctx.addIssue({
        code: 'custom',
        path: [...path, 'variant'],
        message:
          'The "sidebar" basics variant may only be used in the sidebar region.',
      })
    }
  }

  if (block.type === 'group') {
    if (block.children.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: [...path, 'children'],
        message: 'Group blocks must contain at least one child block.',
      })
    }

    block.children.forEach((child: any, index: number) => {
      validateBlockForRegion(
        child,
        ctx,
        region,
        [...path, 'children', index],
        basicsCount,
      )
    })
  }
}

function validateResumeTemplateDefinition(template: any, ctx: z.RefinementCtx) {
  const basicsCount = { value: 0 }
  const regions: TemplateSchemaRegionKey[] = [
    'header',
    'sidebar',
    'main',
    'footer',
  ]

  for (const region of regions) {
    const blocks = template.regions[region] ?? []

    blocks.forEach((block: any, index: number) => {
      validateBlockForRegion(
        block,
        ctx,
        region,
        ['regions', region, index],
        basicsCount,
      )
    })
  }

  if (!hasContentBlock(template.regions.main)) {
    ctx.addIssue({
      code: 'custom',
      path: ['regions', 'main'],
      message:
        'The main region must contain at least one content block such as basics, summary, section, text, or a non-empty group.',
    })
  }
}

export const ResumeTemplateDefinitionSchema =
  ResumeTemplateDefinitionBaseSchema.superRefine(
    validateResumeTemplateDefinition,
  )

export function parseResumeTemplateDefinition(template: unknown) {
  return ResumeTemplateDefinitionSchema.parse(
    template,
  ) as ResumeTemplateDefinition
}

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
export type EntrySectionKind = z.infer<typeof EntrySectionKindSchema>
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
export type TemplateGroupLayout = z.infer<typeof TemplateGroupLayoutSchema>
export type TemplateTextStyleRef = z.infer<typeof TemplateTextStyleRefSchema>
export type TemplateAlign = z.infer<typeof TemplateAlignSchema>
export type TemplateVisibilityRule = z.infer<
  typeof TemplateVisibilityRuleSchema
>
export type TemplateBasicsBlock = z.infer<typeof TemplateBasicsBlockSchema>
export type TemplateSummaryBlock = z.infer<typeof TemplateSummaryBlockSchema>
export type TemplateEntrySectionBlock = z.infer<
  typeof TemplateEntrySectionBlockSchema
>
export type TemplateEducationSectionBlock = z.infer<
  typeof TemplateEducationSectionBlockSchema
>
export type TemplateSkillsSectionBlock = z.infer<
  typeof TemplateSkillsSectionBlockSchema
>
export type TemplateCertificationsSectionBlock = z.infer<
  typeof TemplateCertificationsSectionBlockSchema
>
export type TemplateAwardsSectionBlock = z.infer<
  typeof TemplateAwardsSectionBlockSchema
>
export type TemplateLanguagesSectionBlock = z.infer<
  typeof TemplateLanguagesSectionBlockSchema
>
export type TemplatePublicationsSectionBlock = z.infer<
  typeof TemplatePublicationsSectionBlockSchema
>
export type TemplateCustomSectionBlock = z.infer<
  typeof TemplateCustomSectionBlockSchema
>
export type TemplateSectionBlock = z.infer<typeof TemplateSectionBlockSchema>
export type TemplateDividerBlock = z.infer<typeof TemplateDividerBlockSchema>
export type TemplateSpacerBlock = z.infer<typeof TemplateSpacerBlockSchema>
export type TemplateTextBlock = z.infer<typeof TemplateTextBlockSchema>
export type TemplateGroupBlock = {
  type: 'group'
  layout: TemplateGroupLayout
  gap?: number
  children: TemplateBlock[]
}
export type TemplateBlock =
  | TemplateBasicsBlock
  | TemplateSummaryBlock
  | TemplateSectionBlock
  | TemplateDividerBlock
  | TemplateSpacerBlock
  | TemplateTextBlock
  | TemplateGroupBlock
export type TemplateRegions = {
  header?: TemplateBlock[]
  sidebar?: TemplateBlock[]
  main: TemplateBlock[]
  footer?: TemplateBlock[]
}
export type ResumeTemplateDefinition = {
  id: string
  version: TemplateVersionType
  name: string
  description?: string
  page: TemplatePage
  theme: TemplateTheme
  regions: TemplateRegions
}
