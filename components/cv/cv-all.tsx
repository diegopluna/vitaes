import { CVProps } from "@/types/cv-types";
import UbagaCV from "@/components/cv/templates/ubaga-cv/ubaga-cv";
import AwesomeCV from "./templates/awesome-cv/awesome-cv";

type Props = {cv: CVProps}

export default function CvAll({cv}: Props) {
  return (
    <>
        {cv.settings.model === "awesome-cv" && <AwesomeCV cv={cv} />}
        {cv.settings.model === "ubaga-cv" && <UbagaCV cv={cv} />}
    </>
  );
}