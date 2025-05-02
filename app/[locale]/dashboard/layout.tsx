import { auth } from '@/server/auth'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { headers } from 'next/headers'
import { Navbar } from './_components/navbar'
import { redirect } from '@/i18n/navigation'
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
    redirect({
      href: '/sign-in',
      locale: 'en',
    })
  }

  return (
    <AccountSettingsProvider>
      <Navbar />
      {children}
      <AccountMenu />
    </AccountSettingsProvider>
  )
}
