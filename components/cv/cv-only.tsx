import { CVProps } from "@/types/cv-types";
import CVHeader from "./cv-header";
import CVSummary from "./cv-summary";
import CVExperience from "./cv-experience";
import CVHonors from "./cv-honors";
import CVPresentations from "./cv-presentation";
import CVWritings from "./cv-writing";
import CVCommittee from "./cv-committee";
import CVEducation from "./cv-education";
import A4CVOnly from "../a4-cvonly";

export default function CVOnly(props : CVProps) {
    return (
        <A4CVOnly>
            <CVHeader {...props.header} />
            {props.summaryEnabled && <CVSummary {...props.summary!} />}
            {props.experienceEnabled && <CVExperience {...props.experience!} />}
            {props.honorsEnabled && <CVHonors {...props.honors!} />}
            {props.presentationsEnabled && <CVPresentations {...props.presentations!} />}
            {props.writingEnabled && <CVWritings {...props.writings!} />}
            {props.committeeEnabled && <CVCommittee {...props.committees!} />}
            {props.educationEnabled && <CVEducation {...props.educations!} />}
        </A4CVOnly>
    )
}