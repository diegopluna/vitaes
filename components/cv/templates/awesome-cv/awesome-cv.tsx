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
import CVProjects from "./cv-projects";
import CVLanguages from "./cv-languages";
import CVCertificates from "./cv-certificates";

type Props = {
  cv: CVProps;
};

export default function AwesomeCV({ cv }: Props) {
  return (
    <>
      <CVHeader {...cv} />
      {cv.summary.enabled && <CVSummary {...cv} />}
      {cv.experience.enabled && <CVExperience {...cv} />}
      {cv.honors.enabled && <CVHonors {...cv} />}
      {cv.presentations.enabled && <CVPresentations {...cv} />}
      {cv.writings.enabled && <CVWritings {...cv} />}
      {cv.committees.enabled && <CVCommittee {...cv} />}
      {cv.educations.enabled && <CVEducation {...cv} />}
      {cv.extracurriculars.enabled && (
        <CVExtracurricular {...cv} />
      )}
      {cv.projects.enabled && <CVProjects {...cv} />}
      {cv.languages.enabled && <CVLanguages {...cv} />}
      {cv.certificates.enabled && <CVCertificates {...cv} />}
    </>
  );
}
