'use client'

import dynamic from 'next/dynamic'
import { PDFPanel } from '@/components/pdf-panel'
import DisplayFrame from '@/components/resume/display-frame'
import ResumeView from '@/components/resume/resume-view'
import AwesomeCV from '@/components/resume/templates/awesome-cv-pdf'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBuilderTab } from '@/providers/builder-tab-provider'
import { useResumeStore } from '@/providers/resume-store-provider'
import { ResumeForm } from './resume/resume-form'
import { ResumeSettings } from './resume/resume-settings'

const PDFViewer = dynamic(() => import('@/components/pdf-viewer'), {
  ssr: false,
})

export function Builder() {
  const resume = useResumeStore((s) => s.resume)
  const { activeTab } = useBuilderTab()

  return (
    <div className="flex flex-1 flex-row h-[calc(100vh-4rem)]">
      <ScrollArea className="w-1/3 border-r px-6 h-full">
        {activeTab === 'resume' && <ResumeForm />}
        {activeTab === 'settings' && <ResumeSettings />}
      </ScrollArea>
      <ScrollArea className=" w-2/3 flex justify-center">
        {/* <DisplayFrame scale={0.75}>
          <ResumeView resume={resume} />
        </DisplayFrame> */}
        <PDFPanel active>
          <PDFViewer>
            <AwesomeCV resume={resume} />
          </PDFViewer>
        </PDFPanel>
      </ScrollArea>
    </div>
  )
}
