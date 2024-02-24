"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCV } from "../use-cv";
import { CVProps } from "@/types/cv-types";
import { Textarea } from "@/components/ui/textarea";

export function SummaryForm() {
    const {cv, setCV} = useCV();
    const {summary} = cv;
    const updateSummary = (value: Partial<CVProps["summary"]>) => {
        setCV((prev: CVProps): CVProps => ({
            ...prev,
            summary: {...prev.summary, ...value},
        }));
    }
    const setSummaryEnabled = (value: boolean) => {
        updateSummary({enabled: value});
    }
    const setSummaryLabel = (value: string) => {
        updateSummary({label: value});
    }
    const setSummaryContent = (value: string) => {
        updateSummary({content: value});
    }
    
  return (
    <Card>
      <CardHeader className="text-lg font-bold">Summary</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="summaryEnabled">Enabled</Label>
            <Switch
              checked={summary.enabled}
              onCheckedChange={setSummaryEnabled}
            />
          </div>
          {summary.enabled && (
            <div className="space-y-1">
              <Label htmlFor="summaryLabel">Label</Label>
              <Input
                id="summaryLabel"
                type="text"
                value={summary?.label}
                onChange={(e) => setSummaryLabel(e.target.value)}
              />
              <Label htmlFor="summaryContent">Content</Label>
              <Textarea
                id="summaryContent"
                value={summary?.content}
                onChange={(e) => setSummaryContent(e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
