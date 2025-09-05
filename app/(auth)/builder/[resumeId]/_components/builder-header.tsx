'use client'

import { IconDownload, IconPencil } from '@tabler/icons-react'
import { useMutation, useQuery } from 'convex/react'
import { formatDistanceToNow } from 'date-fns'
import { de, enUS, es, fr, ja, pt, zhCN } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import type { Locale } from '@/convex/locale'
import { useAutoSaveResume } from '@/hooks/use-auto-save-resume'
import { useResumeStore } from '@/providers/resume-store-provider'

export function BuilderHeader({ id }: { id: Id<'resumes'> }) {
  const t = useTranslations('builder-header')

  const resumeQuery = useQuery(api.resume.functions.get, { id })
  const name = resumeQuery?.name ?? ''
  const updatedAt = resumeQuery?.updatedAt
    ? new Date(resumeQuery.updatedAt)
    : resumeQuery?._creationTime
      ? new Date(resumeQuery._creationTime)
      : null

  const resume = useResumeStore((s) => s.resume)

  const {
    isSaving,
    error: autoSaveError,
    lastSavedAt,
  } = useAutoSaveResume(resume, id, name)

  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState('')

  useEffect(() => setNameValue(name), [name])

  const updateResumeName = useMutation(api.resume.functions.updateName)

  const saveName = useCallback(
    async (newName: string) => {
      const trimmed = newName.trim()
      if (!trimmed || trimmed === name) return
      try {
        await updateResumeName({ id, name: trimmed })
      } catch {
        // TODO: i18n the error message
        toast.error(t('error-saving', { error: 'Failed to update name' }))
      }
    },
    [id, name, t, updateResumeName],
  )

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditingName(false)
      saveName(nameValue)
    }
  }

  const handleNameBlur = () => {
    setEditingName(false)
    saveName(nameValue)
  }

  const lastSavedRelative = useRelativeTime({ date: lastSavedAt })
  const updatedAtRelative = useRelativeTime({ date: updatedAt })

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              {t('builder')}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <div className="relative group inline-block">
                {editingName ? (
                  <Input
                    className="text-base font-medium bg-background border-b border-primary focus:outline-none px-1"
                    value={nameValue}
                    autoFocus
                    onChange={(e) => setNameValue(e.target.value)}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                  />
                ) : (
                  <span
                    className="cursor-pointer group-hover:border group-hover:border-primary group-hover:rounded group-hover:px-2 group-hover:py-1 transition-all"
                    onClick={() => setEditingName(true)}
                  >
                    {name || '...'}
                    <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconPencil className="size-4 text-primary" />
                    </span>
                  </span>
                )}
              </div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DownloadPdfButton id={id} name={name} />
      {isSaving && (
        <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
          {t('saving')}
        </div>
      )}
      {autoSaveError && (
        <div className="text-xs text-destructive px-4 whitespace-nowrap">
          {t('error-saving', {
            error: autoSaveError.message || 'Unknown error',
          })}
        </div>
      )}
      {lastSavedAt ? (
        <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
          {t('last-saved', { time: lastSavedRelative })}
        </div>
      ) : updatedAt ? (
        <div className="text-xs text-muted-foreground px-4 whitespace-nowrap">
          {t('last-saved', { time: updatedAtRelative })}
        </div>
      ) : null}
    </header>
  )
}

function DownloadPdfButton({ id, name }: { id: Id<'resumes'>; name: string }) {
  const t = useTranslations('builder-header')
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id.toString() }),
      })
      if (!res.ok) throw new Error('Failed to generate PDF')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      toast.error(t('failed-to-generate-pdf'))
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
        {loading ? t('downloading') : t('download')}
      </span>
    </Button>
  )
}

function useRelativeTime({ date }: { date: string | number | Date | null }) {
  const [relative, setRelative] = useState('')
  const currentLocale = useLocale() as Locale
  useEffect(() => {
    function updateRelative() {
      const localeMap = {
        en: enUS,
        de: de,
        es: es,
        fr: fr,
        ja: ja,
        pt: pt,
        zh: zhCN,
      } as const

      const dateFnsLocale = localeMap[currentLocale] || enUS

      if (!date) return

      setRelative(
        formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: dateFnsLocale,
        }),
      )
    }
    updateRelative()
    const interval = setInterval(updateRelative, 60_000)
    return () => clearInterval(interval)
  }, [date, currentLocale])

  return relative
}
