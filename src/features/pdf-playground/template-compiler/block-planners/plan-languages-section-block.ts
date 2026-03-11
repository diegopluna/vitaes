import type { ResolvedTemplateBlock } from '../resolved-template-document'
import type { RenderNode } from '../render-ir'
import { createSectionHeading, styleValues } from '../planner-utils'

export function planLanguagesSectionBlock(
  block: Extract<ResolvedTemplateBlock, { type: 'languages-section' }>,
): RenderNode {
  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead: 32,
    children: [
      createSectionHeading(block.title),
      block.variant === 'badges'
        ? {
            type: 'view',
            style: ['badgeWrap'],
            children: block.section.items.map((item, index) => ({
              type: 'text',
              style: styleValues(
                'badgeChip',
                index !== block.section.items.length - 1 && 'inlineChipSpacing',
              ),
              text: item.proficiency
                ? `${item.name} · ${item.proficiency}`
                : item.name,
            })),
          }
        : {
            type: 'view',
            style: [
              block.variant === 'compact-list' ? 'compactList' : 'languageList',
            ],
            children: block.section.items.map((item, index) => ({
              type: 'view',
              style: styleValues(
                'languageRow',
                index !== block.section.items.length - 1 && 'rowSpacing',
              ),
              children: [
                {
                  type: 'text',
                  style: ['bodyText'],
                  text: item.name,
                },
                ...(item.proficiency
                  ? [
                      {
                        type: 'text' as const,
                        style: ['entryMeta'],
                        text: item.proficiency,
                      },
                    ]
                  : []),
              ],
            })),
          },
    ],
  }
}
