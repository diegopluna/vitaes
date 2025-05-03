'use client'

import { createResumeStore, type ResumeStore } from '@/store/resume-store'
import { useStore } from 'zustand'
import { createContext, use, useRef } from 'react'

export type ResumeStoreApi = ReturnType<typeof createResumeStore>

export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(
  undefined,
)

export interface ResumeStoreProviderProps {
  children: React.ReactNode
}

export const ResumeStoreProvider = ({ children }: ResumeStoreProviderProps) => {
  const storeRef = useRef<ResumeStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createResumeStore()
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
