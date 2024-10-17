import { getResume } from "@/store/resume-store";
import { DisplayFrame } from "../display-frame/display-frame";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Resume } from "./resume";
import { ResumeForm } from "./resume-form";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

export const ResumeBuilder = () => {
  const resume = getResume();
  return (
    <ResizablePanelGroup className="min-w-[1000px] w-full border" direction="horizontal">
      <ResizablePanel className="min-w-[400px] flex h-full items-start justify-center p-6" defaultSize={50}>
        <ResumeForm />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="min-w-[190mm] flex flex-col place-content-center items-center" defaultSize={50}>
        <div className="flex flex-row gap-4 my-2">
            <Button>
              <Save className="mr-2" />
              Save
            </Button>
          </div>
        <DisplayFrame scale={0.75}>
          <Resume resume={resume} />
        </DisplayFrame>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
