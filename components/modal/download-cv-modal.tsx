"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, FileText, FileJson, Loader2 } from "lucide-react";
import { CVProps } from "@/types/cv-types";
import { toast } from "sonner";

export default function DownloadCVModal({
  name,
  cv,
}: {
  name: String;
  cv: CVProps;
}) {
  const [open, setOpen] = React.useState(false);
  const [loadingPDF, setLoadingPDF] = React.useState(false);
  const [loadingJSON, setLoadingJSON] = React.useState(false);

  const downloadCVJSON = async () => {
    setLoadingJSON(true);
    try {
      const json = JSON.stringify(cv);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cv.header.firstName}-Vitaes.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("JSON generated successfully");
    } catch (error) {
      toast.error("Failed to generate JSON");
    } finally {
      setLoadingJSON(false);
      setOpen(false);
    }
  };

  const downloadCV = async () => {
    setLoadingPDF(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cv),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("PDF generated successfully");
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="h-8 w-8 rounded-full border"
          size={"icon"}
          variant={"outline"}
        >
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download CV</DialogTitle>
          <DialogDescription>
            Choose a format to download your CV.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          <Button variant={"outline"} size={"lg"} onClick={downloadCV} disabled={loadingPDF}>
            {loadingPDF ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2" />}
            {loadingPDF ? "Generating PDF..." : "PDF"}
          </Button>
          <Button variant={"outline"} size={"lg"} onClick={downloadCVJSON} disabled={loadingJSON}>
            {loadingJSON ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileJson className="mr-2" />}
            {loadingJSON ? "Generating JSON..." : "JSON"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
