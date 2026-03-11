import type { ResumeDocument } from '@vitaes/backend/convex/shared/resume'
import { parseResumeTemplateDefinition } from '@vitaes/backend/convex/shared/template'
import type { ResumeTemplateDefinition } from '@vitaes/backend/convex/shared/template'
import type { CompiledTemplateDocument } from './render-ir'
import { planRenderDocument } from './plan-render-document'
import { resolveTemplateDocument } from './resolve-template-document'
import type { ResolvedTemplateDocument } from './resolved-template-document'
import {
  assertResumeTemplateCompatibility,
  getResumeTemplateCompatibilityReport,
} from './validate-template-compatibility'
import type { TemplateCompatibilityReport } from './validate-template-compatibility'

type CompileTemplateDocumentParams = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

export type CompileTemplateReport = {
  template: ResumeTemplateDefinition
  resolvedDocument: ResolvedTemplateDocument
  compiledDocument: CompiledTemplateDocument | null
  compatibilityReport: TemplateCompatibilityReport
}

export function getCompileTemplateReport({
  document,
  template,
}: CompileTemplateDocumentParams): CompileTemplateReport {
  const parsedTemplate = parseResumeTemplateDefinition(template)
  const resolvedDocument = resolveTemplateDocument({
    document,
    template: parsedTemplate,
  })
  const compatibilityReport = getResumeTemplateCompatibilityReport({
    document,
    template: parsedTemplate,
  })

  return {
    template: parsedTemplate,
    resolvedDocument,
    compiledDocument: compatibilityReport.hasErrors
      ? null
      : planRenderDocument(resolvedDocument),
    compatibilityReport,
  }
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
  return getCompileTemplateReport({
    document,
    template: parsedTemplate,
  }).compiledDocument as CompiledTemplateDocument
}
