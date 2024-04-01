"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCV } from "../use-cv";
import { CVCertificationProps, CVProps } from "@/types/cv-types";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CertificatesForm() {
  const { cv, setCV } = useCV();
  const { certificates } = cv;
  const updateCertificates = (value: Partial<CVProps["certificates"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        certificates: { ...prev.certificates, ...value },
      })
    );
  };
  const setCertificatesEnabled = (value: boolean) => {
    updateCertificates({ enabled: value });
  };
  const setCertificatesLabel = (value: string) => {
    updateCertificates({ label: value });
  };
  const setCertificates = (value: CVProps["certificates"]["certificates"]) => {
    updateCertificates({ certificates: value });
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Certificates</CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Certificates</Label>
          <Switch
            checked={certificates.enabled}
            onCheckedChange={setCertificatesEnabled}
          />
        </div>
        {certificates.enabled && (
          <div className="space-y-2">
            <Label>Certificates Label</Label>
            <Input
              id="certificatesLabel"
              type="text"
              value={certificates.label}
              onChange={(e) => setCertificatesLabel(e.target.value)}
            />
            <Button
              className="w-full items-center justify-center"
              variant={"ghost"}
              onClick={() =>
                setCertificates([
                  ...certificates.certificates,
                  { title: "", issuer: "", date: "", descriptions: [] },
                ])
              }
            >
              <PlusCircle />
            </Button>
            <Accordion type="single" collapsible className="w-full">
              <div className="space-y-2">
                {certificates.certificates.map((certificate, index) => (
                  <AccordionItem key={index} value={index.toString()}>
                    <AccordionTrigger>
                      <div className="items-center justify-center">
                        <Button
                          className="mr-1"
                          variant={"ghost"}
                          onClick={() => {
                            const newCertificates =
                              certificates.certificates.slice();
                            newCertificates.splice(index, 1);
                            setCertificates(newCertificates);
                          }}
                        >
                          <MinusCircle size={20} />
                        </Button>
                        {certificate.title
                          ? certificate.title
                          : `Certificate-${index}`}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor={`certificateTitle-${index}`}>
                          Title
                        </Label>
                        <Input
                          id={`certificateTitle-${index}`}
                          className="w-11/12 ml-1"
                          type="text"
                          value={certificate.title}
                          onChange={(e) => {
                            const newCertificates = [
                              ...certificates.certificates,
                            ];
                            newCertificates[index].title = e.target.value;
                            setCertificates(newCertificates);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`certificateIssuer-${index}`}>
                          Issuer
                        </Label>
                        <Input
                          id={`certificateIssuer-${index}`}
                          type="text"
                          className="w-11/12 ml-1"
                          value={certificate.issuer}
                          onChange={(e) => {
                            const newCertificates = [
                              ...certificates.certificates,
                            ];
                            newCertificates[index].issuer = e.target.value;
                            setCertificates(newCertificates);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`certificateDate-${index}`}>Date</Label>
                        <Input
                          id={`certificateDate-${index}`}
                          type="text"
                          className="w-11/12 ml-1"
                          value={certificate.date}
                          onChange={(e) => {
                            const newCertificates = [
                              ...certificates.certificates,
                            ];
                            newCertificates[index].date = e.target.value;
                            setCertificates(newCertificates);
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor={`certificateDescriptions-${index}`}>
                          Descriptions
                        </Label>
                        {certificate.descriptions.map(
                          (description, descriptionIndex) => (
                            <div
                              className="flex flex-row ml-1 w-11/12"
                              key={descriptionIndex}
                            >
                              <Button
                                variant={"ghost"}
                                onClick={() => {
                                  const newCertificates = [
                                    ...certificates.certificates,
                                  ];
                                  newCertificates[index].descriptions.splice(
                                    descriptionIndex,
                                    1
                                  );
                                  setCertificates(newCertificates);
                                }}
                              >
                                <MinusCircle size={16} />
                              </Button>
                              <Input
                                id={`certificateDescription-${index}`}
                                type="text"
                                className="w-11/12 ml-1"
                                value={description}
                                onChange={(e) => {
                                  const newCertificates = [
                                    ...certificates.certificates,
                                  ];
                                  newCertificates[index].descriptions[
                                    descriptionIndex
                                  ] = e.target.value;
                                  setCertificates(newCertificates);
                                }}
                              />
                            </div>
                          )
                        )}
                        <Button
                          className="w-11/12 items-center justify-center"
                          variant={"ghost"}
                          onClick={() => {
                            const newCertificates = [
                              ...certificates.certificates,
                            ];
                            newCertificates[index].descriptions.push("");
                            setCertificates(newCertificates);
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
      </CardContent>
    </Card>
  );
}
