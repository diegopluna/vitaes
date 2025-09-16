'use client'

import {
  IconAt,
  IconBriefcase,
  IconFileCheck,
  IconLanguage,
  IconMedal,
  IconNotes,
  IconPencil,
  IconPresentation,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react'
import { GraduationCap, NotebookPen, PencilRuler } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { createContext, type JSX, use, useRef } from 'react'
import { CertificateForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/certificate-form'
import { ComitteeForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/committee-form'
import { EducationForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/education-form'
import { ExtracurricularForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/extracurricular-form'
import { HonorsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/honors-form'
import { LanguageForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/language-form'
import { PersonalForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/personal-form'
import { PresentationsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/presentations-form'
import { ProfileForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/profile-form'
import { ProjectForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/project-form'
import { SummaryForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/summary-form'
import { WorkForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/work-form'
import { WritingsForm } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/form/writings-form'
import { CertificateSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/certificate-sheet'
import { ComitteeSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/committee-sheet'
import { EducationSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/education-sheet'
import { ExtracurricularSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/extracurricular-sheet'
import { HonorSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/honor-sheet'
import { LanguageSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/language-sheet'
import { PresentationSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/presentation-sheet'
import { ProfileSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/profile-sheet'
import { ProjectSheet } from '@/app/(auth)/(user)/builder/[resumeId]/_components/resume/sheet/project-sheet'
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
    {
      id: 'comittees',
      title: resume.committees.label,
      icon: IconUsersGroup,
      form: <ComitteeForm />,
      sheet: <ComitteeSheet />,
    },
    {
      id: 'education',
      title: resume.education.label,
      icon: GraduationCap,
      form: <EducationForm />,
      sheet: <EducationSheet />,
    },
    {
      id: 'extracurriculars',
      title: resume.extracurriculars.label,
      icon: NotebookPen,
      form: <ExtracurricularForm />,
      sheet: <ExtracurricularSheet />,
    },
    {
      id: 'projects',
      title: resume.projects.label,
      icon: PencilRuler,
      form: <ProjectForm />,
      sheet: <ProjectSheet />,
    },
    {
      id: 'languages',
      title: resume.languages.label,
      icon: IconLanguage,
      form: <LanguageForm />,
      sheet: <LanguageSheet />,
    },
    {
      id: 'certificates',
      title: resume.certificates.label,
      icon: IconFileCheck,
      form: <CertificateForm />,
      sheet: <CertificateSheet />,
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
