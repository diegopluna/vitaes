import type { ResumeDocument } from '../../../../convex/shared/resume'
import { parseResumeTemplateDefinition } from '../../../../convex/shared/template'
import type { ResumeTemplateDefinition } from '../../../../convex/shared/template'
import type { CompiledTemplateDocument } from './render-ir'
import { planRenderDocument } from './plan-render-document'
import { resolveTemplateDocument } from './resolve-template-document'
import { assertResumeTemplateCompatibility } from './validate-template-compatibility'

type CompileTemplateDocumentParams = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

export function compileTemplateDocument({
  document,
  template,
}: CompileTemplateDocumentParams): CompiledTemplateDocument {
  const parsedTemplate = parseResumeTemplateDefinition(template)

  assertResumeTemplateCompatibility({
    document,
    template: parsedTemplate,
  })

  const resolvedDocument = resolveTemplateDocument({
    document,
    template: parsedTemplate,
  })

  return planRenderDocument(resolvedDocument)
}
