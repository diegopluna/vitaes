import type { PlannedRenderDocument, RenderNode } from './render-ir'
import { planBasicsBlock } from './block-planners/plan-basics-block'
import { planCustomSectionBlock } from './block-planners/plan-custom-section-block'
import { planEducationSectionBlock } from './block-planners/plan-education-section-block'
import {
  planAwardsSectionBlock,
  planCertificationsSectionBlock,
  planEntrySectionBlock,
  planPublicationsSectionBlock,
} from './block-planners/plan-entry-section-block'
import { planLanguagesSectionBlock } from './block-planners/plan-languages-section-block'
import { planSkillsSectionBlock } from './block-planners/plan-skills-section-block'
import {
  alignStyle,
  assertNever,
  createSectionHeading,
  styleRefForTextStyle,
  styleValues,
} from './planner-utils'
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
      return planBasicsBlock(block.block, resolvedDocument)
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
      return planEntrySectionBlock(block)
    case 'education-section':
      return planEducationSectionBlock(block)
    case 'skills-section':
      return planSkillsSectionBlock(block)
    case 'languages-section':
      return planLanguagesSectionBlock(block)
    case 'certifications-section':
      return planCertificationsSectionBlock(block)
    case 'awards-section':
      return planAwardsSectionBlock(block)
    case 'publications-section':
      return planPublicationsSectionBlock(block)
    case 'custom-section':
      return planCustomSectionBlock(block)
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
          },
        ],
        children: planBlocks(block.children, resolvedDocument),
      }
    default:
      return assertNever(block)
  }
}
