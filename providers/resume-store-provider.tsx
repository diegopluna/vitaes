'use client'
import { createContext, use, useRef } from 'react'
import { useStore } from 'zustand'
import type { Resume } from '@/convex/resume/type'
import { createResumeStore, type ResumeStore } from '@/store/resume-store'

export type ResumeStoreApi = ReturnType<typeof createResumeStore>

export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(
  undefined,
)

export interface ResumeStoreProviderProps {
  children: React.ReactNode
  initialResume: Resume
}

export const ResumeStoreProvider = ({
  children,
  initialResume,
}: ResumeStoreProviderProps) => {
  const storeRef = useRef<ResumeStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createResumeStore({
      resume: initialResume,
    })
  }

  return (
    <ResumeStoreContext value={storeRef.current}>{children}</ResumeStoreContext>
  )
}

export const useResumeStore = <T,>(selector: (store: ResumeStore) => T): T => {
  const resumeStoreContext = use(ResumeStoreContext)
  if (!resumeStoreContext) {
    throw new Error('useResumeStore must be used within a ResumeStoreProvider')
  }

  return useStore(resumeStoreContext, selector)
}
