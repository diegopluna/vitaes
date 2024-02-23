"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CVExperienceProps,
  CVHeaderProps,
  CVProps,
  CVHonorTypeProps,
  CVPresentationProps,
  CVWritingProps,
  CVComitteeProps,
  CVEducationProps,
} from "@/types/cv-types";
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
  GraduationCap,
  Languages,
  Loader2,
  Medal,
  NotebookPen,
  Pen,
  PencilRuler,
  Presentation,
  ScrollText,
  UserRound,
  UsersRound,
  PlusCircle,
  MinusCircle,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useCV } from "./use-cv";

export default function CVForm() {
  const [loading, setLoading] = React.useState(false);
  const {
    cv,
    setAlignment,
    setFirstName,
    setLastName,
    setPhoneEnabled,
    setEmailEnabled,
    setHomepageEnabled,
    setGithubEnabled,
    setLinkedinEnabled,
    setGitlabEnabled,
    setTwitterEnabled,
    setQuoteEnabled,
    setPhone,
    setEmail,
    setHomepage,
    setGithub,
    setLinkedin,
    setGitlab,
    setTwitter,
    setQuote,
    setSummaryEnabled,
    setSummaryLabel,
    setSummaryContent,
    setExperienceEnabled,
    setExperienceLabel,
    setExperiences,
    setHonorsEnabled,

    setHonorsLabel,
    setHonorsTypes,
    setPresentationsEnabled,
    setPresentationsLabel,
    setPresentations,
    setWritingEnabled,
    setWritingLabel,
    setWritings,
    setCommitteeEnabled,
    setCommitteeLabel,
    setCommittees,
    setEducationEnabled,
    setEducationLabel,
    setEducations,
    setExtracurricularEnabled,
    setExtracurricularLabel,
    setExtracurriculars,
  } = useCV();

  const downloadCV = async () => {
    setLoading(true);
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cv),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cv.header.firstName}-EasyCV.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-w-[1000px] w-full rounded-lg border"
    >
      <ResizablePanel className="min-w-[400px]" defaultSize={50}>
        <div className="flex h-full items-start justify-center p-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-11">
              <TooltipProvider>
                <TabsTrigger value="personal">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <UserRound />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Personal Info & Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="summary">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ScrollText />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Summary</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="experience">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Briefcase />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Work Experience</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="honors">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Medal />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Honors & Awards</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="presentation">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Presentation />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Presentations</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="writing">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Pen />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Writings</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="committee">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <UsersRound />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Committees</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="education">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <GraduationCap />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Education</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="extracurricular">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NotebookPen />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Extracurricular Activities</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PencilRuler />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Projects</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger value="languages">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Languages />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Languages</p>
                    </TooltipContent>
                  </Tooltip>
                </TabsTrigger>
              </TooltipProvider>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>Personal Info & Settings</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="alignment">Alignment</Label>
                    <Select
                      value={cv.header.alignment}
                      onValueChange={setAlignment}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the header alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="start">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="end">Right</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={cv.header.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={cv.header.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="phone">Phone</Label>
                      <Switch
                        checked={cv.header.phoneEnabled}
                        onCheckedChange={setPhoneEnabled}
                      />
                    </div>
                    {cv.header.phoneEnabled && (
                      <Input
                        placeholder="Phone"
                        id="phone"
                        type="text"
                        value={cv.header.phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email</Label>
                      <Switch
                        checked={cv.header.emailEnabled}
                        onCheckedChange={setEmailEnabled}
                      />
                    </div>
                    {cv.header.emailEnabled && (
                      <Input
                        placeholder="Email"
                        id="email"
                        type="text"
                        value={cv.header.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="homepage">Homepage</Label>
                      <Switch
                        checked={cv.header.homepageEnabled}
                        onCheckedChange={setHomepageEnabled}
                      />
                    </div>
                    {cv.header.homepageEnabled && (
                      <Input
                        placeholder="Homepage"
                        id="homepage"
                        type="text"
                        value={cv.header.homepage}
                        onChange={(e) => setHomepage(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="github">Github</Label>
                      <Switch
                        checked={cv.header.githubEnabled}
                        onCheckedChange={setGithubEnabled}
                      />
                    </div>
                    {cv.header.githubEnabled && (
                      <Input
                        placeholder="Github"
                        id="github"
                        type="text"
                        value={cv.header.github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="linkedin">Linkedin</Label>
                      <Switch
                        checked={cv.header.linkedinEnabled}
                        onCheckedChange={setLinkedinEnabled}
                      />
                    </div>
                    {cv.header.linkedinEnabled && (
                      <Input
                        placeholder="Linkedin"
                        id="linkedin"
                        type="text"
                        value={cv.header.linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gitlab">Gitlab</Label>
                      <Switch
                        checked={cv.header.gitlabEnabled}
                        onCheckedChange={setGitlabEnabled}
                      />
                    </div>
                    {cv.header.gitlabEnabled && (
                      <Input
                        placeholder="Gitlab"
                        id="gitlab"
                        type="text"
                        value={cv.header.gitlab}
                        onChange={(e) => setGitlab(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Switch
                        checked={cv.header.twitterEnabled}
                        onCheckedChange={setTwitterEnabled}
                      />
                    </div>
                    {cv.header.twitterEnabled && (
                      <Input
                        placeholder="Twitter"
                        id="twitter"
                        type="text"
                        value={cv.header.twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="quote">Quote</Label>
                      <Switch
                        checked={cv.header.quoteEnabled}
                        onCheckedChange={setQuoteEnabled}
                      />
                    </div>
                    {cv.header.quoteEnabled && (
                      <Input
                        placeholder="Quote"
                        id="quote"
                        type="text"
                        value={cv.header.quote}
                        onChange={(e) => setQuote(e.target.value)}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="summary">
              <Card>
                <CardHeader>Summary</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="summaryEnabled">Enabled</Label>
                      <Switch
                        checked={cv.summaryEnabled}
                        onCheckedChange={setSummaryEnabled}
                      />
                    </div>
                    {cv.summaryEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="summaryLabel">Label</Label>
                        <Input
                          id="summaryLabel"
                          type="text"
                          value={cv.summary?.label}
                          onChange={(e) => setSummaryLabel(e.target.value)}
                        />
                        <Label htmlFor="summaryContent">Content</Label>
                        <Textarea
                          id="summaryContent"
                          value={cv.summary?.content}
                          onChange={(e) => setSummaryContent(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience">
              <Card>
                <CardHeader>Experience</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="experienceEnabled">Enabled</Label>
                      <Switch
                        checked={cv.experienceEnabled}
                        onCheckedChange={setExperienceEnabled}
                      />
                    </div>
                    {cv.experienceEnabled && (
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
                            {cv.experience.experiences.map(
                              (experience, index) => (
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
                                          newExperiences[index].company =
                                            e.target.value;
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
                                          newExperiences[index].location =
                                            e.target.value;
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
                                          newExperiences[index].position =
                                            e.target.value;
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
                                          newExperiences[index].startDate =
                                            e.target.value;
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
                                          newExperiences[index].endDate =
                                            e.target.value;
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
                                                newExperiences[
                                                  index
                                                ].description.splice(
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
                                                newExperiences[
                                                  index
                                                ].description[
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
                                          newExperiences[
                                            index
                                          ].description.push("");
                                          setExperiences(newExperiences);
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
            </TabsContent>
            <TabsContent value="honors">
              <Card>
                <CardHeader>Honors</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="honorsEnabled">Enabled</Label>
                      <Switch
                        checked={cv.honorsEnabled}
                        onCheckedChange={setHonorsEnabled}
                      />
                    </div>
                    {cv.honorsEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="honorsLabel">Label</Label>
                        <Input
                          id="honorsLabel"
                          type="text"
                          value={cv.honors.label}
                          onChange={(e) => setHonorsLabel(e.target.value)}
                        />
                        <Button
                          className="w-full items-center justify-center"
                          variant={"ghost"}
                          onClick={() =>
                            setHonorsTypes([
                              ...cv.honors.honors,
                              {
                                label: "",
                                honors: [],
                              },
                            ])
                          }
                        >
                          <PlusCircle />
                        </Button>
                        <div className="space-y-2">
                          {cv.honors.honors.map((honorsType, index) => (
                            <div
                              key={index}
                              className="space-y-2 border rounded-lg p-4"
                            >
                              <div className="items-center flex flex-row">
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    const newHonorsTypes =
                                      cv.honors.honors.slice();
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
                                value={cv.honors.honors[index].label}
                                onChange={(e) =>
                                  setHonorsTypes(
                                    cv.honors.honors.map((honorsType, i) => {
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
                                  const newHonorsTypes =
                                    cv.honors.honors.slice();
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
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                              >
                                <div className="space-y-2">
                                  {cv.honors.honors[index].honors.map(
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
                                                  cv.honors.honors.slice();
                                                newHonorsTypes[
                                                  index
                                                ].honors.splice(honorIndex, 1);
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
                                                  cv.honors.honors.slice();
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
                                                  cv.honors.honors.slice();
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
                                                  cv.honors.honors.slice();
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
                                                  cv.honors.honors.slice();
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
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="presentation">
              <Card>
                <CardHeader>Presentations</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="presentationsEnabled">Enabled</Label>
                      <Switch
                        checked={cv.presentationsEnabled}
                        onCheckedChange={setPresentationsEnabled}
                      />
                    </div>
                    {cv.presentationsEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="presentationLabel">Label</Label>
                        <Input
                          id="presentationLabel"
                          type="text"
                          value={cv.presentations.label}
                          onChange={(e) =>
                            setPresentationsLabel(e.target.value)
                          }
                        />
                        <Button
                          className="w-full items-center justify-center"
                          variant={"ghost"}
                          onClick={() =>
                            setPresentations([
                              ...cv.presentations.presentations,
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
                            {cv.presentations.presentations.map(
                              (presentation, index) => (
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
                                          const newPresentations =
                                            cv.presentations.presentations.slice();
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
                                            cv.presentations.presentations.slice();
                                          newPresentations[index].event =
                                            e.target.value;
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
                                            cv.presentations.presentations.slice();
                                          newPresentations[index].role =
                                            e.target.value;
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
                                            cv.presentations.presentations.slice();
                                          newPresentations[index].location =
                                            e.target.value;
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
                                            cv.presentations.presentations.slice();
                                          newPresentations[index].date =
                                            e.target.value;
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
                                                  cv.presentations.presentations.slice();
                                                newPresentations[
                                                  index
                                                ].description.splice(
                                                  descriptionIndex,
                                                  1
                                                );
                                                setPresentations(
                                                  newPresentations
                                                );
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
                                                  cv.presentations.presentations.slice();
                                                newPresentations[
                                                  index
                                                ].description[
                                                  descriptionIndex
                                                ] = e.target.value;
                                                setPresentations(
                                                  newPresentations
                                                );
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
                                            cv.presentations.presentations.slice();
                                          newPresentations[
                                            index
                                          ].description.push("");
                                          setPresentations(newPresentations);
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
            </TabsContent>
            <TabsContent value="writing">
              <Card>
                <CardHeader>Writings</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="writingEnabled">Enabled</Label>
                      <Switch
                        checked={cv.writingEnabled}
                        onCheckedChange={setWritingEnabled}
                      />
                    </div>
                    {cv.writingEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="writingLabel">Label</Label>
                        <Input
                          id="writingLabel"
                          type="text"
                          value={cv.writings.label}
                          onChange={(e) => setWritingLabel(e.target.value)}
                        />
                        <Button
                          className="w-full items-center justify-center"
                          variant={"ghost"}
                          onClick={() =>
                            setWritings([
                              ...cv.writings.writings,
                              {
                                title: "",
                                role: "",
                                medium: "",
                                startDate: "",
                                endDate: "",
                                descriptions: [],
                              },
                            ])
                          }
                        >
                          <PlusCircle />
                        </Button>
                        <Accordion type="single" collapsible className="w-full">
                          <div className="space-y-2">
                            {cv.writings.writings.map((writing, index) => (
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
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings.splice(index, 1);
                                        setWritings(newWritings);
                                      }}
                                    >
                                      <MinusCircle size={20} />
                                    </Button>
                                    {`Writing - ${index + 1}`}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2">
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingTitle-${index}`}
                                    >
                                      Title
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`writingTitle-${index}`}
                                      type="text"
                                      value={writing.title}
                                      onChange={(e) => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].title =
                                          e.target.value;
                                        setWritings(newWritings);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingContent-${index}`}
                                    >
                                      Role
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`writingContent-${index}`}
                                      type="text"
                                      value={writing.role}
                                      onChange={(e) => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].role =
                                          e.target.value;
                                        setWritings(newWritings);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingContent-${index}`}
                                    >
                                      Medium
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`writingContent-${index}`}
                                      type="text"
                                      value={writing.medium}
                                      onChange={(e) => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].medium =
                                          e.target.value;
                                        setWritings(newWritings);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingContent-${index}`}
                                    >
                                      Start Date
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`writingContent-${index}`}
                                      type="text"
                                      value={writing.startDate}
                                      onChange={(e) => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].startDate =
                                          e.target.value;
                                        setWritings(newWritings);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingContent-${index}`}
                                    >
                                      End Date
                                    </Label>
                                    <Input
                                      className="w-11/12 ml-1"
                                      id={`writingContent-${index}`}
                                      type="text"
                                      value={writing.endDate}
                                      onChange={(e) => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].endDate =
                                          e.target.value;
                                        setWritings(newWritings);
                                      }}
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <Label
                                      className="ml-1"
                                      htmlFor={`writingContent-${index}`}
                                    >
                                      Description
                                    </Label>
                                    {writing.descriptions.map(
                                      (description, descriptionIndex) => (
                                        <div
                                          className="flex flex-row ml-1 w-11/12"
                                          key={descriptionIndex}
                                        >
                                          <Button
                                            variant={"ghost"}
                                            onClick={() => {
                                              const newWritings =
                                                cv.writings.writings.slice();
                                              newWritings[
                                                index
                                              ].descriptions.splice(
                                                descriptionIndex,
                                                1
                                              );
                                              setWritings(newWritings);
                                            }}
                                          >
                                            <MinusCircle size={16} />
                                          </Button>
                                          <Input
                                            key={descriptionIndex}
                                            id={`writingContent-${index}`}
                                            type="text"
                                            value={description}
                                            onChange={(e) => {
                                              const newWritings =
                                                cv.writings.writings.slice();
                                              newWritings[index].descriptions[
                                                descriptionIndex
                                              ] = e.target.value;
                                              setWritings(newWritings);
                                            }}
                                          />
                                        </div>
                                      )
                                    )}
                                    <Button
                                      className="w-11/12 items-center justify-center"
                                      variant={"ghost"}
                                      onClick={() => {
                                        const newWritings =
                                          cv.writings.writings.slice();
                                        newWritings[index].descriptions.push(
                                          ""
                                        );
                                        setWritings(newWritings);
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
            </TabsContent>
            <TabsContent value="committee">
              <Card>
                <CardHeader>Committee</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="committeeEnabled">Enabled</Label>
                      <Switch
                        checked={cv.committeeEnabled}
                        onCheckedChange={setCommitteeEnabled}
                      />
                    </div>
                    {cv.committeeEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="committeeLabel">Label</Label>
                        <Input
                          id="committeeLabel"
                          type="text"
                          value={cv.committees.label}
                          onChange={(e) => setCommitteeLabel(e.target.value)}
                        />
                        <Button
                          className="w-full items-center justify-center"
                          variant={"ghost"}
                          onClick={() =>
                            setCommittees([
                              ...cv.committees.committees,
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
                        <Accordion type="single" collapsible className="w-full">
                          <div className="space-y-2">
                            {cv.committees.committees.map(
                              (committee, index) => (
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
                                          const newCommittees =
                                            cv.committees.committees.slice();
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
                                            cv.committees.committees.slice();
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
                                            cv.committees.committees.slice();
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
                                            cv.committees.committees.slice();
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
                                            cv.committees.committees.slice();
                                          newCommittees[index].location =
                                            e.target.value;
                                          setCommittees(newCommittees);
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card>
                <CardHeader>Education</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="educationEnabled">Enabled</Label>
                      <Switch
                        checked={cv.educationEnabled}
                        onCheckedChange={setEducationEnabled}
                      />
                    </div>
                    {cv.educationEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="educationLabel">Label</Label>
                        <Input
                          id="educationLabel"
                          type="text"
                          value={cv.educations.label}
                          onChange={(e) => setEducationLabel(e.target.value)}
                        />
                        <Button
                          className="w-full items-center justify-center"
                          variant={"ghost"}
                          onClick={() =>
                            setEducations([
                              ...cv.educations.educations,
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
                            {cv.educations.educations.map(
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
                                            cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
                                                  cv.educations.educations.slice();
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
                                                  cv.educations.educations.slice();
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
                                            cv.educations.educations.slice();
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
            </TabsContent>
            <TabsContent value="extracurricular">
              <Card>
                <CardHeader>Extracurricular</CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="extracurricularEnabled">Enabled</Label>
                      <Switch
                        checked={cv.extracurricularEnabled}
                        onCheckedChange={setExtracurricularEnabled}
                      />
                    </div>
                    {cv.extracurricularEnabled && (
                      <div className="space-y-1">
                        <Label htmlFor="extracurricularLabel">Label</Label>
                        <Input
                          id="extracurricularLabel"
                          type="text"
                          value={cv.extracurriculars.label}
                          onChange={(e) =>
                            setExtracurricularLabel(e.target.value)
                          }
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
                        <Accordion type="single" collapsible className="w-full">
                          <div className="space-y-2">
                            {cv.extracurriculars.extracurriculars.map(
                              (extracurricular, index) => (
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
                                          const newExtracurriculars =
                                            cv.extracurriculars.extracurriculars.slice();
                                          newExtracurriculars.splice(index, 1);
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                          newExtracurriculars[
                                            index
                                          ].organization = e.target.value;
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
                                                ].description.splice(
                                                  descriptionIndex,
                                                  1
                                                );
                                                setExtracurriculars(
                                                  newExtracurriculars
                                                );
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
                                                newExtracurriculars[
                                                  index
                                                ].description[
                                                  descriptionIndex
                                                ] = e.target.value;
                                                setExtracurriculars(
                                                  newExtracurriculars
                                                );
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
                                          newExtracurriculars[
                                            index
                                          ].description.push("");
                                          setExtracurriculars(
                                            newExtracurriculars
                                          );
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
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        className="min-w-[190mm] flex place-content-center items-center"
        defaultSize={50}
      >
        <Button
          variant="secondary"
          className="right-4 top-16 fixed z-10"
          onClick={downloadCV}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Generating PDF..." : "Download"}
        </Button>
        <DisplayFrame>
          <CV cv={cv} />
        </DisplayFrame>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
