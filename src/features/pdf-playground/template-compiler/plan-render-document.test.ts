import { describe, expect, it } from 'vitest'

import type { ResumeDocument } from '../../../../convex/shared/resume'
import type { ResumeTemplateDefinition } from '../../../../convex/shared/template'
import {
  resumeFixtures,
  sampleResumeDocument,
  sampleResumeTemplate,
  templateFixtures,
} from '../sample-data'
import { planRenderDocument } from './plan-render-document'
import type { RenderNode } from './render-ir'
import { resolveTemplateDocument } from './resolve-template-document'

function planFromTemplate(
  template = sampleResumeTemplate,
  document = sampleResumeDocument,
) {
  return planRenderDocument(
    resolveTemplateDocument({
      document,
      template,
    }),
  )
}

function findSectionByTitle(nodes: RenderNode[], title: string) {
  return nodes.find(
    (node) =>
      node.type === 'view' &&
      node.children[0]?.type === 'view' &&
      node.children[0].children[0]?.type === 'text' &&
      node.children[0].children[0].text === title,
  )
}

describe('planRenderDocument', () => {
  it('renders card variants as non-wrapping surfaced entry cards', () => {
    const template = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        main: sampleResumeTemplate.regions.main.map((block) =>
          block.type === 'section' && block.section === 'experience'
            ? { ...block, variant: 'cards' as const }
            : block,
        ),
      },
    }

    const plannedDocument = planFromTemplate(template)
    const experienceSection = findSectionByTitle(
      plannedDocument.regions.main,
      'Experience',
    )

    if (!experienceSection || experienceSection.type !== 'view') {
      throw new Error('Expected experience section in planned document.')
    }

    const entryList = experienceSection.children[1]

    if (!entryList || entryList.type !== 'view') {
      throw new Error('Expected experience entry list.')
    }

    const firstEntry = entryList.children[0]

    expect(firstEntry).toMatchObject({
      type: 'view',
      wrap: false,
      style: ['entryCard', 'entryCardSurface'],
    })
  })

  it('renders compact skill groups as segmented text rows', () => {
    const template = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        sidebar: (sampleResumeTemplate.regions.sidebar ?? []).map((block) =>
          block.type === 'section' && block.section === 'skills'
            ? { ...block, variant: 'compact-list' as const }
            : block,
        ),
      },
    }

    const plannedDocument = planFromTemplate(template)
    const skillsSection = findSectionByTitle(
      plannedDocument.regions.sidebar,
      'Capabilities',
    )

    if (!skillsSection || skillsSection.type !== 'view') {
      throw new Error('Expected skills section in sidebar.')
    }

    const compactList = skillsSection.children[1]

    if (!compactList || compactList.type !== 'view') {
      throw new Error('Expected skills compact list.')
    }

    expect(compactList.style).toEqual(['compactList'])
    expect(compactList.children[0]).toMatchObject({
      type: 'text',
      style: ['compactText'],
      segments: [
        { text: 'Research & Strategy: ', style: ['compactLabel'] },
        { text: 'User interviews, Journey maps, Service blueprints' },
      ],
    })
  })

  it('renders badge language variants with proficiency labels', () => {
    const template = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        sidebar: (sampleResumeTemplate.regions.sidebar ?? []).map((block) =>
          block.type === 'section' && block.section === 'languages'
            ? { ...block, variant: 'badges' as const }
            : block,
        ),
      },
    }

    const plannedDocument = planFromTemplate(template)
    const languagesSection = findSectionByTitle(
      plannedDocument.regions.sidebar,
      'Languages',
    )

    if (!languagesSection || languagesSection.type !== 'view') {
      throw new Error('Expected languages section in sidebar.')
    }

    const badgeWrap = languagesSection.children[1]

    if (!badgeWrap || badgeWrap.type !== 'view') {
      throw new Error('Expected languages badge container.')
    }

    expect(badgeWrap.style).toEqual(['badgeWrap'])
    expect(badgeWrap.children[0]).toMatchObject({
      type: 'text',
      text: 'Portuguese · Native',
    })
  })

  it('renders publication list entries using simple-entry planner output', () => {
    const meridianResume = resumeFixtures.find(
      (fixture) => fixture.id === 'meridian-resume',
    )?.document
    const meridianTemplate = templateFixtures.find(
      (fixture) => fixture.id === 'meridian-template',
    )?.template

    if (!meridianResume || !meridianTemplate) {
      throw new Error('Expected meridian fixtures to exist.')
    }

    const plannedDocument = planFromTemplate(meridianTemplate, meridianResume)
    const publicationsSection = findSectionByTitle(
      plannedDocument.regions.main,
      'Publications',
    )

    if (!publicationsSection || publicationsSection.type !== 'view') {
      throw new Error('Expected publications section in main region.')
    }

    const entryList = publicationsSection.children[1]

    if (!entryList || entryList.type !== 'view') {
      throw new Error('Expected publications entry list.')
    }

    expect(entryList.children[0]).toMatchObject({
      type: 'view',
      style: ['entryCard'],
      children: [
        {
          type: 'view',
          style: ['entryHeader'],
          children: [
            {
              type: 'text',
              style: ['entryTitle'],
              text: 'Adaptive Load Shedding in Multi-Tenant Stream Processors',
            },
            {
              type: 'text',
              style: ['entryMeta'],
              text: '2023',
            },
          ],
        },
        {
          type: 'text',
          style: ['entryOrganization'],
          text: 'ACM SIGMOD Workshop',
        },
        {
          type: 'text',
          style: ['bodyText'],
          text: 'Proposed a feedback-driven approach to load shedding that preserves tenant SLOs under bursty workloads.',
        },
      ],
    })
  })

  it('renders compact custom sections across text, list, and entry blocks', () => {
    const customDocument: ResumeDocument = {
      ...sampleResumeDocument,
      sections: [
        ...sampleResumeDocument.sections,
        {
          id: 'custom',
          kind: 'custom',
          title: 'Extras',
          visible: true,
          blocks: [
            {
              id: 'custom-text',
              type: 'text',
              title: 'Approach',
              content: 'Designing for clarity under operational constraints.',
            },
            {
              id: 'custom-list',
              type: 'list',
              title: 'Principles',
              items: ['Bias for shipping', 'Evidence over opinion'],
            },
            {
              id: 'custom-entries',
              type: 'entries',
              title: 'Side Projects',
              items: [
                {
                  id: 'custom-entry-1',
                  title: 'Open source maintainer',
                  organization: 'Toolsmith',
                  summary: 'Maintains workflow tooling for distributed teams.',
                  highlights: [],
                  tags: [],
                },
              ],
            },
          ],
        },
      ],
    }
    const customTemplate: ResumeTemplateDefinition = {
      ...sampleResumeTemplate,
      regions: {
        ...sampleResumeTemplate.regions,
        main: [
          {
            type: 'section',
            section: 'custom',
            variant: 'compact',
            title: 'Extras',
          },
        ],
      },
    }

    const plannedDocument = planFromTemplate(customTemplate, customDocument)
    const customSection = findSectionByTitle(
      plannedDocument.regions.main,
      'Extras',
    )

    if (!customSection || customSection.type !== 'view') {
      throw new Error('Expected custom section in main region.')
    }

    const compactList = customSection.children[1]

    if (!compactList || compactList.type !== 'view') {
      throw new Error('Expected custom compact list container.')
    }

    expect(compactList.style).toEqual(['compactList'])
    expect(compactList.children[0]).toMatchObject({
      type: 'view',
      style: ['entryCard'],
    })
    expect(compactList.children[1]).toMatchObject({
      type: 'view',
      style: ['entryCard'],
    })
    expect(compactList.children[2]).toMatchObject({
      type: 'view',
      style: ['entryList'],
    })
  })
})
