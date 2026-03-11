import type { ResolvedTemplateBlock } from '../resolved-template-document'
import type { RenderNode } from '../render-ir'
import { createSectionHeading, styleValues } from '../planner-utils'

export function planSkillsSectionBlock(
  block: Extract<ResolvedTemplateBlock, { type: 'skills-section' }>,
): RenderNode {
  const flatItems = block.section.groups.flatMap((group) => group.items)

  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead: 40,
    children: [
      createSectionHeading(block.title),
      block.variant === 'badges'
        ? {
            type: 'view',
            style: ['badgeWrap'],
            children: flatItems.map((item, index) => ({
              type: 'text',
              style: styleValues(
                'badgeChip',
                index !== flatItems.length - 1 && 'inlineChipSpacing',
              ),
              text: item,
            })),
          }
        : block.variant === 'compact-list'
          ? {
              type: 'view',
              style: ['compactList'],
              children: block.section.groups.map((group) => ({
                type: 'text',
                style: ['compactText'],
                segments: [
                  { text: `${group.name}: `, style: ['compactLabel'] },
                  { text: group.items.join(', ') },
                ],
              })),
            }
          : {
              type: 'view',
              style: ['skillGroups'],
              children: block.section.groups.map((group, index) => ({
                type: 'view',
                style: styleValues(
                  'skillGroup',
                  index !== block.section.groups.length - 1 && 'groupSpacing',
                ),
                children: [
                  {
                    type: 'text',
                    style: ['skillGroupName'],
                    text: group.name,
                  },
                  ...group.items.map((item) => ({
                    type: 'text' as const,
                    style: ['skillItem'],
                    text: item,
                  })),
                ],
              })),
            },
    ],
  }
}
