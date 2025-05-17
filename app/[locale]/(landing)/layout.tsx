import * as React from 'react'
import { Navbar } from './_components/navbar'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'
import { redirect } from '@/i18n/navigation'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LandingLayout({ children, params }: Props) {
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

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
