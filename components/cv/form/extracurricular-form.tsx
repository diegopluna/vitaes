import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CVProps, CVExtracurricularProps } from "@/types/cv-types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useCV } from "../use-cv";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function ExtracurricularForm() {
  const { cv, setCV } = useCV();
  const { extracurriculars } = cv;
  const updateExtracurriculars = (
    value: Partial<CVProps["extracurriculars"]>
  ) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        extracurriculars: { ...prev.extracurriculars, ...value },
      })
    );
  };
  const setExtracurricularEnabled = (value: boolean) => {
    updateExtracurriculars({ enabled: value });
  };
  const setExtracurricularLabel = (value: string) => {
    updateExtracurriculars({ label: value });
  };
  const setExtracurriculars = (value: CVExtracurricularProps[]) => {
    updateExtracurriculars({ extracurriculars: value });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(extracurriculars.extracurriculars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExtracurriculars(items);
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Extracurricular</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="extracurricularEnabled">Enabled</Label>
            <Switch
              checked={cv.extracurriculars.enabled}
              onCheckedChange={setExtracurricularEnabled}
            />
          </div>
          {cv.extracurriculars.enabled && (
            <div className="space-y-1">
              <Label htmlFor="extracurricularLabel">Label</Label>
              <Input
                id="extracurricularLabel"
                type="text"
                value={cv.extracurriculars.label}
                onChange={(e) => setExtracurricularLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setExtracurriculars([
                    ...cv.extracurriculars.extracurriculars,
                    {
                      role: "",
                      organization: "",
                      startDate: "",
                      endDate: "",
                      location: "",
                      description: [],
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="extracurriculars">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {cv.extracurriculars.extracurriculars.map(
                        (extracurricular, index) => (
                          <Draggable
                            key={index}
                            draggableId={`extracurricular-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <AccordionItem key={index} value={index.toString()}>
                                  <AccordionTrigger>
                                    <div className="items-center justify-center">
                                      <Button
                                        className="mr-1"
                                        variant={"ghost"}
                                        onClick={() => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars.splice(index, 1);
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      >
                                        <MinusCircle size={20} />
                                      </Button>
                                      {`Extracurricular - ${index + 1}`}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="space-y-2">
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularRole-${index}`}
                                      >
                                        Role
                                      </Label>
                                      <Input
                                        className="w-11/12 ml-1"
                                        id={`extracurricularRole-${index}`}
                                        type="text"
                                        value={extracurricular.role}
                                        onChange={(e) => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].role =
                                            e.target.value;
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularOrganization-${index}`}
                                      >
                                        Organization
                                      </Label>
                                      <Input
                                        className="w-11/12 ml-1"
                                        id={`extracurricularOrganization-${index}`}
                                        type="text"
                                        value={extracurricular.organization}
                                        onChange={(e) => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].organization =
                                            e.target.value;
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularStartDate-${index}`}
                                      >
                                        Start Date
                                      </Label>
                                      <Input
                                        className="w-11/12 ml-1"
                                        id={`extracurricularStartDate-${index}`}
                                        type="text"
                                        value={extracurricular.startDate}
                                        onChange={(e) => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].startDate =
                                            e.target.value;
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularEndDate-${index}`}
                                      >
                                        End Date
                                      </Label>
                                      <Input
                                        className="w-11/12 ml-1"
                                        id={`extracurricularEndDate-${index}`}
                                        type="text"
                                        value={extracurricular.endDate}
                                        onChange={(e) => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].endDate =
                                            e.target.value;
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularLocation-${index}`}
                                      >
                                        Location
                                      </Label>
                                      <Input
                                        className="w-11/12 ml-1"
                                        id={`extracurricularLocation-${index}`}
                                        type="text"
                                        value={extracurricular.location}
                                        onChange={(e) => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].location =
                                            e.target.value;
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <Label
                                        className="ml-1"
                                        htmlFor={`extracurricularContent-${index}`}
                                      >
                                        Description
                                      </Label>
                                      {extracurricular.description.map(
                                        (description, descriptionIndex) => (
                                          <div
                                            className="flex flex-row ml-1 w-11/12"
                                            key={descriptionIndex}
                                          >
                                            <Button
                                              variant={"ghost"}
                                              onClick={() => {
                                                const newExtracurriculars =
                                                  cv.extracurriculars.extracurriculars.slice();
                                                newExtracurriculars[
                                                  index
                                                ].description.splice(descriptionIndex, 1);
                                                setExtracurriculars(newExtracurriculars);
                                              }}
                                            >
                                              <MinusCircle size={16} />
                                            </Button>
                                            <Input
                                              key={descriptionIndex}
                                              id={`extracurricularContent-${index}`}
                                              type="text"
                                              value={description}
                                              onChange={(e) => {
                                                const newExtracurriculars =
                                                  cv.extracurriculars.extracurriculars.slice();
                                                newExtracurriculars[index].description[
                                                  descriptionIndex
                                                ] = e.target.value;
                                                setExtracurriculars(newExtracurriculars);
                                              }}
                                            />
                                          </div>
                                        )
                                      )}
                                      <Button
                                        className="w-11/12 items-center justify-center"
                                        variant={"ghost"}
                                        onClick={() => {
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars[index].description.push("");
                                          setExtracurriculars(newExtracurriculars);
                                        }}
                                      >
                                        <PlusCircle size={16} />
                                      </Button>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
