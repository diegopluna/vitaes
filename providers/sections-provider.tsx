'use client'

import {
  IconAt,
  IconBriefcase,
  IconMedal,
  IconNotes,
  IconPencil,
  IconPresentation,
  IconUser,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { createContext, type JSX, use, useRef } from 'react'
import { HonorsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/honors-form'
import { PersonalForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/personal-form'
import { PresentationsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/presentations-form'
import { ProfileForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/profile-form'
import { SummaryForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/summary-form'
import { WorkForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/work-form'
import { WritingsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/writings-form'
import { HonorSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/honor-sheet'
import { PresentationSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/presentation-sheet'
import { ProfileSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/profile-sheet'
import { WorkSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/work-sheet'
import { WritingSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/writing-sheet'
import { useResumeStore } from './resume-store-provider'

export type Section = {
  id: string
  title: string
  icon: React.ExoticComponent
  form: JSX.Element
  sheet?: JSX.Element
}

type SectionsContextProps = {
  sections: Section[]
  sectionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>
  setSectionRef: (id: string, ref: HTMLDivElement | null) => void
}

const SectionsContext = createContext<SectionsContextProps | undefined>(
  undefined,
)

type SectionsProviderProps = {
  children: React.ReactNode
}

export const SectionsProvider = ({ children }: SectionsProviderProps) => {
  const t = useTranslations('sections')
  const { resume } = useResumeStore((s) => s)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const setSectionRef = (id: string, ref: HTMLDivElement | null) => {
    sectionRefs.current[id] = ref
  }

  const sections: Section[] = [
    {
      id: 'personal',
      title: t('personal'),
      icon: IconUser,
      form: <PersonalForm />,
    },
    {
      id: 'summary',
      title: resume.basics.summary.label,
      icon: IconNotes,
      form: <SummaryForm />,
    },
    {
      id: 'profiles',
      title: t('profiles'),
      icon: IconAt,
      form: <ProfileForm />,
      sheet: <ProfileSheet />,
    },
    {
      id: 'work',
      title: resume.work.label,
      icon: IconBriefcase,
      form: <WorkForm />,
      sheet: <WorkSheet />,
    },
    {
      id: 'honors',
      title: resume.honors.label,
      icon: IconMedal,
      form: <HonorsForm />,
      sheet: <HonorSheet />,
    },
    {
      id: 'presentation',
      title: resume.presentations.label,
      icon: IconPresentation,
      form: <PresentationsForm />,
      sheet: <PresentationSheet />,
    },
    {
      id: 'writing',
      title: resume.writings.label,
      icon: IconPencil,
      form: <WritingsForm />,
      sheet: <WritingSheet />,
    },
  ]

  return (
    <SectionsContext value={{ sections, sectionRefs, setSectionRef }}>
      {children}
    </SectionsContext>
  )
}

export const useSections = () => {
  const context = use(SectionsContext)

  if (!context) {
    throw new Error('useSections must be used within a SectionsProvider')
  }

  return context
}
