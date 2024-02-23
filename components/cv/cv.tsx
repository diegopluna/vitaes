import { CVProps } from "@/types/cv-types";
import A4Paper from "../a4-paper";
import CVHeader from "./templates/awesome-cv/cv-header";
import CVSummary from "./templates/awesome-cv/cv-summary";
import CVExperience from "./templates/awesome-cv/cv-experience";
import CVHonors from "./templates/awesome-cv/cv-honors";
import CVPresentations from "./templates/awesome-cv/cv-presentation";
import CVWritings from "./templates/awesome-cv/cv-writing";
import CVCommittee from "./templates/awesome-cv/cv-committee";
import CVEducation from "./templates/awesome-cv/cv-education";
import CVExtracurricular from "./templates/awesome-cv/cv-extracurricular";

export default function CV(props: CVProps) {
  return (
    <A4Paper>
      <CVHeader {...props.header} />
      {props.summaryEnabled && <CVSummary {...props.summary!} />}
      {props.experienceEnabled && <CVExperience {...props.experience!} />}
      {props.honorsEnabled && <CVHonors {...props.honors!} />}
      {props.presentationsEnabled && (
        <CVPresentations {...props.presentations!} />
      )}
      {props.writingEnabled && <CVWritings {...props.writings!} />}
      {props.committeeEnabled && <CVCommittee {...props.committees!} />}
      {props.educationEnabled && <CVEducation {...props.educations!} />}
      {props.extracurricularEnabled && (
        <CVExtracurricular {...props.extracurriculars!} />
      )}
    </A4Paper>
  );
}
