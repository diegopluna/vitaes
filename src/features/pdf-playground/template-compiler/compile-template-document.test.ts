import { describe, expect, it } from 'vitest'

import {
  resumeFixtures,
  sampleResumeDocument,
  sampleResumeTemplate,
  templateFixtures,
} from '../sample-data'
import { compileTemplateDocument } from './compile-template-document'

describe('compileTemplateDocument', () => {
  it('produces a compiled document with region output for the sample template', () => {
    const compiledDocument = compileTemplateDocument({
      document: sampleResumeDocument,
      template: sampleResumeTemplate,
    })

    expect(compiledDocument.title).toContain(
      sampleResumeDocument.basics.fullName,
    )
    expect(compiledDocument.template.id).toBe(sampleResumeTemplate.id)
    expect(compiledDocument.regions.main.length).toBeGreaterThan(0)
  })

  it('plans section output as renderer-agnostic nodes', () => {
    const compiledDocument = compileTemplateDocument({
      document: sampleResumeDocument,
      template: sampleResumeTemplate,
    })

    const firstMainNode = compiledDocument.regions.main[0]

    expect(firstMainNode).toMatchObject({
      type: 'view',
    })

    if (firstMainNode.type !== 'view') {
      throw new Error('Expected first main node to be a view.')
    }

    expect(firstMainNode.children[0]).toMatchObject({
      type: 'view',
    })
  })

  it('omits unresolved sections when fixture data does not satisfy template visibility rules', () => {
    const denseResume = resumeFixtures.find(
      (fixture) => fixture.id === 'dense-resume',
    )?.document

    if (!denseResume) {
      throw new Error('Expected dense resume fixture to exist.')
    }

    const compiledDocument = compileTemplateDocument({
      document: denseResume,
      template: sampleResumeTemplate,
    })
    const mainTitles = compiledDocument.regions.main.flatMap((node) =>
      node.type === 'view' &&
      node.children[0]?.type === 'view' &&
      node.children[0].children[0]?.type === 'text' &&
      node.children[0].children[0].text
        ? [node.children[0].children[0].text]
        : [],
    )
    const sidebarTitles = compiledDocument.regions.sidebar.flatMap((node) =>
      node.type === 'view' &&
      node.children[0]?.type === 'view' &&
      node.children[0].children[0]?.type === 'text' &&
      node.children[0].children[0].text
        ? [node.children[0].children[0].text]
        : [],
    )

    expect(mainTitles).toEqual([
      'About',
      'Experience',
      'Selected Initiatives',
      'Recognition',
    ])
    expect(sidebarTitles).toEqual(['Core Strengths'])
  })

  it('preserves region ordering for the meridian engineering fixture pair', () => {
    const meridianResume = resumeFixtures.find(
      (fixture) => fixture.id === 'meridian-resume',
    )?.document
    const meridianTemplate = templateFixtures.find(
      (fixture) => fixture.id === 'meridian-template',
    )?.template

    if (!meridianResume || !meridianTemplate) {
      throw new Error('Expected meridian fixtures to exist.')
    }

    const compiledDocument = compileTemplateDocument({
      document: meridianResume,
      template: meridianTemplate,
    })
    const mainTitles = compiledDocument.regions.main.flatMap((node) =>
      node.type === 'view' &&
      node.children[0]?.type === 'view' &&
      node.children[0].children[0]?.type === 'text' &&
      node.children[0].children[0].text
        ? [node.children[0].children[0].text]
        : [],
    )

    expect(mainTitles).toEqual([
      'Summary',
      'Experience',
      'Education',
      'Technical Skills',
      'Publications',
      'Community',
      'Languages',
    ])
  })
})
