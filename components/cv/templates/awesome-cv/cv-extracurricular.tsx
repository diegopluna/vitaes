import { CVExtracurricularsProps, CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVExtracurricular(props: CVProps) {
  const { awesomeCV: settings } = props.settings;
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.extracurriculars.label} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.extracurriculars.extracurriculars.map((extracurricular, index) => (
          <div className="w-full" key={index}>
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
                {" - "}
                {extracurricular.endDate}
              </span>
            </div>
            <div className="flex ml-4">
              <ul className="flex flex-col list-disc">
                {extracurricular.description.map((description, index) => (
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
