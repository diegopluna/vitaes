'use client'

import { useTranslations } from 'next-intl'
import { createContext, type JSX, use, useRef } from 'react'
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

  const sections: Section[] = []

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
