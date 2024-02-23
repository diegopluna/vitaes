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

export function ExperienceForm() {
  const { cv, setCV } = useCV();
  const { experience } = cv;
  const updateExperience = (value: Partial<CVProps["experience"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        experience: { ...prev.experience, ...value },
      })
    );
  };
  const setExperienceEnabled = (value: boolean) => {
    updateExperience({ enabled: value });
  };
  const setExperienceLabel = (value: string) => {
    updateExperience({ label: value });
  };
  const setExperiences = (value: CVProps["experience"]["experiences"]) => {
    updateExperience({ experiences: value });
  };

  return (
    <Card>
      <CardHeader>Experience</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="experienceEnabled">Enabled</Label>
            <Switch
              checked={experience.enabled}
              onCheckedChange={setExperienceEnabled}
            />
          </div>
          {experience.enabled && (
            <div className="space-y-2">
              <Label htmlFor="experienceLabel">Label</Label>
              <Input
                id="experienceLabel"
                type="text"
                value={cv.experience?.label}
                onChange={(e) => setExperienceLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setExperiences([
                    ...cv.experience.experiences,
                    {
                      company: "",
                      location: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: [],
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <Accordion type="single" collapsible className="w-full">
                <div className="space-y-2">
                  {cv.experience.experiences.map((experience, index) => (
                    <AccordionItem key={index} value={index.toString()}>
                      <AccordionTrigger>
                        <div className="items-center justify-center">
                          <Button
                            className="mr-1"
                            variant={"ghost"}
                            onClick={() => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences.splice(index, 1);
                              setExperiences(newExperiences);
                            }}
                          >
                            <MinusCircle size={20} />
                          </Button>
                          {`Company - ${index + 1}`}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceTitle-${index}`}
                          >
                            Company Name
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`experienceTitle-${index}`}
                            type="text"
                            value={experience.company}
                            onChange={(e) => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].company = e.target.value;
                              setExperiences(newExperiences);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceContent-${index}`}
                          >
                            Location
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`experienceContent-${index}`}
                            type="text"
                            value={experience.location}
                            onChange={(e) => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].location = e.target.value;
                              setExperiences(newExperiences);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceContent-${index}`}
                          >
                            Position
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`experienceContent-${index}`}
                            type="text"
                            value={experience.position}
                            onChange={(e) => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].position = e.target.value;
                              setExperiences(newExperiences);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceContent-${index}`}
                          >
                            Start Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`experienceContent-${index}`}
                            type="text"
                            value={experience.startDate}
                            onChange={(e) => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].startDate = e.target.value;
                              setExperiences(newExperiences);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceContent-${index}`}
                          >
                            End Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`experienceContent-${index}`}
                            type="text"
                            value={experience.endDate}
                            onChange={(e) => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].endDate = e.target.value;
                              setExperiences(newExperiences);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`experienceContent-${index}`}
                          >
                            Description
                          </Label>
                          {experience.description.map(
                            (description, descriptionIndex) => (
                              <div
                                className="flex flex-row ml-1 w-11/12"
                                key={descriptionIndex}
                              >
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newExperiences =
                                      cv.experience.experiences.slice();
                                    newExperiences[index].description.splice(
                                      descriptionIndex,
                                      1
                                    );
                                    setExperiences(newExperiences);
                                  }}
                                >
                                  <MinusCircle size={16} />
                                </Button>
                                <Input
                                  key={descriptionIndex}
                                  id={`experienceContent-${index}`}
                                  type="text"
                                  value={description}
                                  onChange={(e) => {
                                    const newExperiences =
                                      cv.experience.experiences.slice();
                                    newExperiences[index].description[
                                      descriptionIndex
                                    ] = e.target.value;
                                    setExperiences(newExperiences);
                                  }}
                                />
                              </div>
                            )
                          )}
                          <Button
                            className="w-11/12 items-center justify-center"
                            variant={"ghost"}
                            onClick={() => {
                              const newExperiences =
                                cv.experience.experiences.slice();
                              newExperiences[index].description.push("");
                              setExperiences(newExperiences);
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
