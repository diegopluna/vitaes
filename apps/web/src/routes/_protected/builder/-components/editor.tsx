import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHotkeys } from 'react-hotkeys-hook'

import { useState } from 'react'
import { PersonalForm } from './forms/personal-form'
import { ResumeSchema } from '@vitaes/types/resume'
import { useAppForm } from '@/components/form/form-context'
import { SectionsForm } from './forms/sections-form'
import { ThemeForm } from './forms/theme-form'
import { useResumeStore } from '@/context/use-resume-store'
import type { IResume } from '@vitaes/types/resume'
import { useMutation } from '@tanstack/react-query'
import { orpc } from '@/utils/orpc'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function Editor({ initialResume }: { initialResume: IResume }) {
  const { id } = useParams({ from: '/_protected/builder/$id' })
  const { setResume, setIsSaving, setLastSaved } = useResumeStore()
  const [activeTab, setActiveTab] = useState<string>('personal')
  const isMac = navigator.userAgent.includes('Mac')
  const updateResume = useMutation(orpc.updateResume.mutationOptions())

  const form = useAppForm({
    defaultValues: initialResume,
    validators: {
      onChange: ResumeSchema,
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: (values) => {
        if (values.formApi.state.isValid) {
          setResume(values.formApi.state.values)
          setIsSaving(true)
          updateResume
            .mutateAsync({
              id,
              data: values.formApi.state.values,
            })
            .then((savedResume) => {
              setLastSaved(savedResume.updatedAt)
            })
            .catch(() => {
              toast.error('Failed to save resume')
            })
            .finally(() => {
              setIsSaving(false)
            })
        }
      },
    },
  })

  useHotkeys('mod+1', (e) => {
    e.preventDefault()
    setActiveTab('personal')
  })
  useHotkeys('mod+2', (e) => {
    e.preventDefault()
    setActiveTab('sections')
  })
  useHotkeys('mod+3', (e) => {
    e.preventDefault()
    setActiveTab('theme')
  })

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      <div className="sticky top-0 z-10 bg-card border-b shrink-0">
        <TabsList className="w-full grid grid-cols-3 rounded-none h-12">
          <TabsTrigger
            value="personal"
            className="text-sm flex items-center justify-center gap-2"
          >
            <span>Personal Info</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>1
            </kbd>
          </TabsTrigger>
          <TabsTrigger
            value="sections"
            className="text-sm flex items-center justify-center gap-2"
          >
            <span>Sections</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>2
            </kbd>
          </TabsTrigger>
          <TabsTrigger
            value="theme"
            className="text-sm flex items-center justify-center gap-2"
          >
            <span>Theme</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>3
            </kbd>
          </TabsTrigger>
        </TabsList>
      </div>
      <ScrollArea className="flex-1 h-full pb-12">
        <TabsContent value="personal" className="space-y-4 p-6 mt-0">
          <PersonalForm form={form} />
        </TabsContent>
        <TabsContent value="sections">
          <SectionsForm form={form} />
        </TabsContent>
        <TabsContent value="theme" className="space-y-4 p-6 mt-0">
          <ThemeForm form={form} />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
