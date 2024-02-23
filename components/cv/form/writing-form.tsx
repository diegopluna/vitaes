import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { PlusCircle, MinusCircle } from "lucide-react";
import { CVProps, CVWritingProps } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function WritingForm() {
    const { cv, setCV } = useCV();
    const { writings } = cv;
    const updateWritings = (value: Partial<CVProps["writings"]>) => {
        setCV(
            (prev: CVProps): CVProps => ({
                ...prev,
                writings: { ...prev.writings, ...value },
            })
        );
    };
    const setWritingEnabled = (value: boolean) => {
        updateWritings({ enabled: value });
    };
    const setWritingLabel = (value: string) => {
        updateWritings({ label: value });
    };
    const setWritings = (value: CVWritingProps[]) => {
        updateWritings({ writings: value });
    };
    
  return <Card>
  <CardHeader>Writings</CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="writingEnabled">Enabled</Label>
        <Switch
          checked={writings.enabled}
          onCheckedChange={setWritingEnabled}
        />
      </div>
      {writings.enabled && (
        <div className="space-y-1">
          <Label htmlFor="writingLabel">Label</Label>
          <Input
            id="writingLabel"
            type="text"
            value={writings.label}
            onChange={(e) => setWritingLabel(e.target.value)}
          />
          <Button
            className="w-full items-center justify-center"
            variant={"ghost"}
            onClick={() =>
              setWritings([
                ...writings.writings,
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
              {writings.writings.map((writing, index) => (
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
                            writings.writings.slice();
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
                            writings.writings.slice();
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
                            writings.writings.slice();
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
                            writings.writings.slice();
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
                            writings.writings.slice();
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
                            writings.writings.slice();
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
                                  writings.writings.slice();
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
                                  writings.writings.slice();
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
                            writings.writings.slice();
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
}