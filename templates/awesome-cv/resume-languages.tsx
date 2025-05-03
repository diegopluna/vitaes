import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeLanguages({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader label={'Languages'} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.languages?.map((language, index) => (
          <div className="flex justify-between w-full" key={index}>
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
