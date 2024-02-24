"use client";

import { CVProps } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

export function ProjectsForm() {
  const { cv, setCV } = useCV();
  const { projects } = cv;
  const updateProjects = (value: Partial<CVProps["projects"]>) => {
    setCV({
      ...cv,
      projects: { ...projects, ...value },
    });
  };
  const setProjectsEnabled = (value: boolean) => {
    updateProjects({ enabled: value });
  };

  const setProjectsLabel = (value: string) => {
    updateProjects({ label: value });
  };

  const setProjects = (value: CVProps["projects"]["projects"]) => {
    updateProjects({ projects: value });
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Projects</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="projects-enabled">Enabled</Label>
            <Switch
              id="projects-enabled"
              checked={projects.enabled}
              onCheckedChange={setProjectsEnabled}
            />
          </div>
          {projects.enabled && (
            <div className="space-y-2">
              <Label htmlFor="projects-label">Label</Label>
              <Input
                id="projects-label"
                type="text"
                value={projects.label}
                onChange={(e) => setProjectsLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() => {
                  setProjects([
                    ...projects.projects,
                    {
                      title: "",
                      programmingLanguages: [],
                      githubRepoEnabled: false,
                      githubRepo: "",
                      description: [],
                      linkEnabled: false,
                      link: "",
                      startDate: "",
                      endDateEnabled: false,
                      endDate: "",
                    },
                  ]);
                }}
              >
                <PlusCircle />
              </Button>
              <Accordion type="single" collapsible className="w-full">
                <div className="space-y-2">
                  {projects.projects.map((project, index) => (
                    <AccordionItem key={index} value={index.toString()}>
                      <AccordionTrigger>
                        <div className="items-center justify-center">
                          <Button
                            className="mr-1"
                            variant={"ghost"}
                            onClick={() => {
                              const newProjects = cv.projects.projects.slice();
                              newProjects.splice(index, 1);
                              setProjects(newProjects);
                            }}
                          >
                            <MinusCircle size={20} />
                          </Button>
                          {`Project - ${index + 1}`}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`projects-title-${index}`}
                          >
                            Title
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`projects-title-${index}`}
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const newProjects = cv.projects.projects.slice();
                              newProjects[index].title = e.target.value;
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`projects-programmingLanguages-${index}`}
                          >
                            Programming Languages
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`projects-programmingLanguages-${index}`}
                            type="text"
                            value={project.programmingLanguages.join(", ")}
                            onChange={(e) => {
                              const newProjects = cv.projects.projects.slice();
                              newProjects[index].programmingLanguages =
                                e.target.value.split(", ");
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-row justify-between">
                            <Label
                              className="ml-1"
                              htmlFor={`projects-githubRepoEnabled-${index}`}
                            >
                              GitHub Repo
                            </Label>
                            <Switch
                              className="mr-1"
                              id={`projects-githubRepoEnabled-${index}`}
                              checked={project.githubRepoEnabled}
                              onCheckedChange={(value) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].githubRepoEnabled = value;
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                          {project.githubRepoEnabled && (
                            <Input
                              className="w-11/12 ml-1"
                              id={`projects-githubRepo-${index}`}
                              type="text"
                              value={project.githubRepo}
                              onChange={(e) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].githubRepo = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          )}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-row justify-between">
                            <Label
                              className="ml-1"
                              htmlFor={`projects-linkEnabled-${index}`}
                            >
                              Link
                            </Label>
                            <Switch
                              className="mr-1"
                              id={`projects-linkEnabled-${index}`}
                              checked={project.linkEnabled}
                              onCheckedChange={(value) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].linkEnabled = value;
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                          {project.linkEnabled && (
                            <Input
                              className="w-11/12 ml-1"
                              id={`projects-link-${index}`}
                              type="text"
                              value={project.link}
                              onChange={(e) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].link = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          )}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`projects-startDate-${index}`}
                          >
                            Start Date
                          </Label>
                          <Input
                            className="w-11/12 ml-1"
                            id={`projects-startDate-${index}`}
                            type="text"
                            value={project.startDate}
                            onChange={(e) => {
                              const newProjects = cv.projects.projects.slice();
                              newProjects[index].startDate = e.target.value;
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex flex-row justify-between">
                            <Label
                              className="ml-1"
                              htmlFor={`projects-endDateEnabled-${index}`}
                            >
                              End Date
                            </Label>
                            <Switch
                              className="mr-1"
                              id={`projects-endDateEnabled-${index}`}
                              checked={project.endDateEnabled}
                              onCheckedChange={(value) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].endDateEnabled = value;
                                setProjects(newProjects);
                              }}
                            />
                          </div>
                          {project.endDateEnabled && (
                            <Input
                              className="w-11/12 ml-1"
                              id={`projects-endDate-${index}`}
                              type="text"
                              value={project.endDate}
                              onChange={(e) => {
                                const newProjects =
                                  cv.projects.projects.slice();
                                newProjects[index].endDate = e.target.value;
                                setProjects(newProjects);
                              }}
                            />
                          )}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Label
                            className="ml-1"
                            htmlFor={`projects-description-${index}`}
                          >
                            Description
                          </Label>
                          {project.description.map(
                            (description, descriptionIndex) => (
                              <div
                                key={descriptionIndex}
                                className="flex flex-row ml-1 w-11/12"
                              >
                                <Button
                                  className="ml-1"
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newProjects =
                                      cv.projects.projects.slice();
                                    newProjects[index].description.splice(
                                      descriptionIndex,
                                      1
                                    );
                                    setProjects(newProjects);
                                  }}
                                >
                                  <MinusCircle size={16} />
                                </Button>
                                <Input
                                  id={`projects-description-${index}-${descriptionIndex}`}
                                  type="text"
                                  value={description}
                                  onChange={(e) => {
                                    const newProjects =
                                      cv.projects.projects.slice();
                                    newProjects[index].description[
                                      descriptionIndex
                                    ] = e.target.value;
                                    setProjects(newProjects);
                                  }}
                                />
                              </div>
                            )
                          )}
                          <Button
                            className="w-11/12 items-center justify-center"
                            variant={"ghost"}
                            onClick={() => {
                              const newProjects = cv.projects.projects.slice();
                              newProjects[index].description.push("");
                              setProjects(newProjects);
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
