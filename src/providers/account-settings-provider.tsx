'use client'

import { createContext, useContext, useState } from 'react'

type Tab = 'profile' | 'security'

type AccountSettingsContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  tab: Tab
  setTab: (tab: Tab) => void
}

const AccountSettingsContext =
  createContext<AccountSettingsContextProps | null>(null)

type AccountSettingsProviderProps = {
  children: React.ReactNode
}

export const AccountSettingsProvider = ({
  children,
}: AccountSettingsProviderProps) => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <AccountSettingsContext.Provider value={{ open, setOpen, tab, setTab }}>
      {children}
    </AccountSettingsContext.Provider>
  )
}

export const useAccountSettings = () => {
  const context = useContext(AccountSettingsContext)
  if (!context) {
    throw new Error(
      'useAccountSettings must be used within an AccountSettingsProvider',
    )
  }
  return context
}
