import type { Style } from '@react-pdf/types'

import type {
  CustomBlock,
  GenericEntry,
} from '../../../../convex/shared/resume'
import type {
  TemplateBasicsBlock,
  TemplateTextStyleRef,
} from '../../../../convex/shared/template'
import type {
  PlannedRenderDocument,
  RenderNode,
  RenderStyleValue,
} from './render-ir'
import type {
  ResolvedTemplateBlock,
  ResolvedTemplateDocument,
} from './resolved-template-document'

export function planRenderDocument(
  resolvedDocument: ResolvedTemplateDocument,
): PlannedRenderDocument {
  return {
    title: resolvedDocument.title,
    template: resolvedDocument.template,
    regions: {
      header: planBlocks(resolvedDocument.regions.header, resolvedDocument),
      sidebar: planBlocks(resolvedDocument.regions.sidebar, resolvedDocument),
      main: planBlocks(resolvedDocument.regions.main, resolvedDocument),
      footer: planBlocks(resolvedDocument.regions.footer, resolvedDocument),
    },
  }
}

function planBlocks(
  blocks: ResolvedTemplateBlock[],
  resolvedDocument: ResolvedTemplateDocument,
): RenderNode[] {
  return blocks.map((block) => planBlock(block, resolvedDocument))
}

function planBlock(
  block: ResolvedTemplateBlock,
  resolvedDocument: ResolvedTemplateDocument,
): RenderNode {
  switch (block.type) {
    case 'basics':
      return planBasics(block.block, resolvedDocument)
    case 'summary':
      return {
        type: 'view',
        style: styleValues(
          'section',
          block.variant === 'highlight' && 'highlightPanel',
        ),
        minPresenceAhead: 36,
        children: [
          createSectionHeading(block.title),
          {
            type: 'text',
            style: [block.variant === 'compact' ? 'compactText' : 'bodyText'],
            text: block.content,
          },
        ],
      }
    case 'entry-section':
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
    case 'education-section':
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
    case 'skills-section': {
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
                      index !== block.section.groups.length - 1 &&
                        'groupSpacing',
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
    case 'languages-section':
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
                    index !== block.section.items.length - 1 &&
                      'inlineChipSpacing',
                  ),
                  text: item.proficiency
                    ? `${item.name} · ${item.proficiency}`
                    : item.name,
                })),
              }
            : {
                type: 'view',
                style: [
                  block.variant === 'compact-list'
                    ? 'compactList'
                    : 'languageList',
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
    case 'certifications-section':
      return createSimpleEntrySection({
        title: block.title,
        minPresenceAhead: 36,
        containerStyle:
          block.variant === 'compact-list' ? 'compactList' : 'entryList',
        items: block.section.items.map((item) => ({
          title: item.name,
          meta: item.dateRange?.display,
          secondary: item.issuer,
          body: item.summary,
          compact: block.variant === 'compact-list',
        })),
      })
    case 'awards-section':
      return createSimpleEntrySection({
        title: block.title,
        minPresenceAhead: 36,
        containerStyle:
          block.variant === 'compact-list' ? 'compactList' : 'entryList',
        items: block.section.items.map((item) => ({
          title: item.title,
          meta: item.date,
          secondary: item.issuer,
          body: item.summary,
          compact: block.variant === 'compact-list',
        })),
      })
    case 'publications-section':
      return createSimpleEntrySection({
        title: block.title,
        minPresenceAhead: 36,
        containerStyle:
          block.variant === 'compact-list' ? 'compactList' : 'entryList',
        items: block.section.items.map((item) => ({
          title: item.title,
          meta: item.date,
          secondary: item.publisher,
          body: item.summary,
          compact: block.variant === 'compact-list',
        })),
      })
    case 'custom-section':
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
    case 'divider':
      return { type: 'divider', style: ['divider'] }
    case 'spacer':
      return { type: 'spacer', size: block.size }
    case 'text':
      return {
        type: 'text',
        style: styleValues(
          styleRefForTextStyle(block.style),
          alignStyle(block.align),
        ),
        text: block.content,
      }
    case 'group':
      return {
        type: 'view',
        style: [
          {
            flexDirection: block.layout === 'row' ? 'row' : 'column',
            gap: block.gap ?? resolvedDocument.template.theme.spacing.md,
          } as Style,
        ],
        children: planBlocks(block.children, resolvedDocument),
      }
    default:
      return assertNever(block)
  }
}

function planBasics(
  block: TemplateBasicsBlock,
  resolvedDocument: ResolvedTemplateDocument,
): RenderNode {
  const basics = resolvedDocument.basics
  const hasProfiles =
    block.showProfiles !== false && resolvedDocument.basics.profiles.length > 0
  const hasContacts = !!basics.location || !!basics.email || !!basics.phone

  const metaChildren: RenderNode[] = [
    ...(basics.location
      ? [{ type: 'text' as const, style: ['metaText'], text: basics.location }]
      : []),
    ...(basics.email
      ? [{ type: 'text' as const, style: ['metaText'], text: basics.email }]
      : []),
    ...(basics.phone
      ? [{ type: 'text' as const, style: ['metaText'], text: basics.phone }]
      : []),
    ...(hasProfiles
      ? [
          {
            type: 'view' as const,
            style: styleValues(
              'profileRow',
              block.variant === 'hero' && 'profileRowHero',
              block.variant === 'sidebar' && 'profileRowSidebar',
            ),
            children: basics.profiles.map((profile) =>
              profile.url
                ? ({
                    type: 'link',
                    style: ['profileLink'],
                    href: profile.url,
                    text: profile.label,
                  } satisfies RenderNode)
                : ({
                    type: 'text',
                    style: ['metaText'],
                    text: profile.label,
                  } satisfies RenderNode),
            ),
          } satisfies RenderNode,
        ]
      : []),
  ]

  return {
    type: 'view',
    style: styleValues(
      basicsContainerStyle(block.variant),
      block.align && alignStyle(block.align),
    ),
    children: [
      {
        type: 'view',
        style: ['basicsHeading'],
        children: [
          {
            type: 'text',
            style: ['name'],
            text: basics.fullName,
          },
          ...(block.showHeadline !== false && basics.headline
            ? [
                {
                  type: 'text' as const,
                  style: ['headline'],
                  text: basics.headline,
                },
              ]
            : []),
        ],
      },
      ...(hasContacts || hasProfiles
        ? [
            {
              type: 'view' as const,
              style: styleValues(
                'basicsMeta',
                block.variant === 'hero' && 'basicsMetaHero',
                block.variant === 'sidebar' && 'basicsMetaSidebar',
              ),
              children: metaChildren,
            },
          ]
        : []),
    ],
  }
}

function planEntry(
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

function createSectionHeading(title: string): RenderNode {
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

function createSimpleEntrySection({
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

function styleRefForTextStyle(style?: TemplateTextStyleRef) {
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

function basicsContainerStyle(variant: TemplateBasicsBlock['variant']) {
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

function alignStyle(
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

function styleValues(
  ...values: Array<RenderStyleValue | false | null | undefined>
): RenderStyleValue[] {
  return values.filter(
    (value): value is RenderStyleValue => value != null && value !== false,
  )
}

function assertNever(value: never): never {
  throw new Error(`Unexpected render planner value: ${JSON.stringify(value)}`)
}
