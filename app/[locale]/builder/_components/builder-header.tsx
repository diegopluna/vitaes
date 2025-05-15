'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useAutoSaveResume } from '@/hooks/use-auto-save-resume'
import { useResumeMeta } from '@/providers/resume-meta-provider'

export const BuilderHeader = () => {
  const resume = useResumeStore(s => s.resume)
  const { id, name, updatedAt } = useResumeMeta()

  const {
    isPending,
    isError: autoSaveError,
    error: autoSaveErrorDetails,
    lastSaved,
  } = useAutoSaveResume(resume, id, name)

  return (
    <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">Builder</BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isPending && (
        <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
          Saving...
        </div>
      )}
      {autoSaveError && (
        <div className="text-xs text-destructive px-4 whitespace-nowrap">
          Error saving: {autoSaveErrorDetails?.message || 'Unknown error'}
        </div>
      )}
      {lastSaved ? (
        <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
          Last saved: {lastSaved.toLocaleString()}
        </div>
      ) : (
        updatedAt && (
          <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
            Last saved: {new Date(updatedAt).toLocaleString()}
          </div>
        )
      )}
    </header>
  )
}
