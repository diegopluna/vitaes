import type {
  AwardsSection,
  CertificationsSection,
  GenericEntry,
  PublicationsSection,
} from '@vitaes/backend/convex/shared/resume'
import type { ResolvedTemplateBlock } from '../resolved-template-document'
import type { RenderNode } from '../render-ir'
import {
  createSectionHeading,
  createSimpleEntrySection,
  styleValues,
} from '../planner-utils'

export function planEntrySectionBlock(
  block: Extract<ResolvedTemplateBlock, { type: 'entry-section' }>,
): RenderNode {
  return {
    type: 'view',
    style: ['section'],
    minPresenceAhead: 48,
    children: [
      createSectionHeading(block.title),
      {
        type: 'view',
        style: ['entryList'],
        children: block.section.items.map((item) =>
          planEntry(item, block.variant),
        ),
      },
    ],
  }
}

export function planCertificationsSectionBlock({
  title,
  section,
  variant,
}: {
  title: string
  section: CertificationsSection
  variant: 'list' | 'compact-list'
}): RenderNode {
  return createSimpleEntrySection({
    title,
    minPresenceAhead: 36,
    containerStyle: variant === 'compact-list' ? 'compactList' : 'entryList',
    items: section.items.map((item) => ({
      title: item.name,
      meta: item.dateRange?.display,
      secondary: item.issuer,
      body: item.summary,
      compact: variant === 'compact-list',
    })),
  })
}

export function planAwardsSectionBlock({
  title,
  section,
  variant,
}: {
  title: string
  section: AwardsSection
  variant: 'list' | 'compact-list'
}): RenderNode {
  return createSimpleEntrySection({
    title,
    minPresenceAhead: 36,
    containerStyle: variant === 'compact-list' ? 'compactList' : 'entryList',
    items: section.items.map((item) => ({
      title: item.title,
      meta: item.date,
      secondary: item.issuer,
      body: item.summary,
      compact: variant === 'compact-list',
    })),
  })
}

export function planPublicationsSectionBlock({
  title,
  section,
  variant,
}: {
  title: string
  section: PublicationsSection
  variant: 'list' | 'compact-list'
}): RenderNode {
  return createSimpleEntrySection({
    title,
    minPresenceAhead: 36,
    containerStyle: variant === 'compact-list' ? 'compactList' : 'entryList',
    items: section.items.map((item) => ({
      title: item.title,
      meta: item.date,
      secondary: item.publisher,
      body: item.summary,
      compact: variant === 'compact-list',
    })),
  })
}

export function planEntry(
  item: GenericEntry,
  variant: 'timeline' | 'stacked' | 'compact-list' | 'cards',
): RenderNode {
  if (variant === 'compact-list') {
    return {
      type: 'view',
      style: ['entryCompact'],
      children: [
        {
          type: 'view',
          style: ['entryCompactHeader'],
          children: [
            {
              type: 'text',
              style: ['entryCompactTitle'],
              text: [item.title, item.organization].filter(Boolean).join(', '),
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
        ...(item.summary
          ? [
              {
                type: 'text' as const,
                style: ['compactText'],
                text: item.summary,
              },
            ]
          : []),
      ],
    }
  }

  return {
    type: 'view',
    wrap: variant !== 'cards',
    style: styleValues(
      'entryCard',
      variant === 'cards' && 'entryCardSurface',
      variant === 'timeline' && 'entryTimeline',
    ),
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
                text: item.title,
              },
              ...(item.organization
                ? [
                    {
                      type: 'text' as const,
                      style: ['entryOrganization'],
                      text: item.organization,
                    },
                  ]
                : []),
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
      ...(item.subtitle || item.location
        ? [
            {
              type: 'text' as const,
              style: ['entrySubtitle'],
              text: [item.subtitle, item.location].filter(Boolean).join(' · '),
            },
          ]
        : []),
      ...(item.summary
        ? [{ type: 'text' as const, style: ['bodyText'], text: item.summary }]
        : []),
      ...(item.highlights.length > 0
        ? [
            {
              type: 'view' as const,
              style: ['bulletList'],
              children: item.highlights.map(
                (highlight, index) =>
                  ({
                    type: 'view',
                    style: styleValues(
                      'bulletRow',
                      index !== item.highlights.length - 1 &&
                        'bulletRowSpacing',
                    ),
                    children: [
                      {
                        type: 'text',
                        style: ['bullet'],
                        text: '•',
                      },
                      {
                        type: 'text',
                        style: ['bodyText'],
                        text: highlight,
                      },
                    ],
                  }) satisfies RenderNode,
              ),
            },
          ]
        : []),
      ...(item.tags.length > 0
        ? [
            {
              type: 'view' as const,
              style: ['tagRow'],
              children: item.tags.map(
                (tag, index) =>
                  ({
                    type: 'text',
                    style: styleValues(
                      'tagChip',
                      index !== item.tags.length - 1 && 'inlineChipSpacing',
                    ),
                    text: tag,
                  }) satisfies RenderNode,
              ),
            },
          ]
        : []),
    ],
  }
}
