import { BuilderSidebar } from './_components/builder-sidebar'
import { BuilderHeader } from './_components/builder-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SectionsProvider } from '@/hooks/use-resume-sections'
import { headers } from 'next/headers'
import { client } from '@/lib/client'

export default async function BuilderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await client.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  const user = session.data?.user

  return (
    <SectionsProvider>
      <SidebarProvider>
        <BuilderSidebar user={user} />
        <SidebarInset>
          <BuilderHeader />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SectionsProvider>
  )
}
