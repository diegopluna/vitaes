import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCV } from "../use-cv";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CVEducationProps, CVProps } from "@/types/cv-types";
import { Input } from "@/components/ui/input";

export function EducationForm() {
    const { cv, setCV } = useCV();
    const { educations } = cv;
    const updateEducations = (value: Partial<CVProps["educations"]>) => {
        setCV((prev: CVProps): CVProps => ({
            ...prev,
            educations: { ...prev.educations, ...value },
        }));
    }
    const setEducationEnabled = (value: boolean) => {
        updateEducations({ enabled: value });
    }
    const setEducationLabel = (value: string) => {
        updateEducations({ label: value });
    }
    const setEducations = (value: CVEducationProps[]) => {
        updateEducations({ educations: value });
    }
    

    return <Card>
    <CardHeader>Education</CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="educationEnabled">Enabled</Label>
          <Switch
            checked={educations.enabled}
            onCheckedChange={setEducationEnabled}
          />
        </div>
        {educations.enabled && (
          <div className="space-y-1">
            <Label htmlFor="educationLabel">Label</Label>
            <Input
              id="educationLabel"
              type="text"
              value={educations.label}
              onChange={(e) => setEducationLabel(e.target.value)}
            />
            <Button
              className="w-full items-center justify-center"
              variant={"ghost"}
              onClick={() =>
                setEducations([
                  ...educations.educations,
                  {
                    degree: "",
                    school: "",
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
            <Accordion type="single" collapsible className="w-full">
              <div className="space-y-2">
                {educations.educations.map(
                  (education, index) => (
                    <AccordionItem
                      key={index}
                      value={index.toString()}
                    >
                      <AccordionTrigger>
                        <div className="items-center justify-center">
                          <Button
                            className="mr-1"
                            variant={"ghost"}
                            onClick={() => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations.splice(index, 1);
                              setEducations(newEducations);
                            }}
                          >
                            <MinusCircle size={20} />
                          </Button>
                          {`Education - ${index + 1}`}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationDegree-${index}`}
                          >
                            Degree
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`educationDegree-${index}`}
                            type="text"
                            value={education.degree}
                            onChange={(e) => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].degree =
                                e.target.value;
                              setEducations(newEducations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationSchool-${index}`}
                          >
                            School
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`educationSchool-${index}`}
                            type="text"
                            value={education.school}
                            onChange={(e) => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].school =
                                e.target.value;
                              setEducations(newEducations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationStartDate-${index}`}
                          >
                            Start Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`educationStartDate-${index}`}
                            type="text"
                            value={education.startDate}
                            onChange={(e) => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].startDate =
                                e.target.value;
                              setEducations(newEducations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationEndDate-${index}`}
                          >
                            End Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`educationEndDate-${index}`}
                            type="text"
                            value={education.endDate}
                            onChange={(e) => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].endDate =
                                e.target.value;
                              setEducations(newEducations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationLocation-${index}`}
                          >
                            Location
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`educationLocation-${index}`}
                            type="text"
                            value={education.location}
                            onChange={(e) => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].location =
                                e.target.value;
                              setEducations(newEducations);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`educationContent-${index}`}
                          >
                            Description
                          </Label>
                          {education.description.map(
                            (description, descriptionIndex) => (
                              <div
                                className="flex flex-row ml-1 w-11/12"
                                key={descriptionIndex}
                              >
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newEducations =
                                      educations.educations.slice();
                                    newEducations[
                                      index
                                    ].description.splice(
                                      descriptionIndex,
                                      1
                                    );
                                    setEducations(newEducations);
                                  }}
                                >
                                  <MinusCircle size={16} />
                                </Button>
                                <Input
                                  key={descriptionIndex}
                                  id={`educationContent-${index}`}
                                  type="text"
                                  value={description}
                                  onChange={(e) => {
                                    const newEducations =
                                      educations.educations.slice();
                                    newEducations[
                                      index
                                    ].description[
                                      descriptionIndex
                                    ] = e.target.value;
                                    setEducations(newEducations);
                                  }}
                                />
                              </div>
                            )
                          )}
                          <Button
                            className="w-11/12 items-center justify-center"
                            variant={"ghost"}
                            onClick={() => {
                              const newEducations =
                                educations.educations.slice();
                              newEducations[index].description.push(
                                ""
                              );
                              setEducations(newEducations);
                            }}
                          >
                            <PlusCircle size={16} />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </div>
            </Accordion>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
}