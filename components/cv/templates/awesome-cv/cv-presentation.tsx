import { CVPresentationsProps, CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";
import { CVColor } from "@/types/cv-types";

export default function CVPresentations(props: CVProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.presentations.label} color={props.settings.accentColor! as CVColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.presentations.presentations.map((presentation, index) => (
          <div className="w-full" key={index}>
            <div className="flex justify-between w-full">
              <span className="text-md font-bold">{presentation.event}</span>
              <span className={`text-xs italic ${props.settings.accentColor! as CVColor}`}>
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
