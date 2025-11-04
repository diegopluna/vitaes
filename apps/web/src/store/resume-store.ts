import { initialValue } from '@/utils/initial-value'
import type { IResume } from '@vitaes/types/resume'
import { create } from 'zustand'

interface ResumeStore {
  resume: IResume
  setResume: (resume: IResume) => void
  saving: boolean
  setSaving: (saving: boolean) => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialValue,
  setResume: (resume) => set({ resume }),
  saving: false,
  setSaving: (saving) => set({ saving }),
}))
