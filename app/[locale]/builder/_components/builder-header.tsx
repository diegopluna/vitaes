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
import { Button } from '@/components/ui/button'
import { IconDownload, IconPencil } from '@tabler/icons-react'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

export const BuilderHeader = () => {
  const resume = useResumeStore(s => s.resume)
  const { id, name, updatedAt, setName } = useResumeMeta()

  const {
    isPending,
    isError: autoSaveError,
    error: autoSaveErrorDetails,
    lastSaved,
  } = useAutoSaveResume(resume, id, name)

  // Editable name state
  const [editingName, setEditingName] = React.useState(false)
  const [nameValue, setNameValue] = React.useState(name)

  // trpc mutation for updating resume name
  const updateResume = api.resume.update.useMutation({
    onSuccess: () => {
      toast.success('Resume name updated')
    },
    onError: () => {
      toast.error('Failed to update resume name')
    },
  })

  React.useEffect(() => {
    setNameValue(name)
  }, [name])

  const handleNameClick = () => {
    setEditingName(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const saveName = (newName: string) => {
    if (!newName.trim() || newName === name) return
    // update backend
    updateResume.mutate({
      id,
      data: resume,
      name: newName.trim(),
    })
    // update local context
    setName(newName.trim())
  }

  const handleNameBlur = () => {
    setEditingName(false)
    saveName(nameValue)
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditingName(false)
      saveName(nameValue)
    }
  }

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
              <BreadcrumbPage>
                <div className="relative group inline-block">
                  {editingName ? (
                    <input
                      className="text-base font-medium bg-background border-b border-primary focus:outline-none px-1"
                      value={nameValue}
                      autoFocus
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                      onKeyDown={handleNameKeyDown}
                    />
                  ) : (
                    <span
                      className="cursor-pointer group-hover:border group-hover:border-primary group-hover:rounded group-hover:px-2 group-hover:py-1 transition-all"
                      onClick={handleNameClick}
                    >
                      {name}
                      <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconPencil className="size-4 text-primary" />
                      </span>
                    </span>
                  )}
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DownloadPdfButton id={id} />
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
          Last saved: <RelativeTime date={lastSaved} />
        </div>
      ) : (
        updatedAt && (
          <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
            Last saved: <RelativeTime date={updatedAt} />
          </div>
        )
      )}
    </header>
  )
}

function DownloadPdfButton({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Failed to generate PDF')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'vitaes.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      // Optionally show error toast
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDownload}
      disabled={loading}
      className="mr-2"
      aria-label="Download PDF"
    >
      <IconDownload className="w-4 h-4" />
      <span className="hidden sm:inline">
        {loading ? 'Downloading...' : 'Download'}
      </span>
    </Button>
  )
}

function RelativeTime({ date }: { date: string | number | Date }) {
  const [relative, setRelative] = React.useState('')

  React.useEffect(() => {
    function updateRelative() {
      setRelative(formatDistanceToNow(new Date(date), { addSuffix: true }))
    }
    updateRelative()
    const interval = setInterval(updateRelative, 60_000)
    return () => clearInterval(interval)
  }, [date])

  return <>{relative}</>
}
