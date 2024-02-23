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
      {cv.summary.enabled && <CVSummary {...cv.summary!} />}
      {cv.experience.enabled && <CVExperience {...cv.experience!} />}
      {cv.honors.enabled && <CVHonors {...cv.honors!} />}
      {cv.presentations.enabled && (
        <CVPresentations {...cv.presentations!} />
      )}
      {cv.writings.enabled && <CVWritings {...cv.writings!} />}
      {cv.committees.enabled && <CVCommittee {...cv.committees!} />}
      {cv.educations.enabled && <CVEducation {...cv.educations!} />}
      {cv.extracurriculars.enabled && (
        <CVExtracurricular {...cv.extracurriculars!} />
      )}
    </>
  );
}
