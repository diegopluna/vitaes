import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { SidebarProvider } from '@vitaes/ui/components/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { validatePrefix } from 'intlayer'

export const Route = createFileRoute('/{-$locale}/dashboard')({
  beforeLoad: async ({ context, params }) => {
    const localeParam = params.locale

    const { localePrefix } = validatePrefix(localeParam)
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/{-$locale}/login',
        params: { locale: localePrefix },
      })
    }
  },
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
