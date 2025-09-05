'use client'

import { createContext, use, useState } from 'react'

type Tab = 'resume' | 'settings'

type BuilderTabContextProps = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const BuilderTabContext = createContext<BuilderTabContextProps | undefined>(
  undefined,
)

type BuilderTabProviderProps = {
  children: React.ReactNode
}

export const BuilderTabProvider = ({ children }: BuilderTabProviderProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('resume')

  return (
    <BuilderTabContext value={{ activeTab, setActiveTab }}>
      {children}
    </BuilderTabContext>
  )
}

export const useBuilderTab = () => {
  const context = use(BuilderTabContext)

  if (!context) {
    throw new Error('useBuilderTab must be used within a BuilderTabProvider')
  }

  return context
}
