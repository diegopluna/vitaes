import { auth } from '@/lib/auth'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { headers } from 'next/headers'
import { Navbar } from './_components/navbar'
import { AccountMenu } from './_components/account-menu'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    return null
  }

  return (
    <AccountSettingsProvider>
      <Navbar />
      {children}
      <AccountMenu />
    </AccountSettingsProvider>
  )
}
