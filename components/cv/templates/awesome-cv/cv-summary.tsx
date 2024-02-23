import { CVSummaryProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVSummary(props: CVSummaryProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <CVSectionHeader label={props.label} />
      <p className="text-xs text-gray-500">{props.content}</p>
    </div>
  );
}
