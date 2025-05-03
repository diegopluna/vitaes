import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { Resume } from '@/@types/resume'
import { kendallRoyResume } from '@/templates/example-resume-data/kendall-roy'

export type ResumeState = {
  resume: Resume
}

export type ResumeActions = {
  setResume: (resume: Resume) => void
  setResumeField: <K extends keyof Resume>(key: K, value: Resume[K]) => void
}

export type ResumeStore = ResumeState & ResumeActions

export const defaultInitState: ResumeState = {
  resume: kendallRoyResume,
}

export const createResumeStore = (
  initState: ResumeState = defaultInitState,
) => {
  return createStore<ResumeStore>()(
    persist(
      set => ({
        ...initState,
        setResume: resume => set({ resume }),
        setResumeField: (key, value) =>
          set(state => ({
            resume: {
              ...state.resume,
              [key]: value,
            },
          })),
      }),
      {
        name: 'vitaes-resume-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )
}
