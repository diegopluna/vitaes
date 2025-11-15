import { createContext } from 'react'
import type { IResume } from '@vitaes/types/resume'

type ResumeContextType = {
  resume: IResume
  setResume: (resume: IResume) => void
  resumeName: string
  setResumeName: (resumeName: string) => void
  lastSaved: Date
  setLastSaved: (lastSaved: Date) => void
  isSaving: boolean
  setIsSaving: (isSaving: boolean) => void
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined,
)
