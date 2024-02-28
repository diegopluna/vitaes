import { CVProps } from "@/types/cv-types";
import A4Paper from "../a4-paper";
import AwesomeCV from "./templates/awesome-cv/awesome-cv";
import UbagaCV from "./templates/ubaga-cv/ubaga-cv";

type Props = {
    cv: CVProps;
}

export default function CV({cv}: Props) {
  return (
    <A4Paper>
      <UbagaCV cv={cv} />
    </A4Paper>
  );
}
