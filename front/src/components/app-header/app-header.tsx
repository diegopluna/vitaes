import { useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

export const AppHeader = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  }).split('/')

  const pathName = pathname[1][0].toUpperCase() + pathname[1].slice(1)
  const pathName2 = pathname[2][0].toUpperCase() + pathname[2].slice(1)

  return (
    <header className="sticky top-0 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              {pathName}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pathName2}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
