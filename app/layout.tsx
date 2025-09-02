import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { ConvexClientProvider } from '@/components/convex-provider'
import { ThemeProvider } from '@/components/theme-provider'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <Script defer={true} data-domain="vitaes.io" src="/js/script.js" />
      <Script>
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments)}`}
      </Script>
    </html>
  )
}
