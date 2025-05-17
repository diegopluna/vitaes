'use client'

import { CertificateForm } from '@/app/[locale]/builder/_components/resume/form/certificate-form'
import { ComitteeForm } from '@/app/[locale]/builder/_components/resume/form/comittees-form'
import { EducationForm } from '@/app/[locale]/builder/_components/resume/form/education-form'
import { ExtracurricularForm } from '@/app/[locale]/builder/_components/resume/form/extracurricular-form'
import { HonorsForm } from '@/app/[locale]/builder/_components/resume/form/honors-form'
import { LanguageForm } from '@/app/[locale]/builder/_components/resume/form/language-form'
import { PersonalForm } from '@/app/[locale]/builder/_components/resume/form/personal-form'
import { PresentationsForm } from '@/app/[locale]/builder/_components/resume/form/presentations-form'
import { ProfileForm } from '@/app/[locale]/builder/_components/resume/form/profile-form'
import { ProjectForm } from '@/app/[locale]/builder/_components/resume/form/project-form'
import { CertificateSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/certificate-sheet'
import { ComitteeSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/comittee-sheet'
import { EducationSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/education-sheet'
import { ExtracurricularSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/extracurricular-sheet'
import { HonorsSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/honors-sheet'
import { LanguageSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/language-sheet'
import { PresentationSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/presentation-sheet'
import { ProfileSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/profile-sheet'
import { ProjectSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/project-sheet'
import { WorkSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/work-sheet'
import { WritingSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/writing-sheet'
import { SummaryForm } from '@/app/[locale]/builder/_components/resume/form/summary-form'
import { WorkForm } from '@/app/[locale]/builder/_components/resume/form/work-form'
import { WritingForm } from '@/app/[locale]/builder/_components/resume/form/writings-form'
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
import { createContext, use, useRef, type JSX } from 'react'
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
  const { resume } = useResumeStore(s => s)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const setSectionRef = (id: string, ref: HTMLDivElement | null) => {
    sectionRefs.current[id] = ref
  }

  const sections: Section[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: IconUser,
      form: <PersonalForm />,
    },
    {
      id: 'summary',
      title: 'Summary',
      icon: IconNotes,
      form: <SummaryForm />,
    },
    {
      id: 'profiles',
      title: 'Profiles',
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
      sheet: <HonorsSheet />,
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
      form: <WritingForm />,
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
