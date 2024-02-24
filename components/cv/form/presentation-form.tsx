"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useCV } from "../use-cv";
import { CVPresentationProps, CVProps } from "@/types/cv-types";


export function PresentationForm() {
    const {cv, setCV} = useCV();
    const {presentations} = cv;
    const updatePresentations = (value: Partial<CVProps["presentations"]>) => {
        setCV((prev: CVProps): CVProps => ({
            ...prev,
            presentations: {...prev.presentations, ...value},
        }));
    }
    const setPresentationsEnabled = (value: boolean) => {
        updatePresentations({enabled: value});
    }
    const setPresentationsLabel = (value: string) => {
        updatePresentations({label: value});
    }
    const setPresentations = (value: CVPresentationProps[]) => {
        updatePresentations({presentations: value});
    }
  return (
    <Card>
      <CardHeader className="text-lg font-bold">Presentations</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="presentationsEnabled">Enabled</Label>
            <Switch
              checked={presentations.enabled}
              onCheckedChange={setPresentationsEnabled}
            />
          </div>
          {presentations.enabled && (
            <div className="space-y-2">
              <Label htmlFor="presentationLabel">Label</Label>
              <Input
                id="presentationLabel"
                type="text"
                value={presentations.label}
                onChange={(e) => setPresentationsLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setPresentations([
                    ...presentations.presentations,
                    {
                      event: "",
                      role: "",
                      location: "",
                      date: "",
                      description: [],
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <Accordion type="single" collapsible className="w-full">
                <div className="space-y-2">
                  {presentations.presentations.map((presentation, index) => (
                    <AccordionItem key={index} value={index.toString()}>
                      <AccordionTrigger>
                        <div className="items-center justify-center">
                          <Button
                            className="mr-1"
                            variant={"ghost"}
                            onClick={() => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations.splice(index, 1);
                              setPresentations(newPresentations);
                            }}
                          >
                            <MinusCircle size={20} />
                          </Button>
                          {`Presentation - ${index + 1}`}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`presentationTitle-${index}`}
                          >
                            Event
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`presentationTitle-${index}`}
                            type="text"
                            value={presentation.event}
                            onChange={(e) => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations[index].event = e.target.value;
                              setPresentations(newPresentations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`presentationContent-${index}`}
                          >
                            Role
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`presentationContent-${index}`}
                            type="text"
                            value={presentation.role}
                            onChange={(e) => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations[index].role = e.target.value;
                              setPresentations(newPresentations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`presentationContent-${index}`}
                          >
                            Location
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`presentationContent-${index}`}
                            type="text"
                            value={presentation.location}
                            onChange={(e) => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations[index].location = e.target.value;
                              setPresentations(newPresentations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`presentationContent-${index}`}
                          >
                            Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`presentationContent-${index}`}
                            type="text"
                            value={presentation.date}
                            onChange={(e) => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations[index].date = e.target.value;
                              setPresentations(newPresentations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`presentationContent-${index}`}
                          >
                            Description
                          </Label>
                          {presentation.description.map(
                            (description, descriptionIndex) => (
                              <div
                                className="flex flex-row ml-1 w-11/12"
                                key={descriptionIndex}
                              >
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newPresentations =
                                      presentations.presentations.slice();
                                    newPresentations[index].description.splice(
                                      descriptionIndex,
                                      1
                                    );
                                    setPresentations(newPresentations);
                                  }}
                                >
                                  <MinusCircle size={16} />
                                </Button>
                                <Input
                                  key={descriptionIndex}
                                  id={`presentationContent-${index}`}
                                  type="text"
                                  value={description}
                                  onChange={(e) => {
                                    const newPresentations =
                                      presentations.presentations.slice();
                                    newPresentations[index].description[
                                      descriptionIndex
                                    ] = e.target.value;
                                    setPresentations(newPresentations);
                                  }}
                                />
                              </div>
                            )
                          )}
                          <Button
                            className="w-11/12 items-center justify-center"
                            variant={"ghost"}
                            onClick={() => {
                              const newPresentations =
                                presentations.presentations.slice();
                              newPresentations[index].description.push("");
                              setPresentations(newPresentations);
                            }}
                          >
                            <PlusCircle size={16} />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
