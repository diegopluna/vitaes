'use client'

import { createResumeStore, type ResumeStore } from '@/store/resume-store'
import { useStore } from 'zustand'
import { createContext, use, useRef } from 'react'
import { kendallRoyResume } from '@/templates/example-resume-data/kendall-roy'
import type { Resume } from '@/@types/resume'

export type ResumeStoreApi = ReturnType<typeof createResumeStore>

export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(
  undefined,
)

export interface ResumeStoreProviderProps {
  children: React.ReactNode
  initialResume?: Resume
  resumeId?: string
}

export const ResumeStoreProvider = ({
  children,
  initialResume,
  resumeId,
}: ResumeStoreProviderProps) => {
  const storeRef = useRef<ResumeStoreApi | null>(null)

  // Always clear localStorage for this resumeId before initializing the store
  if (typeof window !== 'undefined' && initialResume && resumeId) {
    const storageKey = `vitaes-resume-store-${resumeId}`
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // Ignore errors (e.g., quota exceeded, private mode)
    }
  }

  if (storeRef.current === null) {
    storeRef.current = createResumeStore(
      {
        resume: initialResume ?? kendallRoyResume,
      },
      resumeId,
    )
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
