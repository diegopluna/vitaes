import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeSummary({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <ResumeSectionHeader label={'Summary'} color={settings.accentColor} />
      <p className="text-xs text-gray-500">{resume.basics.summary}</p>
    </div>
  )
}
