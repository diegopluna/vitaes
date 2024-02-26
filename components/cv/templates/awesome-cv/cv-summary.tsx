import { CVColor, CVProps, CVSummaryProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVSummary(props: CVProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <CVSectionHeader label={props.summary.label} color={props.settings.accentColor! as CVColor} />
      <p className="text-xs text-gray-500">{props.summary.content}</p>
    </div>
  );
}
