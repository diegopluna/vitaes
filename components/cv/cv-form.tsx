"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CV from "@/components/cv/cv";
import DisplayFrame from "@/components/display-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  ChevronDown,
  FileCheck,
  GraduationCap,
  Languages,
  Loader2,
  Medal,
  NotebookPen,
  Pen,
  PencilRuler,
  Presentation,
  ScrollText,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCV } from "./use-cv";
import { PersonalForm } from "./form/personal-form";
import { SummaryForm } from "./form/summary-form";
import { ExperienceForm } from "./form/experience-form";
import { HonorForm } from "./form/honor-form";
import { PresentationForm } from "./form/presentation-form";
import { WritingForm } from "./form/writing-form";
import { CommitteeForm } from "./form/committee-form";
import { ExtracurricularForm } from "./form/extracurricular-form";
import { EducationForm } from "./form/education-form";
import { ProjectsForm } from "./form/projects-form";
import LanguageForm from "./form/language-form";
import CertificatesForm from "./form/certificates-form";
import CVSettingsForm from "./form/cv-settings-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner"


function TabTriggerHelper({
  icon,
  id,
  tooltip,
}: {
  icon: React.ReactNode;
  id: string;
  tooltip: string;
}) {
  return (
    <TabsTrigger value={id}>
      <Tooltip>
        <TooltipTrigger asChild>{icon}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TabsTrigger>
  );
}

export default function CVForm() {
  const [loading, setLoading] = React.useState(false);
  const { cv } = useCV();
  const downloadCV = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cv),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cv.header.firstName}-Vitaes.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("PDF generated successfully")
    } catch (error) {
      toast.error("Failed to generate PDF")
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  const downloadCVJSON = async () => {
    setLoading(true);
    try {
      const json = JSON.stringify(cv);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cv.header.firstName}-Vitaes.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("JSON generated successfully");
    } catch (error) {
      toast.error("Failed to generate JSON");
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-w-[1000px] w-full rounded-lg border"
    >
      <ResizablePanel className="min-w-[400px]" defaultSize={50}>
        <div className="flex h-full items-start justify-center p-6">
          <Tabs defaultValue="personal" className="flex flex-row w-full">
            <TabsList className="mt-2 mr-2 grid h-full grid-rows-13">
              <TooltipProvider>
                <TabTriggerHelper
                  icon={<UserRound />}
                  id="personal"
                  tooltip="Personal Info"
                />
                <TabTriggerHelper
                  icon={<ScrollText />}
                  id="summary"
                  tooltip="Summary"
                />
                <TabTriggerHelper
                  icon={<Briefcase />}
                  id="experience"
                  tooltip="Work Experience"
                />
                <TabTriggerHelper
                  icon={<Medal />}
                  id="honors"
                  tooltip="Honors & Awards"
                />
                <TabTriggerHelper
                  icon={<Presentation />}
                  id="presentation"
                  tooltip="Presentations"
                />
                <TabTriggerHelper
                  icon={<Pen />}
                  id="writing"
                  tooltip="Writings"
                />
                <TabTriggerHelper
                  icon={<UsersRound />}
                  id="committee"
                  tooltip="Committees"
                />
                <TabTriggerHelper
                  icon={<GraduationCap />}
                  id="education"
                  tooltip="Education"
                />
                <TabTriggerHelper
                  icon={<NotebookPen />}
                  id="extracurricular"
                  tooltip="Extracurricular Activities"
                />
                <TabTriggerHelper
                  icon={<PencilRuler />}
                  id="projects"
                  tooltip="Projects"
                />
                <TabTriggerHelper
                  icon={<Languages />}
                  id="languages"
                  tooltip="Languages"
                />
                <TabTriggerHelper
                  icon={<FileCheck />}
                  id="certificates"
                  tooltip="Certificates"
                />
                <TabTriggerHelper
                  icon={<Settings />}
                  id="settings"
                  tooltip="Settings"
                />
              </TooltipProvider>
            </TabsList>
            <TabsContent className="w-full" value="personal">
              <PersonalForm />
            </TabsContent>
            <TabsContent className="w-full" value="summary">
              <SummaryForm />
            </TabsContent>
            <TabsContent className="w-full" value="experience">
              <ExperienceForm />
            </TabsContent>
            <TabsContent className="w-full" value="honors">
              <HonorForm />
            </TabsContent>
            <TabsContent className="w-full" value="presentation">
              <PresentationForm />
            </TabsContent>
            <TabsContent className="w-full" value="writing">
              <WritingForm />
            </TabsContent>
            <TabsContent className="w-full" value="committee">
              <CommitteeForm />
            </TabsContent>
            <TabsContent className="w-full" value="education">
              <EducationForm />
            </TabsContent>
            <TabsContent className="w-full" value="extracurricular">
              <ExtracurricularForm />
            </TabsContent>
            <TabsContent className="w-full" value="projects">
              <ProjectsForm />
            </TabsContent>
            <TabsContent className="w-full" value="languages">
              <LanguageForm />
            </TabsContent>
            <TabsContent className="w-full" value="certificates">
              <CertificatesForm />
            </TabsContent>
            <TabsContent className="w-full" value="settings">
              <CVSettingsForm />
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        className="min-w-[190mm] flex flex-col place-content-center items-center"
        defaultSize={50}
      >
        {loading ? (
          <Button variant="secondary" className="mt-2 mb-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating CV...
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="mt-2 mb-2">
                Download as
                <ChevronDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={downloadCV}>PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={downloadCVJSON}>
                  JSON
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DisplayFrame scale={0.75}>
          <CV cv={cv} />
        </DisplayFrame>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
