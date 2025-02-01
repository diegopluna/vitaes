'use client'

import { AddressForm } from '@/app/[locale]/builder/_components/resume/form/address-form'
import { AwardsForm } from '@/app/[locale]/builder/_components/resume/form/awards-form'
import { CertificatesForm } from '@/app/[locale]/builder/_components/resume/form/certificates-form'
import { EducationForm } from '@/app/[locale]/builder/_components/resume/form/education-form'
import { InterestForm } from '@/app/[locale]/builder/_components/resume/form/interest-form'
import { LanguagesForm } from '@/app/[locale]/builder/_components/resume/form/languages-form'
import { PersonalForm } from '@/app/[locale]/builder/_components/resume/form/personal-form'
import { ProfileForm } from '@/app/[locale]/builder/_components/resume/form/profile-form'
import { ProjectsForm } from '@/app/[locale]/builder/_components/resume/form/projects-form'
import { PublicationsForm } from '@/app/[locale]/builder/_components/resume/form/publications-form'
import { ReferencesForm } from '@/app/[locale]/builder/_components/resume/form/references-form'
import { AwardsSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/awards-sheet'
import { CertificatesSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/certificates-sheet'
import { EducationSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/education-sheet'
import { InterestSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/interest-sheet'
import { LanguagesSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/languages-sheet'
import { ProfileSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/profile-sheet'
import { ProjectSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/project-sheet'
import { PublicationsSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/publications-sheet'
import { ReferenceSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/reference-sheet'
import { SkillsSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/skills-sheet'
import { VolunteerSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/volunteer-sheet'
import { WorkSheet } from '@/app/[locale]/builder/_components/resume/form/sheets/work-sheet'
import { SkillsForm } from '@/app/[locale]/builder/_components/resume/form/skills-form'
import { SummaryForm } from '@/app/[locale]/builder/_components/resume/form/summary-form'
import { VolunteerForm } from '@/app/[locale]/builder/_components/resume/form/volunteer-form'
import { WorkForm } from '@/app/[locale]/builder/_components/resume/form/work-form'
import {
  IconAt,
  IconBook,
  IconBriefcase,
  IconDeviceGamepad2,
  IconFileCertificate,
  IconGeometry,
  IconHeartHandshake,
  IconLanguage,
  IconMapPin,
  IconMedal,
  IconNotes,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import { GraduationCap, PencilRuler } from 'lucide-react'
import { createContext, JSX, use, useRef } from 'react'

type Section = {
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
      id: 'address',
      title: 'Address',
      icon: IconMapPin,
      form: <AddressForm />,
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
      title: 'Work Experience',
      icon: IconBriefcase,
      form: <WorkForm />,
      sheet: <WorkSheet />,
    },
    {
      id: 'volunteer',
      title: 'Volunteer Experience',
      icon: IconHeartHandshake,
      form: <VolunteerForm />,
      sheet: <VolunteerSheet />,
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      form: <EducationForm />,
      sheet: <EducationSheet />,
    },
    {
      id: 'awards',
      title: 'Awards',
      icon: IconMedal,
      form: <AwardsForm />,
      sheet: <AwardsSheet />,
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: IconFileCertificate,
      form: <CertificatesForm />,
      sheet: <CertificatesSheet />,
    },
    {
      id: 'publications',
      title: 'Publications',
      icon: IconBook,
      form: <PublicationsForm />,
      sheet: <PublicationsSheet />,
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: IconGeometry,
      form: <SkillsForm />,
      sheet: <SkillsSheet />,
    },
    {
      id: 'languages',
      title: 'Languages',
      icon: IconLanguage,
      form: <LanguagesForm />,
      sheet: <LanguagesSheet />,
    },
    {
      id: 'interests',
      title: 'Interests',
      icon: IconDeviceGamepad2,
      form: <InterestForm />,
      sheet: <InterestSheet />,
    },
    {
      id: 'references',
      title: 'References',
      icon: IconUsers,
      form: <ReferencesForm />,
      sheet: <ReferenceSheet />,
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: PencilRuler,
      form: <ProjectsForm />,
      sheet: <ProjectSheet />,
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
