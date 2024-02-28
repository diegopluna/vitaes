import { CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVLanguages(props: CVProps) {
  const { awesomeCV: settings } = props.settings;

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader
        label={props.languages.label}
        color={settings.accentColor}
      />
      <div className="flex flex-col items-start justify-start w-full">
        {props.languages.languages?.map((language, index) => (
          <div className="flex justify-between w-full" key={index}>
            <div className="flex flex-row ">
              <span className="text-xs mr-4">{language.language}</span>
              <span className="text-xs">
                <span className="font-bold">{language.proficiency}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
