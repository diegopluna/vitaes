import type { TemplateBasicsBlock } from '../../../../../convex/shared/template'
import type { RenderNode } from '../render-ir'
import type { ResolvedTemplateDocument } from '../resolved-template-document'
import { alignStyle, basicsContainerStyle, styleValues } from '../planner-utils'

export function planBasicsBlock(
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
