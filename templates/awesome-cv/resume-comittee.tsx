import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeComittee({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader
        label={resume.committees.label}
        color={settings.accentColor}
      />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.committees.content.map((comittee, index) => (
          <div className="flex justify-between w-full" key={index}>
            <div className="flex flex-row ">
              <span className="text-xs mr-4">{comittee.year}</span>
              <span className="text-xs">
                <span className="font-bold">{comittee.position}, </span>
                {comittee.organization}
              </span>
            </div>
            <span className={`text-xs italic ${settings.accentColor}`}>
              {comittee.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
