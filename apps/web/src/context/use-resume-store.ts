import { useContext } from 'react'
import { ResumeContext } from './resume-context'

export function useResumeStore() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
