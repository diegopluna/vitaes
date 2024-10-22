import { Outlet } from '@tanstack/react-router'
import { AppHeader } from './app-header/app-header'
import { AppSidebar } from './app-sidebar/app-sidebar'
import { SectionsProvider } from '@/hooks/use-sections'

export const BuilderLayout = () => {
  return (
    <SectionsProvider>
      <AppSidebar>
        <AppHeader />
        <main>
          <Outlet />
        </main>
      </AppSidebar>
    </SectionsProvider>
  )
}
