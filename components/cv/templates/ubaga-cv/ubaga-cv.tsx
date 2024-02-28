import { CVProps } from "@/types/cv-types";

type Props = {
    cv: CVProps;
  };
  
export default function UbagaCV({ cv }: Props) {
    return (
        <div className="text-black">
            <h1>{cv.header.email}</h1>
            <h5>{cv.header.phone}</h5>
        </div>
    );
}