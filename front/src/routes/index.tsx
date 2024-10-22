import { MainLayout } from "@/components/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => MainLayout(),
});
