import { CVProps } from "@/types/cv-types";
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
