"use client";

import { CVProps } from "@/types/cv-types";
import A4Paper from "../a4-paper";
import CvAll from "@/components/cv/cv-all";

type Props = {
    cv: CVProps;
}

export default function CV({cv}: Props) {
  return (
    <A4Paper >
      <CvAll cv={cv} />
    </A4Paper>
  );
}
