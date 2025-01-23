import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import BaseLayout from '@/components/base-layout'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  return <BaseLayout locale={locale}>{children}</BaseLayout>
}
