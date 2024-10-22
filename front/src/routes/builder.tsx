import { BuilderLayout } from "@/components/builder-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/builder")({
  component: () => BuilderLayout(),
});
