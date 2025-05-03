import { auth } from '@/server/auth'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { headers } from 'next/headers'
import { Navbar } from './_components/navbar'
import { redirect } from '@/i18n/navigation'
import { AccountMenu } from './_components/account-menu'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { locale } = await params

  const user = session?.user

  if (!user) {
    redirect({
      href: '/sign-in',
      locale,
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
