'use client'

import { Resume } from '@/@types/resume'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { createContext, use } from 'react'

type ResumeContextProps = {
  resume: Resume
  setResume: (resume: Resume) => void
  setBasics: (basics: Resume['basics']) => void
  setWork: (work: Resume['work']) => void
  setVolunteer: (volunteer: Resume['volunteer']) => void
  setEducation: (education: Resume['education']) => void
  setAwards: (awards: Resume['awards']) => void
  setCertificates: (certificates: Resume['certificates']) => void
  setPublications: (publications: Resume['publications']) => void
  setSkills: (skills: Resume['skills']) => void
  setLanguages: (languages: Resume['languages']) => void
  setInterests: (interests: Resume['interests']) => void
  setReferences: (references: Resume['references']) => void
  setProjects: (projects: Resume['projects']) => void
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined)

type ResumeProviderProps = {
  children: React.ReactNode
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resume, setResume] = useLocalStorage<Resume>('vitaes-resume', {
    basics: {
      name: '',
      label: '',
      image: '',
      email: '',
      phone: '',
      url: '',
      summary: '',
      location: {
        address: '',
        postalCode: '',
        city: '',
        countryCode: '',
        region: '',
      },
      profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
  })

  const setBasics = (basics: Resume['basics']) => {
    setResume((prev) => ({
      ...prev,
      basics,
    }))
  }

  const setWork = (work: Resume['work']) => {
    setResume((prev) => ({
      ...prev,
      work,
    }))
  }

  const setVolunteer = (volunteer: Resume['volunteer']) => {
    setResume((prev) => ({
      ...prev,
      volunteer,
    }))
  }

  const setEducation = (education: Resume['education']) => {
    setResume((prev) => ({
      ...prev,
      education,
    }))
  }

  const setAwards = (awards: Resume['awards']) => {
    setResume((prev) => ({
      ...prev,
      awards,
    }))
  }

  const setCertificates = (certificates: Resume['certificates']) => {
    setResume((prev) => ({
      ...prev,
      certificates,
    }))
  }

  const setPublications = (publications: Resume['publications']) => {
    setResume((prev) => ({
      ...prev,
      publications,
    }))
  }

  const setSkills = (skills: Resume['skills']) => {
    setResume((prev) => ({
      ...prev,
      skills,
    }))
  }

  const setLanguages = (languages: Resume['languages']) => {
    setResume((prev) => ({
      ...prev,
      languages,
    }))
  }

  const setInterests = (interests: Resume['interests']) => {
    setResume((prev) => ({
      ...prev,
      interests,
    }))
  }

  const setReferences = (references: Resume['references']) => {
    setResume((prev) => ({
      ...prev,
      references,
    }))
  }

  const setProjects = (projects: Resume['projects']) => {
    setResume((prev) => ({
      ...prev,
      projects,
    }))
  }

  return (
    <ResumeContext
      value={{
        resume,
        setResume,
        setBasics,
        setWork,
        setVolunteer,
        setEducation,
        setAwards,
        setCertificates,
        setPublications,
        setSkills,
        setLanguages,
        setInterests,
        setReferences,
        setProjects,
      }}
    >
      {children}
    </ResumeContext>
  )
}

export const useResume = () => {
  const context = use(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
