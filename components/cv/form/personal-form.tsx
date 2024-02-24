"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCV } from "../use-cv";
import { CVHeaderAlignment, CVProps } from "@/types/cv-types";

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

  const setAlignment = (value: CVHeaderAlignment) => {
    updateHeader({ alignment: value });
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

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Personal Info & Settings</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="alignment">Alignment</Label>
          <Select value={header.alignment} onValueChange={setAlignment}>
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
            value={header.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={header.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
      </CardContent>
    </Card>
  );
}
