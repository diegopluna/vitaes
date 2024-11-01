'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type ResumeStore, createResumeStore } from '@/stores/resume-store'

export type ResumeStoreApi = ReturnType<typeof createResumeStore>

export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(
  undefined,
)

export interface ResumeStoreProviderProps {
  children: ReactNode
}

export const ResumeStoreProvider = ({ children }: ResumeStoreProviderProps) => {
  const storeRef = useRef<ResumeStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createResumeStore()
  }

  return (
    <ResumeStoreContext.Provider value={storeRef.current}>
      {children}
    </ResumeStoreContext.Provider>
  )
}

export const useResumeStore = <T,>(selector: (store: ResumeStore) => T): T => {
  const resumeStoreContext = useContext(ResumeStoreContext)
  if (!resumeStoreContext) {
    throw new Error('useResumeStore must be used within a ResumeStoreProvider')
  }
  return useStore(resumeStoreContext, selector)
}
