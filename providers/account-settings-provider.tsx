'use client'

import { createContext, use, useState } from 'react'

type Tab = 'profile' | 'security'

type AccountSettingsContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  tab: Tab
  setTab: (tab: Tab) => void
}

const AccountSettingsContext = createContext<
  AccountSettingsContextProps | undefined
>(undefined)

type AccountSettingsProviderProps = {
  children: React.ReactNode
}

export const AccountSettingsProvider = ({
  children,
}: AccountSettingsProviderProps) => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <AccountSettingsContext value={{ open, setOpen, tab, setTab }}>
      {children}
    </AccountSettingsContext>
  )
}

export const useAccountSettings = () => {
  const context = use(AccountSettingsContext)
  if (!context) {
    throw new Error(
      'useAccountSettings must be used within an AccountSettingsProvider',
    )
  }
  return context
}
