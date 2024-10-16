"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCV } from "../use-cv";
import { CVProps } from "@/types/cv-types";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function HonorForm() {
  const { cv, setCV } = useCV();
  const { honors } = cv;
  const updateHonors = (value: Partial<CVProps["honors"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        honors: { ...prev.honors, ...value },
      })
    );
  };
  const setHonorsEnabled = (value: boolean) => {
    updateHonors({ enabled: value });
  };
  const setHonorsLabel = (value: string) => {
    updateHonors({ label: value });
  };
  const setHonorsTypes = (value: CVProps["honors"]["honors"]) => {
    updateHonors({ honors: value });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(honors.honors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setHonorsTypes(items);
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Honors</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="honorsEnabled">Enabled</Label>
            <Switch
              checked={honors.enabled}
              onCheckedChange={setHonorsEnabled}
            />
          </div>
          {honors.enabled && (
            <div className="space-y-1">
              <Label htmlFor="honorsLabel">Label</Label>
              <Input
                id="honorsLabel"
                type="text"
                value={honors.label}
                onChange={(e) => setHonorsLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setHonorsTypes([
                    ...honors.honors,
                    {
                      label: "",
                      honors: [],
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="honors">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {honors.honors.map((honorsType, index) => (
                        <Draggable
                          key={index}
                          draggableId={`honorsType-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="space-y-2 border rounded-lg p-4"
                            >
                              <div className="items-center flex flex-row">
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newHonorsTypes = honors.honors.slice();
                                    newHonorsTypes.splice(index, 1);
                                    setHonorsTypes(newHonorsTypes);
                                  }}
                                >
                                  <MinusCircle />
                                </Button>
                                {`Type - ${index + 1}`}
                              </div>
                              <Label htmlFor="honorsLabel">Type Name</Label>
                              <Input
                                id="honorsTypeLabel"
                                type="text"
                                value={honors.honors[index].label}
                                onChange={(e) =>
                                  setHonorsTypes(
                                    honors.honors.map((honorsType, i) => {
                                      if (i === index) {
                                        return {
                                          ...honorsType,
                                          label: e.target.value,
                                        };
                                      }
                                      return honorsType;
                                    })
                                  )
                                }
                              />
                              <Button
                                className="w-full items-center justify-center"
                                variant={"ghost"}
                                onClick={() => {
                                  const newHonorsTypes = honors.honors.slice();
                                  newHonorsTypes[index].honors.push({
                                    year: "",
                                    position: "",
                                    honor: "",
                                    location: "",
                                  });
                                  setHonorsTypes(newHonorsTypes);
                                }}
                              >
                                <PlusCircle size={20} />
                              </Button>
                              <Accordion type="single" collapsible className="w-full">
                                <div className="space-y-2">
                                  {honors.honors[index].honors.map(
                                    (honor, honorIndex) => (
                                      <AccordionItem
                                        key={honorIndex}
                                        value={honorIndex.toString()}
                                      >
                                        <AccordionTrigger>
                                          <div className="items-center justify-center">
                                            <Button
                                              className="mr-1"
                                              variant={"ghost"}
                                              onClick={() => {
                                                const newHonorsTypes =
                                                  honors.honors.slice();
                                                newHonorsTypes[index].honors.splice(
                                                  honorIndex,
                                                  1
                                                );
                                                setHonorsTypes(newHonorsTypes);
                                              }}
                                            >
                                              <MinusCircle size={20} />
                                            </Button>
                                            {`Honor - ${honorIndex + 1}`}
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-2">
                                          <div className="flex flex-col space-y-1">
                                            <Label
                                              className="ml-1"
                                              htmlFor={`honorYear-${honorIndex}`}
                                            >
                                              Year
                                            </Label>
                                            <Input
                                              className="w-11/12 ml-1"
                                              id={`honorYear-${honorIndex}`}
                                              type="text"
                                              value={honor.year}
                                              onChange={(e) => {
                                                const newHonorsTypes =
                                                  honors.honors.slice();
                                                newHonorsTypes[index].honors[
                                                  honorIndex
                                                ].year = e.target.value;
                                                setHonorsTypes(newHonorsTypes);
                                              }}
                                            />
                                          </div>
                                          <div className="flex flex-col space-y-1">
                                            <Label
                                              className="ml-1"
                                              htmlFor={`honorPosition-${honorIndex}`}
                                            >
                                              Position
                                            </Label>
                                            <Input
                                              className="w-11/12 ml-1"
                                              id={`honorPosition-${honorIndex}`}
                                              type="text"
                                              value={honor.position}
                                              onChange={(e) => {
                                                const newHonorsTypes =
                                                  honors.honors.slice();
                                                newHonorsTypes[index].honors[
                                                  honorIndex
                                                ].position = e.target.value;
                                                setHonorsTypes(newHonorsTypes);
                                              }}
                                            />
                                          </div>
                                          <div className="flex flex-col space-y-1">
                                            <Label
                                              className="ml-1"
                                              htmlFor={`honorContent-${honorIndex}`}
                                            >
                                              Honor
                                            </Label>
                                            <Input
                                              className="w-11/12 ml-1"
                                              id={`honorContent-${honorIndex}`}
                                              type="text"
                                              value={honor.honor}
                                              onChange={(e) => {
                                                const newHonorsTypes =
                                                  honors.honors.slice();
                                                newHonorsTypes[index].honors[
                                                  honorIndex
                                                ].honor = e.target.value;
                                                setHonorsTypes(newHonorsTypes);
                                              }}
                                            />
                                          </div>
                                          <div className="flex flex-col space-y-1">
                                            <Label
                                              className="ml-1"
                                              htmlFor={`honorLocation-${honorIndex}`}
                                            >
                                              Location
                                            </Label>
                                            <Input
                                              className="w-11/12 ml-1"
                                              id={`honorLocation-${honorIndex}`}
                                              type="text"
                                              value={honor.location}
                                              onChange={(e) => {
                                                const newHonorsTypes =
                                                  honors.honors.slice();
                                                newHonorsTypes[index].honors[
                                                  honorIndex
                                                ].location = e.target.value;
                                                setHonorsTypes(newHonorsTypes);
                                              }}
                                            />
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    )
                                  )}
                                </div>
                              </Accordion>
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
