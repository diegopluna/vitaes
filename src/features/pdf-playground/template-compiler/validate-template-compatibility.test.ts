import { describe, expect, it } from 'vitest'

import type { ResumeDocument } from '../../../../convex/shared/resume'
import type { ResumeTemplateDefinition } from '../../../../convex/shared/template'
import { sampleResumeDocument, sampleResumeTemplate } from '../sample-data'
import {
  TemplateCompatibilityError,
  assertResumeTemplateCompatibility,
  validateResumeTemplateCompatibility,
} from './validate-template-compatibility'

describe('validateResumeTemplateCompatibility', () => {
  it('reports warnings for missing or hidden content that will be omitted', () => {
    const document: ResumeDocument = {
      ...sampleResumeDocument,
      sections: sampleResumeDocument.sections
        .filter((section) => section.kind !== 'summary')
        .map((section) =>
          section.kind === 'languages' ? { ...section, items: [] } : section,
        ),
    }

    const issues = validateResumeTemplateCompatibility({
      document,
      template: sampleResumeTemplate,
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'warning',
          code: 'missing-summary',
        }),
        expect.objectContaining({
          severity: 'warning',
          code: 'hidden-by-visibility-rule',
        }),
      ]),
    )
  })

  it('warns when a sidebar basics block would render as name-only', () => {
    const document: ResumeDocument = {
      ...sampleResumeDocument,
      basics: {
        ...sampleResumeDocument.basics,
        headline: undefined,
        location: undefined,
        email: undefined,
        phone: undefined,
        profiles: [],
      },
    }
    const template: ResumeTemplateDefinition = {
      ...sampleResumeTemplate,
      page: {
        ...sampleResumeTemplate.page,
        columns: {
          left: 0.35,
          right: 0.65,
          gap: 12,
        },
      },
      regions: {
        ...sampleResumeTemplate.regions,
        header: [],
        sidebar: [
          {
            type: 'basics',
            variant: 'sidebar',
            showHeadline: true,
            showProfiles: true,
          },
        ],
        main: [
          {
            type: 'text',
            content: 'Fallback main content',
          },
        ],
      },
    }

    const issues = validateResumeTemplateCompatibility({
      document,
      template,
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'warning',
          code: 'headline-missing',
        }),
        expect.objectContaining({
          severity: 'warning',
          code: 'basics-sidebar-sparse',
        }),
      ]),
    )
  })

  it('treats an empty resolved main region as a hard compatibility error', () => {
    const document: ResumeDocument = {
      ...sampleResumeDocument,
      sections: sampleResumeDocument.sections.map((section) => {
        switch (section.kind) {
          case 'summary':
            return { ...section, content: '' }
          case 'experience':
          case 'education':
          case 'projects':
          case 'publications':
          case 'awards':
            return { ...section, visible: false }
          default:
            return section
        }
      }),
    }

    const issues = validateResumeTemplateCompatibility({
      document,
      template: sampleResumeTemplate,
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'error',
          code: 'empty-main-region',
        }),
      ]),
    )

    expect(() =>
      assertResumeTemplateCompatibility({
        document,
        template: sampleResumeTemplate,
      }),
    ).toThrow(TemplateCompatibilityError)
  })
})
