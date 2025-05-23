'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useBuilderTab } from '@/providers/builder-tab-provider'
import { ResumeForm } from '../_components/resume/resume-form'
import { ResumeSettings } from '../_components/resume/resume-settings'
import DisplayFrame from '../_components/display-frame'
import ResumeView from '../_components/resume/resume-view'
import { useResumeStore } from '@/providers/resume-store-provider'

export default function Builder() {
  const { resume } = useResumeStore(s => s)
  const { activeTab } = useBuilderTab()

  if (!resume) {
    return <div>Resume not found</div>
  }

  return (
    <div className="flex flex-1 flex-row h-[calc(100vh-4rem)]">
      <ScrollArea className="w-1/3 border-r px-6">
        {activeTab === 'resume' && <ResumeForm />}
        {activeTab === 'settings' && <ResumeSettings />}
      </ScrollArea>
      {/* <div className="w-2/3 p-6 relative flex items-center justify-center"> */}
      {/* <iframe
          src={'/api/pdf?preview=true#toolbar=0&navpanes=0&scrollbar=0'}
          className="w-[60%] aspect-[1/1.4142] rounded-lg border border-border shadow-sm"
          style={{
            maxHeight: '85%',
            objectFit: 'contain',
          }}
        /> */}
      <ScrollArea className="pl-6 pt-6 w-2/3 flex justify-center">
        <DisplayFrame scale={0.75}>
          <ResumeView resume={resume} />
        </DisplayFrame>
      </ScrollArea>
      {/* </div> */}
    </div>
  )
}
