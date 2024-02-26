import { CVCommitteesProps, CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";
import { CVColor } from "@/types/cv-types";

export default function CVCommittee(props: CVProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.committees.label} color={props.settings.accentColor! as CVColor} />
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
            <span className={`text-xs italic ${props.settings.accentColor! as CVColor}`}>
              {committee.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
