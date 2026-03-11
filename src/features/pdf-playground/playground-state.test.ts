import { describe, expect, it } from 'vitest'

import { sampleResumeDocument, sampleResumeTemplate } from './sample-data'
import {
  buildEffectiveDocument,
  createTemplateDraft,
  getSelectedDraftBlock,
  getSupportedSectionKinds,
  moveRegionBlock,
  setBlockVariant,
  updateRegionBlock,
} from './playground-state'

describe('playground-state', () => {
  it('applies visibility overrides without mutating the source document', () => {
    const sourceDocument = sampleResumeDocument
    const effectiveDocument = buildEffectiveDocument(sourceDocument, {
      experience: false,
    })

    expect(
      sourceDocument.sections.find((section) => section.id === 'experience')
        ?.visible,
    ).toBe(true)
    expect(
      effectiveDocument.sections.find((section) => section.id === 'experience')
        ?.visible,
    ).toBe(false)
  })

  it('updates and reorders region blocks in a draft template', () => {
    const draftTemplate = createTemplateDraft(sampleResumeTemplate)
    const firstSectionIndex = draftTemplate.regions.main.findIndex(
      (block) => block.type === 'section',
    )
    const updatedTemplate = updateRegionBlock(
      draftTemplate,
      'main',
      firstSectionIndex,
      (block) =>
        block.type === 'section'
          ? { ...block, title: 'Career Highlights' }
          : block,
    )

    expect(updatedTemplate.regions.main[firstSectionIndex]).toMatchObject({
      type: 'section',
      title: 'Career Highlights',
    })

    const moved = moveRegionBlock(
      updatedTemplate,
      'main',
      firstSectionIndex,
      'down',
    )

    expect(moved.nextLocation).toEqual({
      region: 'main',
      index: firstSectionIndex + 1,
    })
    expect(moved.template.regions.main[firstSectionIndex + 1]).toMatchObject({
      type: 'section',
      title: 'Career Highlights',
    })
  })

  it('returns the selected block and supported section kinds from the draft', () => {
    const draftTemplate = createTemplateDraft(sampleResumeTemplate)
    const firstSectionIndex = draftTemplate.regions.main.findIndex(
      (block) => block.type === 'section',
    )

    expect(
      getSelectedDraftBlock(draftTemplate, {
        region: 'main',
        index: firstSectionIndex,
      }),
    ).toMatchObject({
      type: 'section',
    })
    expect(getSupportedSectionKinds(draftTemplate)).toContain('experience')
    expect(getSupportedSectionKinds(draftTemplate)).toContain('skills')
  })

  it('updates block variants with section-aware narrowing', () => {
    const draftTemplate = createTemplateDraft(sampleResumeTemplate)
    const experienceBlock = draftTemplate.regions.main.find(
      (block) => block.type === 'section' && block.section === 'experience',
    )
    const skillsBlock = draftTemplate.regions.sidebar?.find(
      (block) => block.type === 'section' && block.section === 'skills',
    )

    if (!experienceBlock || !skillsBlock) {
      throw new Error('Expected sample template blocks were not found.')
    }

    expect(setBlockVariant(experienceBlock, 'cards')).toMatchObject({
      type: 'section',
      section: 'experience',
      variant: 'cards',
    })
    expect(setBlockVariant(skillsBlock, 'badges')).toMatchObject({
      type: 'section',
      section: 'skills',
      variant: 'badges',
    })
  })
})
