import { describe, expect, it } from 'vitest'

import type { ResumeTemplateDefinition } from '@vitaes/backend/convex/shared/template'
import { sampleResumeDocument, sampleResumeTemplate } from '../sample-data'
import { resolveTemplateDocument } from './resolve-template-document'

describe('resolveTemplateDocument', () => {
  it('drops summary blocks when the resume summary is blank', () => {
    const document = {
      ...sampleResumeDocument,
      sections: sampleResumeDocument.sections.map((section) =>
        section.kind === 'summary' ? { ...section, content: '   ' } : section,
      ),
    }

    const resolvedDocument = resolveTemplateDocument({
      document,
      template: sampleResumeTemplate,
    })

    expect(
      resolvedDocument.regions.main.some((block) => block.type === 'summary'),
    ).toBe(false)
  })

  it('respects section dependency visibility rules', () => {
    const document = {
      ...sampleResumeDocument,
      sections: sampleResumeDocument.sections.map((section) =>
        section.kind === 'experience'
          ? { ...section, visible: false }
          : section,
      ),
    }
    const template: ResumeTemplateDefinition = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        main: [
          ...sampleResumeTemplate.regions.main,
          {
            type: 'section' as const,
            section: 'education',
            variant: 'stacked' as const,
            title: 'Education (Requires Experience)',
            visibleWhen: {
              sectionKinds: ['experience'],
            },
          },
        ],
      },
    }

    const resolvedDocument = resolveTemplateDocument({
      document,
      template,
    })

    expect(
      resolvedDocument.regions.main.some(
        (block) =>
          block.type === 'education-section' &&
          block.title === 'Education (Requires Experience)',
      ),
    ).toBe(false)
  })

  it('resolves nested group blocks while pruning hidden children', () => {
    const document = {
      ...sampleResumeDocument,
      sections: sampleResumeDocument.sections.map((section) =>
        section.kind === 'summary' ? { ...section, content: '' } : section,
      ),
    }
    const template = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        header: [
          {
            type: 'group' as const,
            layout: 'row' as const,
            children: [
              {
                type: 'text' as const,
                content: 'Static header note',
                style: 'meta' as const,
              },
              {
                type: 'summary' as const,
                variant: 'compact' as const,
                title: 'Should disappear',
              },
            ],
          },
        ],
      },
    }

    const resolvedDocument = resolveTemplateDocument({
      document,
      template,
    })
    const group = resolvedDocument.regions.header[0]

    expect(group).toMatchObject({
      type: 'group',
      layout: 'row',
    })

    if (!group || group.type !== 'group') {
      throw new Error('Expected header group to be resolved.')
    }

    expect(group.children).toHaveLength(1)
    expect(group.children[0]).toMatchObject({
      type: 'text',
      content: 'Static header note',
    })
  })
})
