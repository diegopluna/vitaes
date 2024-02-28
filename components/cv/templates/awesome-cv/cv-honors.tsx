import { CVHonorsProps, CVProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVHonors(props: CVProps) {
  const { awesomeCV: settings } = props.settings;
  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <CVSectionHeader label={props.honors.label} color={settings.accentColor} />
      <div className="flex flex-col items-start justify-start w-full">
        {props.honors.honors?.map((honorTypes, index) => (
          <div className="w-full" key={index}>
            <span className="text-md mt-4">
              {honorTypes.label.toUpperCase()}
            </span>
            {honorTypes.honors.map((honor, honorIndex) => (
              <div className="flex justify-between w-full" key={honorIndex}>
                <div className="flex flex-row ">
                  <span className="text-xs mr-4">{honor.year}</span>
                  <span className="text-xs">
                    <span className="font-bold">{honor.position}, </span>
                    {honor.honor}
                  </span>
                </div>
                <span className={`text-xs italic ${settings.accentColor}`}>
                  {honor.location}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
