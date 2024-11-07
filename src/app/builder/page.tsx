'use client'
import { MyThread } from '@/components/ui/assistant-ui/thread'
import { AssistantRuntimeProvider, useEdgeRuntime } from '@assistant-ui/react'
import { ResumeForm } from './_components/resume/resume-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBuilderTabStore } from '@/providers/builder-tab-store-provider'

// import { useQuery } from '@tanstack/react-query'
// import { PDFViewer } from '@react-pdf/renderer'
// import { AwesomeCVTemplate } from '@/templates/awesome-cv'

export default function Builder() {
  const { activeTab } = useBuilderTabStore((state) => state)

  const runtime = useEdgeRuntime({
    api: '/api/chat',
  })

  // const getResumeQuery = useQuery({
  //   queryKey: ['resume'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/pdf')
  //     const data = await response.blob()
  //     return data
  //   },
  // })

  return (
    <div className="flex flex-1 flex-row h-[calc(100vh-4rem)]">
      <ScrollArea className="w-1/3 border-r px-6">
        {activeTab === 'resume' && <ResumeForm />}
        {activeTab === 'settings' && <div>Settings</div>}
        {activeTab === 'chat' && (
          <AssistantRuntimeProvider runtime={runtime}>
            <MyThread />
          </AssistantRuntimeProvider>
        )}
      </ScrollArea>
      <div className="w-2/3 p-6 relative flex items-center justify-center">
        {/* <PDFViewer className="size-[80%] " showToolbar={false}>
          <AwesomeCVTemplate />
        </PDFViewer> */}
        <iframe
          src={'/api/pdf#toolbar=0&navpanes=0&scrollbar=0'}
          className="w-[60%] aspect-[1/1.4142] rounded-lg border border-border shadow-sm"
          style={{
            maxHeight: '85%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
