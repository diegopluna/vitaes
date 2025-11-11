import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHotkeys } from 'react-hotkeys-hook'

import { useState } from 'react'
import { PersonalForm } from './forms/personal-form'
import { initialValue } from '@/utils/initial-value'
import { ResumeSchema } from '@vitaes/types/resume'
import { useResumeStore } from '@/store/resume-store'
import { useAppForm } from '@/components/form/form-context'
import { SectionsForm } from './forms/sections-form'

export function Editor() {
  const { setResume, setSaving } = useResumeStore()
  const [activeTab, setActiveTab] = useState<string>('personal')
  const isMac = navigator.userAgent.includes('Mac')

  const form = useAppForm({
    defaultValues: initialValue,
    validators: {
      onChange: ResumeSchema,
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: (values) => {
        console.log('Changed!')
        if (values.formApi.state.isValid) {
          setSaving(true)
          setResume(values.formApi.state.values)
          setSaving(false)
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
        <TabsContent value="theme">Theme</TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
