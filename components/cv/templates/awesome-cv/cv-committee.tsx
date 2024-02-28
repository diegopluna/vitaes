import {  CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVCommittee(props: CVProps) {
  const { awesomeCV: settings } = props.settings;
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.committees.label} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.committees.committees?.map((committee, index) => (
          <div className="flex justify-between w-full" key={index}>
            <div className="flex flex-row ">
              <span className="text-xs mr-4">{committee.year}</span>
              <span className="text-xs">
                <span className="font-bold">{committee.position}, </span>
                {committee.organization}
              </span>
            </div>
            <span className={`text-xs italic ${settings.accentColor}`}>
              {committee.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
