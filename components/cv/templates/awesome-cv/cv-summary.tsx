import {  CVProps, } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVSummary(props: CVProps) {
  const {awesomeCV: settings} = props.settings;
  
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <CVSectionHeader label={props.summary.label} color={settings.accentColor} />
      <p className="text-xs text-gray-500">{props.summary.content}</p>
    </div>
  );
}
