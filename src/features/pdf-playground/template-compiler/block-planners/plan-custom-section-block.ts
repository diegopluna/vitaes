import type { CustomBlock } from '../../../../../convex/shared/resume'
import type { ResolvedTemplateBlock } from '../resolved-template-document'
import type { RenderNode } from '../render-ir'
import { createSectionHeading } from '../planner-utils'
import { planEntry } from './plan-entry-section-block'

export function planCustomSectionBlock(
  block: Extract<ResolvedTemplateBlock, { type: 'custom-section' }>,
): RenderNode {
  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead: 36,
    children: [
      createSectionHeading(block.title),
      {
        type: 'view',
        style: [block.variant === 'compact' ? 'compactList' : 'entryList'],
        children: block.section.blocks.flatMap((customBlock) =>
          planCustomBlock(customBlock, block.variant),
        ),
      },
    ],
  }
}

function planCustomBlock(
  customBlock: CustomBlock,
  variant: 'stacked' | 'compact',
): RenderNode[] {
  switch (customBlock.type) {
    case 'text':
      return [
        {
          type: 'view',
          style: ['entryCard'],
          children: [
            ...(customBlock.title
              ? [
                  {
                    type: 'text' as const,
                    style: ['entryTitle'],
                    text: customBlock.title,
                  },
                ]
              : []),
            {
              type: 'text',
              style: [variant === 'compact' ? 'compactText' : 'bodyText'],
              text: customBlock.content,
            },
          ],
        },
      ]
    case 'list':
      return [
        {
          type: 'view',
          style: ['entryCard'],
          children: [
            ...(customBlock.title
              ? [
                  {
                    type: 'text' as const,
                    style: ['entryTitle'],
                    text: customBlock.title,
                  },
                ]
              : []),
            ...customBlock.items.map((item) => ({
              type: 'text' as const,
              style: ['compactText'],
              text: `• ${item}`,
            })),
          ],
        },
      ]
    case 'entries':
      return [
        {
          type: 'view',
          style: ['entryList'],
          children: customBlock.items.map((item) => planEntry(item, 'stacked')),
        },
      ]
    default:
      return assertNever(customBlock)
  }
}

function assertNever(value: never): never {
  throw new Error(
    `Unexpected custom block planner value: ${JSON.stringify(value)}`,
  )
}
