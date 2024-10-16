"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCV } from "../use-cv";
import { CVProps } from "@/types/cv-types";
import { Textarea } from "@/components/ui/textarea";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(summary.items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCV({ ...cv, summary: { ...summary, items } });
    };
    
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="summary">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      <Draggable draggableId="summaryContent" index={0}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Textarea
                              id="summaryContent"
                              value={summary?.content}
                              onChange={(e) => setSummaryContent(e.target.value)}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
