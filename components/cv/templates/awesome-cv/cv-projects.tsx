import { CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVProjects(props: CVProps) {
  const {awesomeCV: settings} = props.settings;

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.projects.label} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.projects.projects.map((project, index) => (
          <div className="w-full" key={index}>
            <div className="flex justify-between w-full">
              {project.linkEnabled && project.link ? (
                <span className="text-md font-bold">
                  {project.title}
                  {" - "}
                  <a href={`https://${project.link}`}>{project.link}</a>
                </span>
              ) : (
                <span className="text-md font-bold">{project.title}</span>
              )}
              {project.githubRepoEnabled && project.githubRepo && (
                <a
                  href={`https://${project.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs ${settings.accentColor} italic`}
                >
                  GitHub: {`${project.githubRepo}`}
                </a>
              )}
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-600">
                {project.programmingLanguages.join(", ")}
              </span>
              {project.endDateEnabled ? (
                <span className="text-xs italic text-gray-500">
                  {project.startDate}
                  {" - "}
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
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
