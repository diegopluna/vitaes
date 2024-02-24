import { CVCertificatesProps } from "@/types/cv-types";
import CVSectionHeader from "./cv-section-header";

export default function CVCertificates(props: CVCertificatesProps) {
    return (
        <div className="flex flex-col items-start justify-start w-full mt-4">
            <CVSectionHeader label={props.label} />
            <div className="flex flex-col items-start justify-start w-full">
                {props.certificates?.map((certificate, index) => (
                    <div className="w-full" key={index}>
                        <div className="flex justify-between w-full">
                            <span className="text-md font-bold">{certificate.title}</span>
                                                  
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-sm text-gray-700">
                                    {certificate.issuer}
                            </span>
                            <span className="text-xs italic text-gray-500">
                                {certificate.date}
                            </span>
                        </div>
                        <div className="flex ml-4">
                            <ul className="flex flex-col list-disc">
                                {certificate.descriptions?.map((description, index) => (
                                    <li key={index} className="text-xs text-gray-500">
                                        {description}
                                    </li>
                                ))}
                            </ul>
                        </div>                         
                    </div>
                ))}
            </div>
        </div>
    )
}