'use client'

import React, { createContext, useContext } from 'react'

interface ResumeMeta {
  id: string
  name: string
  updatedAt: string | Date
}

const ResumeMetaContext = createContext<ResumeMeta | undefined>(undefined)

export const ResumeMetaProvider = ({
  id,
  name,
  updatedAt,
  children,
}: ResumeMeta & { children: React.ReactNode }) => {
  return (
    <ResumeMetaContext.Provider value={{ id, name, updatedAt }}>
      {children}
    </ResumeMetaContext.Provider>
  )
}

export const useResumeMeta = () => {
  const ctx = useContext(ResumeMetaContext)
  if (!ctx)
    throw new Error('useResumeMeta must be used within a ResumeMetaProvider')
  return ctx
}
