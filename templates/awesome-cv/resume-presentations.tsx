import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumePresentations({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader
        label={resume.presentations.label}
        color={settings.accentColor}
      />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.presentations.content.map((presentation, index) => (
          <div className="w-full" key={index}>
            <div className="flex justify-between w-full">
              <span className="text-md font-bold">{presentation.event}</span>
              <span className={`text-xs italic ${settings.accentColor}`}>
                {presentation.location}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-600">
                {presentation.role.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 italic ">
                {presentation.date}
              </span>
            </div>
            <div className="flex ml-4">
              <ul className="flex flex-col list-disc">
                {presentation.description.map((description, index) => (
                  <li key={index} className="text-xs text-gray-500">
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
