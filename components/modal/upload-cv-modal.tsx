"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { isCV } from "@/lib/cv-helper";
import { Label } from "../ui/label";
import React from "react";
import { CVProps } from "@/types/cv-types";
import { Loader2 } from "lucide-react";
import { uploadCV } from "@/server/actions";
import { toast } from "sonner";

export default function UploadCV({ userId }: { userId: string }) {
  const [name, setName] = React.useState("");
  const [cv, setCV] = React.useState<CVProps | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function loadCV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (isCV(json)) {
            console.log(json);
            setCV(json as CVProps);
          } else {
            console.log("Invalid JSON format");
          }
        } catch (error) {
          console.log("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    if (!name) return;
    if (!cv) return;
    await uploadCV(name, cv, userId);
    setLoading(false);
    setCV(undefined);
    setName("");
    setOpen(false);
    toast.success("CV uploaded successfully");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Upload className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload CV</DialogTitle>
          <DialogDescription>
            Upload your CV from a JSON file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">File</Label>
            <Input
              type="file"
              accept=".json"
              className="col-span-3"
              onChange={loadCV}
            />
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button className="mt-2 mb-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading CV...
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Upload</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
