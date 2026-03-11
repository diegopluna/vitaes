import type {
  AwardsSection,
  CertificationsSection,
  CustomSection,
  EducationSection,
  LanguagesSection,
  ResumeBasics,
  ResumeDocument,
  SkillsSection,
} from '@vitaes/backend/convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateAlign,
  TemplateBasicsBlock,
  TemplateTextStyleRef,
} from '@vitaes/backend/convex/shared/template'

export type ResolvedTemplateDocument = {
  title: string
  template: ResumeTemplateDefinition
  basics: ResumeBasics
  regions: {
    header: ResolvedTemplateBlock[]
    sidebar: ResolvedTemplateBlock[]
    main: ResolvedTemplateBlock[]
    footer: ResolvedTemplateBlock[]
  }
}

export type ResolvedTemplateBlock =
  | {
      type: 'basics'
      block: TemplateBasicsBlock
      basics: ResumeDocument['basics']
    }
  | {
      type: 'summary'
      title: string
      variant: 'paragraph' | 'compact' | 'highlight'
      content: string
    }
  | {
      type: 'entry-section'
      title: string
      section: Extract<
        ResumeDocument['sections'][number],
        { kind: 'experience' | 'projects' | 'volunteering' }
      >
      variant: 'timeline' | 'stacked' | 'compact-list' | 'cards'
    }
  | {
      type: 'education-section'
      title: string
      section: EducationSection
      variant: 'stacked' | 'compact-list'
    }
  | {
      type: 'skills-section'
      title: string
      section: SkillsSection
      variant: 'badges' | 'groups' | 'compact-list'
    }
  | {
      type: 'languages-section'
      title: string
      section: LanguagesSection
      variant: 'list' | 'badges' | 'compact-list'
    }
  | {
      type: 'certifications-section'
      title: string
      section: CertificationsSection
      variant: 'list' | 'compact-list'
    }
  | {
      type: 'awards-section'
      title: string
      section: AwardsSection
      variant: 'list' | 'compact-list'
    }
  | {
      type: 'publications-section'
      title: string
      section: Extract<
        ResumeDocument['sections'][number],
        { kind: 'publications' }
      >
      variant: 'list' | 'compact-list'
    }
  | {
      type: 'custom-section'
      title: string
      section: CustomSection
      variant: 'stacked' | 'compact'
    }
  | { type: 'divider' }
  | { type: 'spacer'; size: number }
  | {
      type: 'text'
      content: string
      style?: TemplateTextStyleRef
      align?: TemplateAlign
    }
  | {
      type: 'group'
      layout: 'stack' | 'row'
      gap?: number
      children: ResolvedTemplateBlock[]
    }
