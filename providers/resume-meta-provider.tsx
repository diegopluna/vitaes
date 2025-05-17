'use client'

import React, { createContext, useContext } from 'react'

interface ResumeMeta {
  id: string
  name: string
  updatedAt: string | Date
  setName: (name: string) => void
}

const ResumeMetaContext = createContext<ResumeMeta | undefined>(undefined)

export const ResumeMetaProvider = ({
  id,
  name: initialName,
  updatedAt,
  children,
}: Omit<ResumeMeta, 'setName'> & { children: React.ReactNode }) => {
  const [name, setName] = React.useState(initialName)
  return (
    <ResumeMetaContext.Provider value={{ id, name, updatedAt, setName }}>
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
