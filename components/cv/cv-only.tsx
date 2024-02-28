"use client";

import { CVProps } from "@/types/cv-types";
import A4CVOnly from "../a4-cvonly";
import CvAll from "./cv-all";

type Props = {
    cv: CVProps;
}

export default function CVOnly({cv}: Props) {
  return (
    <A4CVOnly>
      <CvAll cv={cv} />
    </A4CVOnly>
  );
}
