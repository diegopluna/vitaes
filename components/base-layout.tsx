import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import QueryProvider from '@/providers/query-provider'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { OpenPanelComponent } from '@openpanel/nextjs'
import { env } from '@/env/server'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type Props = {
  children: React.ReactNode
  locale: string
}

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <OpenPanelComponent
                clientId={env.OPENPANEL_CLIENT_ID}
                clientSecret={env.OPENPANEL_CLIENT_SECRET}
                trackScreenViews={true}
                trackOutgoingLinks={true}
                trackAttributes={true}
              />
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Toaster />
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
