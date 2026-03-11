import { describe, expect, it } from 'vitest'

import { sampleResumeDocument, sampleResumeTemplate } from '../sample-data'
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
})
