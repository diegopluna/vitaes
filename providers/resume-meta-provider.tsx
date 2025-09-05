'use client'

import { createContext, use, useState } from 'react'

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
  const [name, setName] = useState(initialName)

  return (
    <ResumeMetaContext value={{ id, name, updatedAt, setName }}>
      {children}
    </ResumeMetaContext>
  )
}

export const useResumeMeta = () => {
  const context = use(ResumeMetaContext)
  if (!context) {
    throw new Error('useResumeMeta must be used within a ResumeMetaProvider')
  }
  return context
}
