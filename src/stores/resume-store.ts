import { Resume } from '@/@types/resume'
import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ResumeStoreState = {
  resume: Resume
}

export type ResumeStoreActions = {
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

export type ResumeStore = ResumeStoreState & ResumeStoreActions

export const defaultInitState: ResumeStoreState = {
  resume: {
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
  },
}

export const createResumeStore = (
  initialState: ResumeStoreState = defaultInitState,
) => {
  return createStore<ResumeStore>()(
    persist(
      (set, get) => ({
        ...initialState,
        setResume: (resume: Resume) => set({ resume }),
        setBasics: (basics: Resume['basics']) =>
          set({ resume: { ...get().resume, basics } }),
        setWork: (work: Resume['work']) =>
          set({ resume: { ...get().resume, work } }),
        setVolunteer: (volunteer: Resume['volunteer']) =>
          set({ resume: { ...get().resume, volunteer } }),
        setEducation: (education: Resume['education']) =>
          set({ resume: { ...get().resume, education } }),
        setAwards: (awards: Resume['awards']) =>
          set({ resume: { ...get().resume, awards } }),
        setCertificates: (certificates: Resume['certificates']) =>
          set({ resume: { ...get().resume, certificates } }),
        setPublications: (publications: Resume['publications']) =>
          set({ resume: { ...get().resume, publications } }),
        setSkills: (skills: Resume['skills']) =>
          set({ resume: { ...get().resume, skills } }),
        setLanguages: (languages: Resume['languages']) =>
          set({ resume: { ...get().resume, languages } }),
        setInterests: (interests: Resume['interests']) =>
          set({ resume: { ...get().resume, interests } }),
        setReferences: (references: Resume['references']) =>
          set({ resume: { ...get().resume, references } }),
        setProjects: (projects: Resume['projects']) =>
          set({ resume: { ...get().resume, projects } }),
      }),
      {
        name: 'resume',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )
}
