import type { Style } from '@react-pdf/types'

import type {
  TemplateBasicsBlock,
  TemplateTextStyleRef,
} from '../../../../convex/shared/template'
import type { RenderNode, RenderStyleValue } from './render-ir'

export function createSectionHeading(title: string): RenderNode {
  return {
    type: 'view',
    style: ['sectionHeading'],
    minPresenceAhead: 24,
    children: [
      {
        type: 'text',
        style: ['sectionTitle'],
        text: title,
      },
      {
        type: 'divider',
        style: ['sectionRule'],
      },
    ],
  }
}

export function createSimpleEntrySection({
  title,
  minPresenceAhead,
  containerStyle,
  items,
}: {
  title: string
  minPresenceAhead: number
  containerStyle: string
  items: Array<{
    title: string
    meta?: string
    secondary?: string
    body?: string
    compact: boolean
  }>
}): RenderNode {
  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead,
    children: [
      createSectionHeading(title),
      {
        type: 'view',
        style: [containerStyle],
        children: items.map((item) => ({
          type: 'view',
          style: [item.compact ? 'entryCompact' : 'entryCard'],
          children: [
            {
              type: 'view',
              style: ['entryHeader'],
              children: [
                {
                  type: 'text',
                  style: ['entryTitle'],
                  text: item.title,
                },
                ...(item.meta
                  ? [
                      {
                        type: 'text' as const,
                        style: ['entryMeta'],
                        text: item.meta,
                      },
                    ]
                  : []),
              ],
            },
            ...(item.secondary
              ? [
                  {
                    type: 'text' as const,
                    style: ['entryOrganization'],
                    text: item.secondary,
                  },
                ]
              : []),
            ...(item.body
              ? [
                  {
                    type: 'text' as const,
                    style: [item.compact ? 'compactText' : 'bodyText'],
                    text: item.body,
                  },
                ]
              : []),
          ],
        })),
      },
    ],
  }
}

export function styleRefForTextStyle(style?: TemplateTextStyleRef) {
  switch (style) {
    case 'muted':
      return 'mutedText'
    case 'heading':
    case 'sectionTitle':
      return 'sectionTitle'
    case 'meta':
      return 'entryMeta'
    case 'body':
    default:
      return 'bodyText'
  }
}

export function basicsContainerStyle(variant: TemplateBasicsBlock['variant']) {
  switch (variant) {
    case 'hero':
      return 'basicsHero'
    case 'compact':
      return 'basicsCompact'
    case 'sidebar':
      return 'basicsSidebar'
    default:
      return 'basicsSplit'
  }
}

export function alignStyle(
  align: TemplateBasicsBlock['align'],
): RenderStyleValue | undefined {
  if (!align) {
    return undefined
  }

  return {
    textAlign: align,
    alignItems: alignToFlex(align),
  } as Style
}

export function styleValues(
  ...values: Array<RenderStyleValue | false | null | undefined>
): RenderStyleValue[] {
  return values.filter(
    (value): value is RenderStyleValue => value != null && value !== false,
  )
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected render planner value: ${JSON.stringify(value)}`)
}

function alignToFlex(align: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'center'
    case 'right':
      return 'flex-end'
    default:
      return 'flex-start'
  }
}
