import { CVExperiencesProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVExperience(props: CVExperiencesProps) {
    return (
        <div className="flex flex-col items-start justify-start w-full mt-4">
            <CVSectionHeader label={props.label} />
            <div className="flex flex-col items-start justify-start w-full">
                {props.experiences.map((experience, index) => (
                    <div className="w-full" key={index}>
                        <div className="flex justify-between w-full">
                            <span className="text-md font-bold">{experience.company}</span>
                            <span className="text-xs italic text-[#0395de]">{experience.location}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-xs text-gray-600">{experience.position.toUpperCase()}</span>
                            <span className="text-xs text-gray-500 italic ">{experience.startDate}{' - '}{experience.endDate}</span>
                        </div>
                        <div className="flex ml-4">
                            <ul className="flex flex-col list-disc">
                                {experience.description.map((description, index) => (
                                    <li key={index} className="text-xs text-gray-500">{description}</li>
                                ))}
                            </ul>
                        </div>         
                    </div>
                ))}
            </div>
        </div>
    )
}