import type {
  ResumeDocument,
  ResumeSection,
} from '@vitaes/backend/convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateBlock,
  TemplateVisibilityRule,
} from '@vitaes/backend/convex/shared/template'
import type {
  ResolvedTemplateBlock,
  ResolvedTemplateDocument,
} from './resolved-template-document'

export function resolveTemplateDocument({
  document,
  template,
}: {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}): ResolvedTemplateDocument {
  return {
    title: `${document.basics.fullName} Resume`,
    template,
    basics: document.basics,
    regions: {
      header: resolveBlocks(template.regions.header ?? [], document),
      sidebar: resolveBlocks(template.regions.sidebar ?? [], document),
      main: resolveBlocks(template.regions.main, document),
      footer: resolveBlocks(template.regions.footer ?? [], document),
    },
  }
}

function resolveBlocks(
  blocks: TemplateBlock[],
  document: ResumeDocument,
): ResolvedTemplateBlock[] {
  return blocks.flatMap((block) => {
    const resolvedBlock = resolveBlock(block, document)
    return resolvedBlock ? [resolvedBlock] : []
  })
}

function resolveBlock(
  block: TemplateBlock,
  document: ResumeDocument,
): ResolvedTemplateBlock | null {
  switch (block.type) {
    case 'basics':
      return {
        type: 'basics',
        block,
        basics: document.basics,
      }
    case 'summary': {
      const summary = findSection(document.sections, 'summary')

      if (!summary || summary.visible === false || !summary.content.trim()) {
        return null
      }

      return {
        type: 'summary',
        title: block.title ?? summary.title ?? 'Summary',
        variant: block.variant,
        content: summary.content,
      }
    }
    case 'section': {
      if (
        block.visibleWhen &&
        !satisfiesVisibilityRule(
          document.sections,
          block.section,
          block.visibleWhen,
        )
      ) {
        return null
      }

      switch (block.section) {
        case 'experience':
        case 'projects':
        case 'volunteering': {
          const section = findSection(document.sections, block.section)

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'entry-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'education': {
          const section = findSection(document.sections, 'education')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'education-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'skills': {
          const section = findSection(document.sections, 'skills')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'skills-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'languages': {
          const section = findSection(document.sections, 'languages')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'languages-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'certifications': {
          const section = findSection(document.sections, 'certifications')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'certifications-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'awards': {
          const section = findSection(document.sections, 'awards')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'awards-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'publications': {
          const section = findSection(document.sections, 'publications')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'publications-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        case 'custom': {
          const section = findSection(document.sections, 'custom')

          if (!section || section.visible === false) {
            return null
          }

          return {
            type: 'custom-section',
            title: block.title ?? section.title ?? toTitle(section.kind),
            section,
            variant: block.variant,
          }
        }
        default:
          return null
      }
    }
    case 'divider':
      return { type: 'divider' }
    case 'spacer':
      return { type: 'spacer', size: block.size }
    case 'text':
      return {
        type: 'text',
        content: block.content,
        style: block.style,
        align: block.align,
      }
    case 'group':
      return {
        type: 'group',
        layout: block.layout,
        gap: block.gap,
        children: resolveBlocks(block.children, document),
      }
    default:
      return null
  }
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
      return section.items.length
    case 'education':
      return section.items.length
    case 'skills':
      return section.groups.reduce(
        (count, group) => count + group.items.length,
        0,
      )
    case 'certifications':
      return section.items.length
    case 'awards':
      return section.items.length
    case 'languages':
      return section.items.length
    case 'publications':
      return section.items.length
    case 'custom':
      return section.blocks.length
    default:
      return 0
  }
}

function findSection<TKind extends ResumeSection['kind']>(
  sections: ResumeSection[],
  kind: TKind,
) {
  return sections.find((section) => section.kind === kind) as
    | Extract<ResumeSection, { kind: TKind }>
    | undefined
}

function toTitle(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
