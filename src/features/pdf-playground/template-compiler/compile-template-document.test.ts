import { describe, expect, it } from 'vitest'

import { sampleResumeDocument, sampleResumeTemplate } from '../sample-data'
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
})
