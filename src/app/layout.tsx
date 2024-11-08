import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import QueryProvider from '@/providers/query-provider'

export const metadata: Metadata = {
  title: 'Vitaes',
  description: 'Resume Builder', // TODO: Add description and configure metadata and SEO
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
