import { ResumeBuilder } from "@/components/resume/resume-builder";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/builder")({
  component: () => ResumeBuilder(),
});
