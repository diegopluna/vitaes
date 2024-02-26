import { CVProps, CVWritingsProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";
import { CVColor } from "@/types/cv-types";

export default function CVWritings(props: CVProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.writings.label} color={props.settings.accentColor! as CVColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.writings.writings.map((writing, index) => (
          <div className="w-full" key={index}>
            <div className="flex justify-between w-full">
              <span className="text-md font-bold">{writing.title}</span>
              <span className={`text-xs italic ${props.settings.accentColor! as CVColor}`}>
                {writing.medium}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-xs text-gray-600">
                {writing.role.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 italic ">
                {writing.startDate}
                {" - "}
                {writing.endDate}
              </span>
            </div>
            <div className="flex ml-4">
              <ul className="flex flex-col list-disc">
                {writing.descriptions.map((description, index) => (
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
