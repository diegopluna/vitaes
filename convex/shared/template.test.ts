import { describe, expect, it } from 'vitest'

import {
  sampleResumeTemplate,
  templateFixtures,
} from '../../src/features/pdf-playground/sample-data'
import {
  getTemplateLayoutMode,
  migrateResumeTemplateDefinition,
  parseResumeTemplateDefinition,
  ResumeTemplateDefinitionSchema,
  TemplateVersion,
} from './template'

describe('ResumeTemplateDefinitionSchema', () => {
  it('accepts the built-in template fixtures', () => {
    for (const fixture of templateFixtures) {
      expect(
        ResumeTemplateDefinitionSchema.safeParse(fixture.template).success,
      ).toBe(true)
      expect(parseResumeTemplateDefinition(fixture.template)).toEqual(
        fixture.template,
      )
    }
  })

  it('derives layout mode from columns and sidebar content', () => {
    expect(getTemplateLayoutMode(sampleResumeTemplate)).toBe('two-column')
    expect(
      getTemplateLayoutMode({
        ...sampleResumeTemplate,
        page: {
          ...sampleResumeTemplate.page,
          columns: undefined,
        },
        regions: {
          ...sampleResumeTemplate.regions,
          sidebar: [],
        },
      }),
    ).toBe('single-column')
  })

  it('rejects summary blocks outside the main region', () => {
    const invalidTemplate = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        sidebar: [
          ...(sampleResumeTemplate.regions.sidebar ?? []),
          {
            type: 'summary' as const,
            variant: 'compact' as const,
          },
        ],
      },
    }

    const result = ResumeTemplateDefinitionSchema.safeParse(invalidTemplate)

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Expected sidebar summary template to be invalid.')
    }

    expect(result.error.issues[0]?.message).toContain(
      'not allowed in the sidebar region',
    )
  })

  it('rejects duplicate basics blocks and sidebar variants outside the sidebar', () => {
    const invalidTemplate = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        main: [
          {
            type: 'basics' as const,
            variant: 'sidebar' as const,
          },
          ...sampleResumeTemplate.regions.main,
        ],
      },
    }

    const result = ResumeTemplateDefinitionSchema.safeParse(invalidTemplate)

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Expected duplicate basics template to be invalid.')
    }

    expect(result.error.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        'A template may only contain one basics block.',
        'The "sidebar" basics variant may only be used in the sidebar region.',
      ]),
    )
  })

  it('rejects empty groups and contentless main regions', () => {
    const invalidTemplate = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        main: [
          {
            type: 'group' as const,
            layout: 'stack' as const,
            children: [],
          },
          { type: 'divider' as const },
          { type: 'spacer' as const, size: 8 },
        ],
      },
    }

    const result = ResumeTemplateDefinitionSchema.safeParse(invalidTemplate)

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Expected empty-group template to be invalid.')
    }

    expect(result.error.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        'Group blocks must contain at least one child block.',
        'The main region must contain at least one content block such as basics, summary, section, text, or a non-empty group.',
      ]),
    )
  })

  it('rejects section blocks in the footer region', () => {
    const invalidTemplate = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        footer: [
          ...(sampleResumeTemplate.regions.footer ?? []),
          {
            type: 'section' as const,
            section: 'awards' as const,
            variant: 'list' as const,
          },
        ],
      },
    }

    const result = ResumeTemplateDefinitionSchema.safeParse(invalidTemplate)

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Expected footer section template to be invalid.')
    }

    expect(result.error.issues[0]?.message).toContain(
      'not allowed in the footer region',
    )
  })

  it('rejects sidebar content without page columns and dead columns without sidebar content', () => {
    const missingColumns = ResumeTemplateDefinitionSchema.safeParse({
      ...sampleResumeTemplate,
      page: {
        ...sampleResumeTemplate.page,
        columns: undefined,
      },
    })

    expect(missingColumns.success).toBe(false)

    if (missingColumns.success) {
      throw new Error(
        'Expected sidebar template without columns to be invalid.',
      )
    }

    expect(missingColumns.error.issues[0]?.message).toContain(
      'must define page.columns',
    )

    const deadColumns = ResumeTemplateDefinitionSchema.safeParse({
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        sidebar: [],
      },
    })

    expect(deadColumns.success).toBe(false)

    if (deadColumns.success) {
      throw new Error('Expected columns without sidebar content to be invalid.')
    }

    expect(deadColumns.error.issues[0]?.message).toContain(
      'must not define page.columns',
    )
  })

  it('rejects unsupported template versions at the migration boundary', () => {
    expect(() =>
      migrateResumeTemplateDefinition({
        ...sampleResumeTemplate,
        version: TemplateVersion + 1,
      }),
    ).toThrow('Unsupported template version')
  })
})
