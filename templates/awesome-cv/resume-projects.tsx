import type { Resume } from '@/@types/resume'
import ResumeSectionHeader from './resume-section-header'

export default function ResumeProjects({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <ResumeSectionHeader label={'Projects'} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {resume.projects.map((project, index) => {
          const programmingLanguage = project.programmingLanguages
            .map(p => p.value)
            .join(', ')

          return (
            <div className="w-full" key={index}>
              <div className="flex justify-between w-full">
                {project.link.length > 0 ? (
                  <span className="text-md font-bold">
                    {project.title}
                    {' - '}
                    <a href={`https://${project.link}`}>{project.link}</a>
                  </span>
                ) : (
                  <span className="text-md font-bold">{project.title}</span>
                )}
                {project.repository.length > 0 && (
                  <a
                    href={`https://${project.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs ${settings.accentColor} italic`}
                  >
                    GitHub: {`${project.repository}`}
                  </a>
                )}
              </div>
              <div className="flex justify-between w-full">
                <span className="text-xs text-gray-600">
                  {programmingLanguage}
                </span>
                {project.endDate.length > 0 ? (
                  <span className="text-xs italic text-gray-500">
                    {project.startDate}
                    {' - '}
                    {project.endDate}
                  </span>
                ) : (
                  <span className="text-xs italic text-gray-500">
                    {project.startDate}
                  </span>
                )}
              </div>
              <div className="flex ml-4">
                <ul className="flex flex-col list-disc">
                  {project.description.map((description, index) => (
                    <li key={index} className="text-xs text-gray-500">
                      {description.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
