import type { Resume } from '@/convex/resume/type'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeExtracurricular({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader
        label={resume.extracurriculars.label}
        color={settings.accentColor}
      />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.extracurriculars.content.map((extracurricular) => (
          <div className="w-full" key={extracurricular.id}>
            <div className="flex justify-between w-full">
              <span className="text-md font-bold">
                {extracurricular.organization}
              </span>
              <span className={`text-xs italic ${settings.accentColor}`}>
                {extracurricular.location}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-600">
                {extracurricular.role.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 italic ">
                {extracurricular.startDate}
                {' - '}
                {extracurricular.endDate}
              </span>
            </div>
            <div className="flex ml-4">
              <ul className="flex flex-col list-disc">
                {extracurricular.description.map((description) => (
                  <li key={description.id} className="text-xs text-gray-500">
                    {description.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
