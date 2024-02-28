import { CVEducationsProps, CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVEducation(props: CVProps) {
  const { awesomeCV: settings } = props.settings;
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.educations.label} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.educations.educations.map((education, index) => (
          <div className="w-full" key={index}>
            <div className="flex justify-between w-full">
              <span className="text-md font-bold">{education.school}</span>
              <span className={`text-xs italic ${settings.accentColor}`}>
                {education.location}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-600">
                {education.degree.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 italic ">
                {education.startDate}
                {" - "}
                {education.endDate}
              </span>
            </div>
            <div className="flex ml-4">
              <ul className="flex flex-col list-disc">
                {education.description.map((description, descriptionIndex) => (
                  <li key={descriptionIndex} className="text-xs text-gray-500">
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
