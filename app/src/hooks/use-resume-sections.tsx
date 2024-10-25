'use client'

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
    { id: 'personal', title: 'Personal Information', icon: UserRound },
    { id: 'summary', title: 'Summary', icon: Scroll },
    { id: 'profiles', title: 'Profiles', icon: AtSign },
    { id: 'work', title: 'Work Experience', icon: Briefcase },
    { id: 'volunteer', title: 'Volunteer Experience', icon: HandHeart },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'awards', title: 'Awards', icon: Medal },
    { id: 'certificates', title: 'Certificates', icon: FileCheck },
    { id: 'publications', title: 'Publications', icon: Book },
    { id: 'skills', title: 'Skills', icon: DraftingCompass },
    { id: 'languages', title: 'Languages', icon: Languages },
    { id: 'interests', title: 'Interests', icon: Gamepad2 },
    { id: 'references', title: 'References', icon: Users },
    { id: 'projects', title: 'Projects', icon: PencilRuler },
  ]

  return (
    <SectionsContext.Provider value={{ sections, sectionRefs, setSectionRef }}>
      {children}
    </SectionsContext.Provider>
  )
}

export const useResumeSections = () => {
  return React.useContext(SectionsContext)
}
