'use client'

import { AddressForm } from '@/app/builder/_components/resume/form/address-form'
import { AwardsForm } from '@/app/builder/_components/resume/form/awards-form'
import { CertificatesForm } from '@/app/builder/_components/resume/form/certificates-form'
import { EducationForm } from '@/app/builder/_components/resume/form/education-form'
import { InterestsForm } from '@/app/builder/_components/resume/form/interests-form'
import { LanguagesForm } from '@/app/builder/_components/resume/form/languages-form'
import { PersonalForm } from '@/app/builder/_components/resume/form/personal-form'
import { ProfilesForm } from '@/app/builder/_components/resume/form/profiles-form'
import { ProjectsForm } from '@/app/builder/_components/resume/form/projects-form'
import { PublicationsForm } from '@/app/builder/_components/resume/form/publications-form'
import { ReferencesForm } from '@/app/builder/_components/resume/form/references-form'
import { AwardSheet } from '@/app/builder/_components/resume/form/sheets/awards-sheet'
import { CertificateSheet } from '@/app/builder/_components/resume/form/sheets/certificates-sheet'
import { EducationSheet } from '@/app/builder/_components/resume/form/sheets/education-sheet'
import { InterestSheet } from '@/app/builder/_components/resume/form/sheets/interest-sheet'
import { LanguageSheet } from '@/app/builder/_components/resume/form/sheets/language-sheet'
import { ProfileSheet } from '@/app/builder/_components/resume/form/sheets/profile-sheet'
import { ProjectSheet } from '@/app/builder/_components/resume/form/sheets/project-sheet'
import { PublicationSheet } from '@/app/builder/_components/resume/form/sheets/publications-sheet'
import { ReferenceSheet } from '@/app/builder/_components/resume/form/sheets/reference-sheet'
import { SkillSheet } from '@/app/builder/_components/resume/form/sheets/skill-sheet'
import { VolunteerSheet } from '@/app/builder/_components/resume/form/sheets/volunteer-sheet'
import { WorkSheet } from '@/app/builder/_components/resume/form/sheets/work-sheet'
import { SkillsForm } from '@/app/builder/_components/resume/form/skills-form'
import { SummaryForm } from '@/app/builder/_components/resume/form/summary-form'
import { VolunteerForm } from '@/app/builder/_components/resume/form/volunteer-form'
import { WorkForm } from '@/app/builder/_components/resume/form/work-form'
import {
  AtSign,
  Book,
  Briefcase,
  DraftingCompass,
  FileCheck,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Languages,
  MapPinHouse,
  Medal,
  PencilRuler,
  Scroll,
  UserRound,
  Users,
} from 'lucide-react'
import React from 'react'

type Icon = React.ExoticComponent

type Section = {
  id: string
  title: string
  icon: Icon
  form: JSX.Element
  modal?: JSX.Element
}

type SectionsContextProps = {
  sections: Section[]
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  setSectionRef: (id: string, ref: HTMLDivElement | null) => void
}

const SectionsContext = React.createContext<SectionsContextProps | null>(null)

type SectionsProviderProps = {
  children: React.ReactNode
}

export const SectionsProvider = ({ children }: SectionsProviderProps) => {
  const sectionRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})

  const setSectionRef = (id: string, ref: HTMLDivElement | null) => {
    sectionRefs.current[id] = ref
  }

  const sections: Section[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: UserRound,
      form: <PersonalForm />,
    },
    {
      id: 'address',
      title: 'Address',
      icon: MapPinHouse,
      form: <AddressForm />,
    },
    { id: 'summary', title: 'Summary', icon: Scroll, form: <SummaryForm /> },
    {
      id: 'profiles',
      title: 'Profiles',
      icon: AtSign,
      form: <ProfilesForm />,
      modal: <ProfileSheet />,
    },
    {
      id: 'work',
      title: 'Work Experience',
      icon: Briefcase,
      form: <WorkForm />,
      modal: <WorkSheet />,
    },
    {
      id: 'volunteer',
      title: 'Volunteer Experience',
      icon: HandHeart,
      form: <VolunteerForm />,
      modal: <VolunteerSheet />,
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      form: <EducationForm />,
      modal: <EducationSheet />,
    },
    {
      id: 'awards',
      title: 'Awards',
      icon: Medal,
      form: <AwardsForm />,
      modal: <AwardSheet />,
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: FileCheck,
      form: <CertificatesForm />,
      modal: <CertificateSheet />,
    },
    {
      id: 'publications',
      title: 'Publications',
      icon: Book,
      form: <PublicationsForm />,
      modal: <PublicationSheet />,
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: DraftingCompass,
      form: <SkillsForm />,
      modal: <SkillSheet />,
    },
    {
      id: 'languages',
      title: 'Languages',
      icon: Languages,
      form: <LanguagesForm />,
      modal: <LanguageSheet />,
    },
    {
      id: 'interests',
      title: 'Interests',
      icon: Gamepad2,
      form: <InterestsForm />,
      modal: <InterestSheet />,
    },
    {
      id: 'references',
      title: 'References',
      icon: Users,
      form: <ReferencesForm />,
      modal: <ReferenceSheet />,
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: PencilRuler,
      form: <ProjectsForm />,
      modal: <ProjectSheet />,
    },
  ]

  return (
    <SectionsContext.Provider value={{ sections, sectionRefs, setSectionRef }}>
      {children}
    </SectionsContext.Provider>
  )
}

export const useResumeSections = () => {
  const sectionContext = React.useContext(SectionsContext)

  if (!sectionContext) {
    throw new Error('useResumeSections must be used within a ResumeProvider')
  }

  return sectionContext
}
