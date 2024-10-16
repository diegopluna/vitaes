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
  FileCheck,
  GraduationCap,
  Languages,
  Medal,
  NotebookPen,
  Pen,
  PencilRuler,
  Presentation,
  ScrollText,
  Settings,
  UserRound,
  UsersRound,
  Save,
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
import CVSettingsForm from "./form/settings-form";
import { toast } from "sonner";
import { CVProps } from "@/types/cv-types";
import { Session } from "next-auth";
import ExportCVModal from "../modal/export-cv-modal";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateCV, uploadCV } from "@/server/actions";
import kendallRoyCV from "./example-cvs/kendall-roy";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

export default function CVForm({
  cvData = undefined,
  name = undefined,
  session = null,
  id = undefined,
}: {
  cvData: CVProps | undefined;
  name: String | undefined;
  session: Session | null;
  id: string | undefined;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { cv, setCV } = useCV();
  const [cvName, setCVName] = React.useState(name ? name : "My CV");

  React.useEffect(() => {
    if (cvData !== undefined) {
      setCV(cvData);
    }
  }, [cvData, setCV]);

  async function saveCV() {
    setLoading(true);
    try {
      if (session?.user) {
        if (cvData !== undefined && id !== undefined) {
          await updateCV(id, cvName as string, cv);
          toast.success("CV updated successfully");
        } else {
          await uploadCV(cvName as string, cv, session.user.id!);
          toast.success("CV saved successfully");
        }
        setCV(kendallRoyCV);
      } else {
        throw new Error("User not logged in");
      }
    } catch (error) {
      toast.error("Failed to save CV");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(cv.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCV({ ...cv, items });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              <Droppable droppableId="tabs">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-full"
                  >
                    <Draggable draggableId="personal" index={0}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="personal">
                            <PersonalForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="summary" index={1}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="summary">
                            <SummaryForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="experience" index={2}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="experience">
                            <ExperienceForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="honors" index={3}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="honors">
                            <HonorForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="presentation" index={4}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="presentation">
                            <PresentationForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="writing" index={5}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="writing">
                            <WritingForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="committee" index={6}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="committee">
                            <CommitteeForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="education" index={7}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="education">
                            <EducationForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="extracurricular" index={8}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="extracurricular">
                            <ExtracurricularForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="projects" index={9}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="projects">
                            <ProjectsForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="languages" index={10}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="languages">
                            <LanguageForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="certificates" index={11}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="certificates">
                            <CertificatesForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="settings" index={12}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TabsContent value="settings">
                            <CVSettingsForm />
                          </TabsContent>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className="min-w-[190mm] flex flex-col place-content-center items-center"
          defaultSize={50}
        >
          <div className="flex flex-row gap-4 my-2">
            <ExportCVModal cv={cv} name={cvName} />
            {session?.user && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant={"default"}>
                    <Save className="mr-2" />
                    Save
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save CV</DialogTitle>
                    <DialogDescription>
                      Save your CV to the cloud.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 mt-4">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={cvName as string}
                      onChange={(e) => setCVName(e.target.value)}
                    />
                    <Button variant={"outline"} size={"lg"} onClick={saveCV}>
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <DisplayFrame scale={0.75}>
            <CV cv={cv} />
          </DisplayFrame>
        </ResizablePanel>
      </ResizablePanelGroup>
    </DragDropContext>
  );
}
