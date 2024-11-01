'use client'
import { MyThread } from '@/components/ui/assistant-ui/thread'
import { AssistantRuntimeProvider, useEdgeRuntime } from '@assistant-ui/react'
import { ResumeForm } from './_components/resume/resume-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBuilderTabStore } from '@/providers/builder-tab-store-provider'

export default function Builder() {
  const { activeTab } = useBuilderTabStore((state) => state)

  const runtime = useEdgeRuntime({
    api: '/api/chat',
  })

  return (
    <div className="flex flex-1 flex-row overflow-hidden">
      <ScrollArea className="flex-1 overflow-y-auto p-6 border-r h-full justify-between">
        {activeTab === 'resume' && <ResumeForm />}
        {activeTab === 'settings' && <div>Settings</div>}
        {activeTab === 'chat' && (
          <AssistantRuntimeProvider runtime={runtime}>
            <MyThread />
          </AssistantRuntimeProvider>
        )}
      </ScrollArea>
      <div className="flex-1 overflow-hidden p-6">
        {/* <PDFViewer className="size-full" showToolbar={false}>
          <GenericResume resume={resume} />
        </PDFViewer> */}
      </div>
    </div>
  )
}
