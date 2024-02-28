import { CVProps } from "@/types/cv-types";

type Props = {
    cv: CVProps;
  };
  
export default function UbagaCV({ cv }: Props) {
    return (
        <div style={{color:cv.settings.ubagaCV.textColor}}>
            <h1>{cv.header.firstName} {cv.header.lastName}</h1>
        </div>
    );
}