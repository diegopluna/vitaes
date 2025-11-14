import type { IResume } from '@vitaes/types/resume'
import { useState } from 'react'
import { ResumeContext } from './resume-context'

type ResumeProviderProps = {
  children: React.ReactNode
  initialResume: IResume
  initialLastSaved: Date
}

export function ResumeProvider({
  children,
  initialResume,
  initialLastSaved,
}: ResumeProviderProps) {
  const [resume, setResume] = useState<IResume>(initialResume)
  const [lastSaved, setLastSaved] = useState<Date>(initialLastSaved)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        lastSaved,
        setLastSaved,
        isSaving,
        setIsSaving,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}
