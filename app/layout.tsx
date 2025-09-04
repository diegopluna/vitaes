import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { deDE, enUS, esES, frFR, jaJP, ptBR, zhCN } from '@clerk/localizations'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { ClerkProvider } from '@/components/clerk-provider'
import ConvexClientProvider from '@/components/convex-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Locale } from '@/i18n/config'
import { seo } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = seo({
  title: 'Vitaes',
  description: 'Resume Builder',
  keywords:
    'resume, builder, resume builder, resume builder app, resume builder app',
  creator: '@diegopeterl',
})

const getClerklocale = (locale: Locale) => {
  if (locale === 'en') return enUS
  if (locale === 'de') return deDE
  if (locale === 'es') return esES
  if (locale === 'fr') return frFR
  if (locale === 'ja') return jaJP
  if (locale === 'pt') return ptBR
  if (locale === 'zh') return zhCN

  return enUS
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = (await getLocale()) as Locale

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider localization={getClerklocale(locale)}>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider>
                {children}
                <Toaster />
              </NextIntlClientProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>

      <Script defer={true} data-domain="vitaes.io" src="/js/script.js" />
      <Script>
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments)}`}
      </Script>
    </html>
  )
}
