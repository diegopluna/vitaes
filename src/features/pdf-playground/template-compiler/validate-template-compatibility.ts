import type {
  ResumeDocument,
  ResumeSection,
} from '../../../../convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateBlock,
  TemplateVisibilityRule,
} from '../../../../convex/shared/template'
import { parseResumeTemplateDefinition } from '../../../../convex/shared/template'
import { resolveTemplateDocument } from './resolve-template-document'

type RegionKey = 'header' | 'sidebar' | 'main' | 'footer'

export type TemplateCompatibilityIssue = {
  severity: 'error' | 'warning'
  code:
    | 'empty-main-region'
    | 'missing-summary'
    | 'empty-summary'
    | 'missing-section'
    | 'hidden-by-visibility-rule'
    | 'empty-section'
    | 'headline-missing'
    | 'basics-sidebar-sparse'
  path: Array<string | number>
  message: string
}

export class TemplateCompatibilityError extends Error {
  issues: TemplateCompatibilityIssue[]

  constructor(issues: TemplateCompatibilityIssue[]) {
    super(issues.map((issue) => issue.message).join(' '))
    this.name = 'TemplateCompatibilityError'
    this.issues = issues
  }
}

export function validateResumeTemplateCompatibility({
  document,
  template,
}: {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}): TemplateCompatibilityIssue[] {
  const parsedTemplate = parseResumeTemplateDefinition(template)
  const issues: TemplateCompatibilityIssue[] = []
  const regions: RegionKey[] = ['header', 'sidebar', 'main', 'footer']

  for (const region of regions) {
    const blocks = parsedTemplate.regions[region] ?? []

    blocks.forEach((block, index) => {
      validateBlockCompatibility({
        block,
        document,
        region,
        path: ['regions', region, index],
        issues,
      })
    })
  }

  const resolvedDocument = resolveTemplateDocument({
    document,
    template: parsedTemplate,
  })

  if (!hasResolvedContent(resolvedDocument.regions.main)) {
    issues.push({
      severity: 'error',
      code: 'empty-main-region',
      path: ['regions', 'main'],
      message:
        'This resume resolves to no visible main-region content for the selected template.',
    })
  }

  return issues
}

export function assertResumeTemplateCompatibility(params: {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}) {
  const issues = validateResumeTemplateCompatibility(params)
  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new TemplateCompatibilityError(errors)
  }

  return issues
}

function validateBlockCompatibility({
  block,
  document,
  region,
  path,
  issues,
}: {
  block: TemplateBlock
  document: ResumeDocument
  region: RegionKey
  path: Array<string | number>
  issues: TemplateCompatibilityIssue[]
}) {
  switch (block.type) {
    case 'basics': {
      const hasRenderedContact =
        !!document.basics.location ||
        !!document.basics.email ||
        !!document.basics.phone ||
        document.basics.profiles.length > 0

      if (block.showHeadline !== false && !document.basics.headline) {
        issues.push({
          severity: 'warning',
          code: 'headline-missing',
          path,
          message:
            'The basics block is configured to show a headline, but the resume has no headline.',
        })
      }

      if (
        region === 'sidebar' &&
        block.variant === 'sidebar' &&
        !hasRenderedContact &&
        !document.basics.headline
      ) {
        issues.push({
          severity: 'warning',
          code: 'basics-sidebar-sparse',
          path,
          message:
            'The sidebar basics block will render as name-only because the resume has no headline, contact details, or profiles.',
        })
      }

      return
    }
    case 'summary': {
      const summary = findSection(document.sections, 'summary')

      if (!summary || summary.visible === false) {
        issues.push({
          severity: 'warning',
          code: 'missing-summary',
          path,
          message:
            'The template includes a summary block, but the resume has no visible summary section.',
        })
        return
      }

      if (!summary.content.trim()) {
        issues.push({
          severity: 'warning',
          code: 'empty-summary',
          path,
          message:
            'The template includes a summary block, but the resume summary content is empty.',
        })
      }

      return
    }
    case 'section': {
      const section = findSection(document.sections, block.section)

      if (!section || section.visible === false) {
        issues.push({
          severity: 'warning',
          code: 'missing-section',
          path,
          message: `The template references the "${block.section}" section, but the resume does not expose visible content for it.`,
        })
        return
      }

      if (
        block.visibleWhen &&
        !satisfiesVisibilityRule(
          document.sections,
          block.section,
          block.visibleWhen,
        )
      ) {
        issues.push({
          severity: 'warning',
          code: 'hidden-by-visibility-rule',
          path,
          message: `The "${block.section}" section will be hidden by its visibility rule for this resume.`,
        })
        return
      }

      if (getSectionItemCount(section) === 0) {
        issues.push({
          severity: 'warning',
          code: 'empty-section',
          path,
          message: `The "${block.section}" section is present but contains no renderable items for this template.`,
        })
      }

      return
    }
    case 'group':
      block.children.forEach((child, index) => {
        validateBlockCompatibility({
          block: child,
          document,
          region,
          path: [...path, 'children', index],
          issues,
        })
      })
      return
    default:
      return
  }
}

function hasResolvedContent(
  blocks: Array<{ type: string; children?: unknown[] }>,
): boolean {
  return blocks.some((block) => {
    switch (block.type) {
      case 'basics':
      case 'summary':
      case 'entry-section':
      case 'education-section':
      case 'skills-section':
      case 'languages-section':
      case 'certifications-section':
      case 'awards-section':
      case 'publications-section':
      case 'custom-section':
      case 'text':
        return true
      case 'group':
        return hasResolvedContent(
          (block.children ?? []) as Array<{
            type: string
            children?: unknown[]
          }>,
        )
      default:
        return false
    }
  })
}

function findSection<K extends ResumeSection['kind']>(
  sections: ResumeSection[],
  kind: K,
): Extract<ResumeSection, { kind: K }> | undefined {
  return sections.find(
    (section): section is Extract<ResumeSection, { kind: K }> =>
      section.kind === kind,
  )
}

function satisfiesVisibilityRule(
  sections: ResumeSection[],
  sectionKind: ResumeSection['kind'],
  rule: TemplateVisibilityRule,
) {
  const section = sections.find((candidate) => candidate.kind === sectionKind)

  if (!section || section.visible === false) {
    return false
  }

  if (rule.sectionKinds?.length) {
    const visibleKinds = new Set(
      sections
        .filter((candidate) => candidate.visible !== false)
        .map((candidate) => candidate.kind),
    )

    if (!rule.sectionKinds.every((kind) => visibleKinds.has(kind))) {
      return false
    }
  }

  if (typeof rule.minItems === 'number') {
    return getSectionItemCount(section) >= rule.minItems
  }

  return true
}

function getSectionItemCount(section: ResumeSection) {
  switch (section.kind) {
    case 'summary':
      return section.content.trim() ? 1 : 0
    case 'experience':
    case 'projects':
    case 'volunteering':
    case 'education':
    case 'certifications':
    case 'awards':
    case 'languages':
    case 'publications':
      return section.items.length
    case 'skills':
      return section.groups.reduce(
        (count, group) => count + group.items.length,
        0,
      )
    case 'custom':
      return section.blocks.length
    default:
      return 0
  }
}
