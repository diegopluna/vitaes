import { CVProps } from "@/types/cv-types";
import A4Paper from "../a4-paper";
import CVHeader from "./cv-header";
import CVSummary from "./cv-summary";
import CVExperience from "./cv-experience";
import CVHonors from "./cv-honors";
import CVPresentations from "./cv-presentation";
import CVWritings from "./cv-writing";
import CVCommittee from "./cv-committee";
import CVEducation from "./cv-education";
import CVExtracurricular from "./cv-extracurricular";

export default function CV(props : CVProps) {
    return (
        <A4Paper>
            <CVHeader {...props.header} />
            {props.summaryEnabled && <CVSummary {...props.summary!} />}
            {props.experienceEnabled && <CVExperience {...props.experience!} />}
            {props.honorsEnabled && <CVHonors {...props.honors!} />}
            {props.presentationsEnabled && <CVPresentations {...props.presentations!} />}
            {props.writingEnabled && <CVWritings {...props.writings!} />}
            {props.committeeEnabled && <CVCommittee {...props.committees!} />}
            {props.educationEnabled && <CVEducation {...props.educations!} />}
            {props.extracurricularEnabled && <CVExtracurricular {...props.extracurriculars!} />}
        </A4Paper>
    )
}