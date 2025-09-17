import { createStore } from 'zustand/vanilla'

import type { Resume } from '@/convex/resume/type'

export type ResumeState = {
  resume: Resume
}

export type ResumeActions = {
  setResume: (resume: Resume) => void
  setResumeField: <K extends keyof Resume>(key: K, value: Resume[K]) => void
}

export type ResumeStore = ResumeState & ResumeActions

export const createResumeStore = (init: ResumeState) => {
  return createStore<ResumeStore>()((set) => ({
    ...init,
    setResume: (resume) => set({ resume }),
    setResumeField: (key, value) =>
      set((state) => ({
        resume: {
          ...state.resume,
          [key]: value,
        },
      })),
  }))
}
