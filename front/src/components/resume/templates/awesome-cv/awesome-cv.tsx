import { Resume } from "@/@types/resume";

interface AwesomeCVProps {
  resume: Resume;
}

export const AwesomeCV = ({ resume }: AwesomeCVProps) => {
  return (
    <div
      className="text-black"
      style={{
        fontFamily: "Roboto",
      }}
    >
      {resume.basics.name}
    </div>
  );
};
