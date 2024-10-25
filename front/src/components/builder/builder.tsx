import { PDFViewer } from '@react-pdf/renderer'
import { ResumeForm } from '../resume/resume-form'
import { GenericResume } from '../resume/generic-resume'
import { getResume } from '@/store/resume-store'

export const Builder = () => {
  const resume = getResume()
  return (
    <div className="flex flex-1 flex-row overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 border-r">
        <ResumeForm />
      </div>
      <div className="flex-1 overflow-hidden p-6">
        <PDFViewer className="size-full" showToolbar={false}>
          <GenericResume resume={resume} />
        </PDFViewer>
      </div>
    </div>
  )
}
