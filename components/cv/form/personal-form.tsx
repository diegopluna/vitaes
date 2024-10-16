"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCV } from "../use-cv";
import { CVProps } from "@/types/cv-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function PersonalForm() {
  const { cv, setCV } = useCV();
  const { header } = cv;
  const updateHeader = (value: Partial<CVProps["header"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        header: { ...prev.header, ...value },
      })
    );
  };

  const setFirstName = (value: string) => {
    updateHeader({ firstName: value });
  };
  const setLastName = (value: string) => {
    updateHeader({ lastName: value });
  };
  const setPhoneEnabled = (value: boolean) => {
    updateHeader({ phoneEnabled: value });
  };
  const setPhone = (value: string) => {
    updateHeader({ phone: value });
  };
  const setEmailEnabled = (value: boolean) => {
    updateHeader({ emailEnabled: value });
  };
  const setEmail = (value: string) => {
    updateHeader({ email: value });
  };
  const setHomepageEnabled = (value: boolean) => {
    updateHeader({ homepageEnabled: value });
  };
  const setHomepage = (value: string) => {
    updateHeader({ homepage: value });
  };
  const setGithubEnabled = (value: boolean) => {
    updateHeader({ githubEnabled: value });
  };
  const setGithub = (value: string) => {
    updateHeader({ github: value });
  };
  const setLinkedinEnabled = (value: boolean) => {
    updateHeader({ linkedinEnabled: value });
  };
  const setLinkedin = (value: string) => {
    updateHeader({ linkedin: value });
  };
  const setGitlabEnabled = (value: boolean) => {
    updateHeader({ gitlabEnabled: value });
  };
  const setGitlab = (value: string) => {
    updateHeader({ gitlab: value });
  };
  const setTwitterEnabled = (value: boolean) => {
    updateHeader({ twitterEnabled: value });
  };
  const setTwitter = (value: string) => {
    updateHeader({ twitter: value });
  };
  const setQuoteEnabled = (value: boolean) => {
    updateHeader({ quoteEnabled: value });
  };
  const setQuote = (value: string) => {
    updateHeader({ quote: value });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(header.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCV({ ...cv, header: { ...header, items } });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card>
        <CardHeader className="text-lg font-bold">Personal Info</CardHeader>
        <CardContent className="space-y-2">
          <Droppable droppableId="personalInfo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable draggableId="firstName" index={0}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={header.firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="lastName" index={1}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={header.lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="phone" index={2}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="phone">Phone</Label>
                          <Switch
                            checked={header.phoneEnabled}
                            onCheckedChange={setPhoneEnabled}
                          />
                        </div>
                        {header.phoneEnabled && (
                          <Input
                            placeholder="Phone"
                            id="phone"
                            type="text"
                            value={header.phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="email" index={3}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email">Email</Label>
                          <Switch
                            checked={header.emailEnabled}
                            onCheckedChange={setEmailEnabled}
                          />
                        </div>
                        {header.emailEnabled && (
                          <Input
                            placeholder="Email"
                            id="email"
                            type="text"
                            value={header.email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="homepage" index={4}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="homepage">Homepage</Label>
                          <Switch
                            checked={header.homepageEnabled}
                            onCheckedChange={setHomepageEnabled}
                          />
                        </div>
                        {header.homepageEnabled && (
                          <Input
                            placeholder="Homepage"
                            id="homepage"
                            type="text"
                            value={header.homepage}
                            onChange={(e) => setHomepage(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="github" index={5}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="github">Github</Label>
                          <Switch
                            checked={header.githubEnabled}
                            onCheckedChange={setGithubEnabled}
                          />
                        </div>
                        {header.githubEnabled && (
                          <Input
                            placeholder="Github"
                            id="github"
                            type="text"
                            value={header.github}
                            onChange={(e) => setGithub(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="linkedin" index={6}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="linkedin">Linkedin</Label>
                          <Switch
                            checked={header.linkedinEnabled}
                            onCheckedChange={setLinkedinEnabled}
                          />
                        </div>
                        {header.linkedinEnabled && (
                          <Input
                            placeholder="Linkedin"
                            id="linkedin"
                            type="text"
                            value={header.linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="gitlab" index={7}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="gitlab">Gitlab</Label>
                          <Switch
                            checked={header.gitlabEnabled}
                            onCheckedChange={setGitlabEnabled}
                          />
                        </div>
                        {header.gitlabEnabled && (
                          <Input
                            placeholder="Gitlab"
                            id="gitlab"
                            type="text"
                            value={header.gitlab}
                            onChange={(e) => setGitlab(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="twitter" index={8}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Switch
                            checked={header.twitterEnabled}
                            onCheckedChange={setTwitterEnabled}
                          />
                        </div>
                        {header.twitterEnabled && (
                          <Input
                            placeholder="Twitter"
                            id="twitter"
                            type="text"
                            value={header.twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="quote" index={9}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="quote">Quote</Label>
                          <Switch
                            checked={header.quoteEnabled}
                            onCheckedChange={setQuoteEnabled}
                          />
                        </div>
                        {header.quoteEnabled && (
                          <Input
                            placeholder="Quote"
                            id="quote"
                            type="text"
                            value={header.quote}
                            onChange={(e) => setQuote(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </DragDropContext>
  );
}
