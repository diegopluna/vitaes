import { ResumeForm } from '../resume/resume-form'

export const Builder = () => {
  return (
    <div className="flex flex-1 flex-row overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 border-r">
        <ResumeForm />
      </div>
      <div className="flex-1 overflow-hidden p-6">WE GUCCI</div>
    </div>
  )
}
