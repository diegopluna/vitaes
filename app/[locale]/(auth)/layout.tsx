import { redirect } from '@/i18n/navigation'
import { AuthStateProvider } from '@/providers/auth-state-provider'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect({
      href: '/dashboard',
      locale,
    })
  }

  return <AuthStateProvider>{children}</AuthStateProvider>
}
