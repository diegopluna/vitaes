import { CVProps } from "@/types/cv-types";
import CVHeader from "./cv-header";
import CVSummary from "./cv-summary";
import CVExperience from "./cv-experience";
import CVHonors from "./cv-honors";
import CVPresentations from "./cv-presentation";
import CVWritings from "./cv-writing";
import CVCommittee from "./cv-committee";
import CVEducation from "./cv-education";
import CVExtracurricular from "./cv-extracurricular";

type Props = {
    cv: CVProps;
}

export default function AwesomeCV({cv}: Props) {
  return (
    <>
      <CVHeader {...cv.header} />
      {cv.summaryEnabled && <CVSummary {...cv.summary!} />}
      {cv.experienceEnabled && <CVExperience {...cv.experience!} />}
      {cv.honorsEnabled && <CVHonors {...cv.honors!} />}
      {cv.presentationsEnabled && (
        <CVPresentations {...cv.presentations!} />
      )}
      {cv.writingEnabled && <CVWritings {...cv.writings!} />}
      {cv.committeeEnabled && <CVCommittee {...cv.committees!} />}
      {cv.educationEnabled && <CVEducation {...cv.educations!} />}
      {cv.extracurricularEnabled && (
        <CVExtracurricular {...cv.extracurriculars!} />
      )}
    </>
  );
}
