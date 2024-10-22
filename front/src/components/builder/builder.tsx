import { getResume } from "@/store/resume-store";
import { DisplayFrame } from "../display-frame/display-frame";
import { Resume } from "../resume/resume";
import { Card } from "../ui/card";

export const Builder = () => {
  const resume = getResume();

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="flex flex-1 flex-row overflow-auto">
      </div>
      <div className="hidden md:block flex-1">
        {
          /* <DisplayFrame scale={0.75}>
          <Resume resume={resume} />
        </DisplayFrame> */
        }
        WE GUCCI
      </div>
    </div>
  );
};
