import { CVProps } from "@/types/cv-types";
import CVHeader from "./templates/awesome-cv/cv-header";
import CVSummary from "./templates/awesome-cv/cv-summary";
import CVExperience from "./templates/awesome-cv/cv-experience";
import CVHonors from "./templates/awesome-cv/cv-honors";
import CVPresentations from "./templates/awesome-cv/cv-presentation";
import CVWritings from "./templates/awesome-cv/cv-writing";
import CVCommittee from "./templates/awesome-cv/cv-committee";
import CVEducation from "./templates/awesome-cv/cv-education";
import A4CVOnly from "../a4-cvonly";
import AwesomeCV from "./templates/awesome-cv/awesome-cv";

type Props = {
    cv: CVProps;
}

export default function CVOnly({cv}: Props) {
  return (
    <A4CVOnly>
      <AwesomeCV cv={cv} />
    </A4CVOnly>
  );
}
