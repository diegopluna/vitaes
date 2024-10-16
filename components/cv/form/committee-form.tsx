"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCV } from "../use-cv";
import { CVProps, CVComitteeProps } from "@/types/cv-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function CommitteeForm() {
  const { cv, setCV } = useCV();
  const { committees } = cv;
  const updateCommittees = (value: Partial<CVProps["committees"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        committees: { ...prev.committees, ...value },
      })
    );
  };
  const setCommitteeEnabled = (value: boolean) => {
    updateCommittees({ enabled: value });
  };
  const setCommitteeLabel = (value: string) => {
    updateCommittees({ label: value });
  };
  const setCommittees = (value: CVComitteeProps[]) => {
    updateCommittees({ committees: value });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(committees.committees);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCommittees(items);
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Committee</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="committeeEnabled">Enabled</Label>
            <Switch
              checked={committees.enabled}
              onCheckedChange={setCommitteeEnabled}
            />
          </div>
          {committees.enabled && (
            <div className="space-y-1">
              <Label htmlFor="committeeLabel">Label</Label>
              <Input
                id="committeeLabel"
                type="text"
                value={committees.label}
                onChange={(e) => setCommitteeLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setCommittees([
                    ...committees.committees,
                    {
                      year: "",
                      position: "",
                      organization: "",
                      location: "",
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="committees">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {committees.committees.map((committee, index) => (
                        <Draggable
                          key={index}
                          draggableId={`committee-${index}`}
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
                                        const newCommittees =
                                          committees.committees.slice();
                                        newCommittees.splice(index, 1);
                                        setCommittees(newCommittees);
                                      }}
                                    >
                                      <MinusCircle size={20} />
                                    </Button>
                                    {`Committee - ${index + 1}`}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2">
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`committeeYear-${index}`}
                                    >
                                      Year
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`committeeYear-${index}`}
                                      type="text"
                                      value={committee.year}
                                      onChange={(e) => {
                                        const newCommittees =
                                          committees.committees.slice();
                                        newCommittees[index].year =
                                          e.target.value;
                                        setCommittees(newCommittees);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`committeePosition-${index}`}
                                    >
                                      Position
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`committeePosition-${index}`}
                                      type="text"
                                      value={committee.position}
                                      onChange={(e) => {
                                        const newCommittees =
                                          committees.committees.slice();
                                        newCommittees[index].position =
                                          e.target.value;
                                        setCommittees(newCommittees);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`committeeOrganization-${index}`}
                                    >
                                      Organization
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`committeeOrganization-${index}`}
                                      type="text"
                                      value={committee.organization}
                                      onChange={(e) => {
                                        const newCommittees =
                                          committees.committees.slice();
                                        newCommittees[index].organization =
                                          e.target.value;
                                        setCommittees(newCommittees);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`committeeLocation-${index}`}
                                    >
                                      Location
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`committeeLocation-${index}`}
                                      type="text"
                                      value={committee.location}
                                      onChange={(e) => {
                                        const newCommittees =
                                          committees.committees.slice();
                                        newCommittees[index].location =
                                          e.target.value;
                                        setCommittees(newCommittees);
                                      }}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </div>
                          )}
                        </Draggable>
                      ))}
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
