import type { Resume } from '@/convex/resume/type'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeLanguages({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader
        label={resume.languages.label}
        color={settings.accentColor}
      />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.languages.content.map((language) => (
          <div className="flex justify-between w-full" key={language.id}>
            <div className="flex flex-row ">
              <span className="text-xs mr-4">{language.language}</span>
              <span className="text-xs">
                <span className="font-bold">{language.fluency}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
