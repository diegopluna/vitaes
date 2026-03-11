import type { ResolvedTemplateBlock } from '../resolved-template-document'
import type { RenderNode } from '../render-ir'
import { createSectionHeading } from '../planner-utils'

export function planEducationSectionBlock(
  block: Extract<ResolvedTemplateBlock, { type: 'education-section' }>,
): RenderNode {
  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead: 40,
    children: [
      createSectionHeading(block.title),
      {
        type: 'view',
        style: ['entryList'],
        children: block.section.items.map((item) => ({
          type: 'view',
          style: [
            block.variant === 'compact-list' ? 'entryCompact' : 'entryCard',
          ],
          children: [
            {
              type: 'view',
              style: ['entryHeader'],
              children: [
                {
                  type: 'view',
                  style: ['entryHeading'],
                  children: [
                    {
                      type: 'text',
                      style: ['entryTitle'],
                      text: item.institution,
                    },
                    {
                      type: 'text',
                      style: ['entryOrganization'],
                      text: [item.studyType, item.area]
                        .filter(Boolean)
                        .join(', '),
                    },
                  ],
                },
                ...(item.dateRange?.display
                  ? [
                      {
                        type: 'text' as const,
                        style: ['entryMeta'],
                        text: item.dateRange.display,
                      },
                    ]
                  : []),
              ],
            },
            ...(item.location
              ? [
                  {
                    type: 'text' as const,
                    style: ['entrySubtitle'],
                    text: item.location,
                  },
                ]
              : []),
            ...(item.summary
              ? [
                  {
                    type: 'text' as const,
                    style: [
                      block.variant === 'compact-list'
                        ? 'compactText'
                        : 'bodyText',
                    ],
                    text: item.summary,
                  },
                ]
              : []),
          ],
        })),
      },
    ],
  }
}
