import type { ResumeDocument } from '@vitaes/backend/convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateBlock,
  TemplateSectionBlock,
} from '@vitaes/backend/convex/shared/template'

export type RegionKey = 'header' | 'sidebar' | 'main' | 'footer'

export type SelectedBlockLocation = {
  region: RegionKey
  index: number
}

export type InspectorView = 'summary' | 'resolved' | 'compiled'

export const REGION_KEYS: RegionKey[] = ['header', 'sidebar', 'main', 'footer']
export const PAGE_SIZE_OPTIONS = ['A4', 'LETTER'] as const
export const DENSITY_OPTIONS = ['compact', 'comfortable', 'airy'] as const
export const TEXT_STYLE_OPTIONS = [
  'body',
  'muted',
  'heading',
  'sectionTitle',
  'meta',
] as const
export const ALIGN_OPTIONS = ['left', 'center', 'right'] as const

export function createTemplateDraft(template: ResumeTemplateDefinition) {
  return structuredClone(template)
}

export function resetTemplateDraft(template: ResumeTemplateDefinition) {
  return createTemplateDraft(template)
}

export function buildEffectiveDocument(
  document: ResumeDocument,
  visibilityOverrides: Record<string, boolean>,
): ResumeDocument {
  return {
    ...document,
    sections: document.sections.map((section) => ({
      ...section,
      visible: visibilityOverrides[section.id] ?? section.visible ?? true,
    })),
  }
}

export function getRegionBlocks(
  template: ResumeTemplateDefinition,
  region: RegionKey,
): TemplateBlock[] {
  return template.regions[region] ?? []
}

export function updateRegionBlock(
  template: ResumeTemplateDefinition,
  region: RegionKey,
  index: number,
  updater: (block: TemplateBlock) => TemplateBlock,
): ResumeTemplateDefinition {
  const blocks = [...getRegionBlocks(template, region)]
  const block = blocks[index]

  if (!block) {
    return template
  }

  blocks[index] = updater(block)

  return {
    ...template,
    regions: {
      ...template.regions,
      [region]: blocks,
    },
  }
}

export function moveRegionBlock(
  template: ResumeTemplateDefinition,
  region: RegionKey,
  index: number,
  direction: 'up' | 'down',
): {
  template: ResumeTemplateDefinition
  nextLocation: SelectedBlockLocation | null
} {
  const blocks = [...getRegionBlocks(template, region)]
  const targetIndex = direction === 'up' ? index - 1 : index + 1

  if (!blocks[index] || !blocks[targetIndex]) {
    return { template, nextLocation: null }
  }

  ;[blocks[index], blocks[targetIndex]] = [blocks[targetIndex], blocks[index]]

  return {
    template: {
      ...template,
      regions: {
        ...template.regions,
        [region]: blocks,
      },
    },
    nextLocation: {
      region,
      index: targetIndex,
    },
  }
}

export function getSelectedDraftBlock(
  template: ResumeTemplateDefinition,
  location: SelectedBlockLocation | null,
) {
  if (!location) {
    return null
  }

  return getRegionBlocks(template, location.region)[location.index] ?? null
}

export function getVisibleSectionCount(document: ResumeDocument) {
  return document.sections.filter((section) => section.visible !== false).length
}

export function getSupportedSectionKinds(
  template: ResumeTemplateDefinition,
): string[] {
  return Array.from(
    new Set(
      template.regions.main
        .concat(template.regions.sidebar ?? [])
        .filter(
          (block): block is TemplateSectionBlock => block.type === 'section',
        )
        .map((block) => block.section),
    ),
  )
}

export function getBlockLabel(block: TemplateBlock) {
  switch (block.type) {
    case 'basics':
      return 'Basics'
    case 'summary':
      return block.title || 'Summary'
    case 'section':
      return block.title || block.section
    case 'divider':
      return 'Divider'
    case 'spacer':
      return 'Spacer'
    case 'text':
      return block.content.slice(0, 36) || 'Text'
    case 'group':
      return 'Group'
    default:
      return 'Block'
  }
}

export function getBlockMeta(block: TemplateBlock) {
  switch (block.type) {
    case 'basics':
      return `${block.type} · ${block.variant}`
    case 'summary':
      return `${block.type} · ${block.variant}`
    case 'section':
      return `${block.section} · ${block.variant}`
    case 'text':
      return `${block.type} · ${block.style ?? 'body'}`
    case 'group':
      return `${block.type} · ${block.layout}`
    case 'spacer':
      return `${block.type} · ${block.size}`
    default:
      return block.type
  }
}

export function hasVariant(
  block: TemplateBlock,
): block is Extract<TemplateBlock, { variant: string }> {
  return 'variant' in block
}

export function getVariantOptions(block: TemplateBlock) {
  if (!hasVariant(block)) {
    return []
  }

  switch (block.type) {
    case 'basics':
      return ['hero', 'compact', 'split', 'sidebar']
    case 'summary':
      return ['paragraph', 'compact', 'highlight']
    case 'section':
      switch (block.section) {
        case 'experience':
        case 'projects':
        case 'volunteering':
          return ['timeline', 'stacked', 'compact-list', 'cards']
        case 'education':
          return ['stacked', 'compact-list']
        case 'skills':
          return ['badges', 'groups', 'compact-list']
        case 'languages':
          return ['list', 'badges', 'compact-list']
        case 'certifications':
        case 'awards':
        case 'publications':
          return ['list', 'compact-list']
        case 'custom':
          return ['stacked', 'compact']
      }
  }
}

export function setBlockVariant(
  block: TemplateBlock,
  value: string,
): TemplateBlock {
  switch (block.type) {
    case 'basics':
      return {
        ...block,
        variant: value as (typeof block)['variant'],
      }
    case 'summary':
      return {
        ...block,
        variant: value as (typeof block)['variant'],
      }
    case 'section':
      switch (block.section) {
        case 'experience':
        case 'projects':
        case 'volunteering':
          return {
            ...block,
            variant: value as 'timeline' | 'stacked' | 'compact-list' | 'cards',
          }
        case 'education':
          return {
            ...block,
            variant: value as 'stacked' | 'compact-list',
          }
        case 'skills':
          return {
            ...block,
            variant: value as 'badges' | 'groups' | 'compact-list',
          }
        case 'languages':
          return {
            ...block,
            variant: value as 'list' | 'badges' | 'compact-list',
          }
        case 'certifications':
        case 'awards':
        case 'publications':
          return {
            ...block,
            variant: value as 'list' | 'compact-list',
          }
        case 'custom':
          return {
            ...block,
            variant: value as 'stacked' | 'compact',
          }
        default:
          return block
      }
    default:
      return block
  }
}
