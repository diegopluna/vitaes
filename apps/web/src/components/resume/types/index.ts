// ============================================================================
// Social Profile Types

import type { AwesomeColor } from '../colors'

// ============================================================================
export type SocialPlatform =
  | 'mobile'
  | 'email'
  | 'homepage'
  | 'github'
  | 'gitlab'
  | 'linkedin'
  | 'twitter'
  | 'stackoverflow'
  | 'skype'
  | 'reddit'
  | 'xing'
  | 'medium'
  | 'googlescholar'

export interface SocialProfile {
  id: string
  platform: SocialPlatform
  value: string
  display?: string // Optional custom display text
  url?: string // Optional custom URL
}

// ============================================================================
// Personal Information
// ============================================================================
export interface PersonalInfo {
  firstName: string
  lastName: string
  position: string
  address: string
  socials: SocialProfile[]
  quote?: string
  photo?: string
  photoShape?: 'circle' | 'rectangle'
  photoEdge?: 'edge' | 'noedge'
  photoAlign?: 'left' | 'right'
}

// ============================================================================
// Section Item Types
// ============================================================================
export interface BaseItem {
  id: string
}

export interface EntryItem extends BaseItem {
  position: string
  title: string
  location: string
  date: string
  description?: string
  items?: string[]
}

export interface HonorItem extends BaseItem {
  date: string
  position: string
  title: string
  location: string
}

export interface SkillItem extends BaseItem {
  type: string
  skills: string[]
}

export interface SubentryItem extends BaseItem {
  position?: string
  title: string
  date: string
  description?: string
}

// ============================================================================
// Section Types
// ============================================================================
export type SectionType =
  | 'paragraph'
  | 'entries'
  | 'honors'
  | 'skills'
  | 'custom'

export interface BaseSection {
  id: string
  title: string
  type: SectionType
}

export interface ParagraphSection extends BaseSection {
  type: 'paragraph'
  content: string
}

export interface EntriesSection extends BaseSection {
  type: 'entries'
  entries: EntryItem[]
}

export interface HonorsSection extends BaseSection {
  type: 'honors'
  subsections?: {
    id: string
    title: string
    honors: HonorItem[]
  }[]
  honors?: HonorItem[]
}

export interface SkillsSection extends BaseSection {
  type: 'skills'
  skills: SkillItem[]
}

export type Section =
  | ParagraphSection
  | EntriesSection
  | HonorsSection
  | SkillsSection

// ============================================================================
// Resume Configuration
// ============================================================================
export interface ResumeConfig {
  themeColor: AwesomeColor
  headerAlign: 'left' | 'center' | 'right'
  sectionColorHighlight: boolean
  fontSize: number
  pageSize: 'A4' | 'LETTER'
  margins: {
    top: string
    right: string
    bottom: string
    left: string
  }
}

// ============================================================================
// Complete Resume Type
// ============================================================================
export interface IResume {
  config: ResumeConfig
  personalInfo: PersonalInfo
  sections: Section[]
}

// ============================================================================
// Type Guards
// ============================================================================
export const isParagraphSection = (
  section: Section,
): section is ParagraphSection => section.type === 'paragraph'

export const isEntriesSection = (section: Section): section is EntriesSection =>
  section.type === 'entries'

export const isHonorsSection = (section: Section): section is HonorsSection =>
  section.type === 'honors'

export const isSkillsSection = (section: Section): section is SkillsSection =>
  section.type === 'skills'
