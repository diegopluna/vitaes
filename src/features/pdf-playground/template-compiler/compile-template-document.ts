import type { ResumeDocument } from '../../../../convex/shared/resume'
import type { ResumeTemplateDefinition } from '../../../../convex/shared/template'
import type { CompiledTemplateDocument } from './render-ir'
import { planRenderDocument } from './plan-render-document'
import { resolveTemplateDocument } from './resolve-template-document'

type CompileTemplateDocumentParams = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

export function compileTemplateDocument({
  document,
  template,
}: CompileTemplateDocumentParams): CompiledTemplateDocument {
  const resolvedDocument = resolveTemplateDocument({ document, template })

  return planRenderDocument(resolvedDocument)
}
