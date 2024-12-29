import { Navbar } from './_components/navbar'
import { headers } from 'next/headers'
import { client } from '@/lib/client'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { AccountMenu } from './_components/account-menu'

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await client.getSession({
    fetchOptions: {
      headers: headers(),
    },
  })

  const user = session.data?.user

  if (!user) {
    return null
  }

  return (
    <AccountSettingsProvider>
      <Navbar user={user} />
      {children}
      <AccountMenu />
    </AccountSettingsProvider>
  )
}
