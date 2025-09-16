"use client";

import { IconCopy, IconTrash } from "@tabler/icons-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { Resume } from "@/convex/resume/type";
import ResumeView from "@/components/resume/resume-view";

interface ResumeCardProps {
  resume: {
    id: string;
    name: string;
    data: Resume;
    createdAt?: string;
    updatedAt?: string;
  };
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const t = useTranslations("resume-card");
  const router = useRouter();

  const deleteResume = useMutation(api.resume.functions.deleteOne);
  const cloneResume = useMutation(api.resume.functions.clone);

  const handleDelete = () => {
    deleteResume({ id: resume.id as Id<"resumes"> }).then(() => {
      toast.success(t("resume-deleted"));
    });
  };

  const handleClone = () => {
    cloneResume({ id: resume.id as Id<"resumes"> }).then(() => {
      toast.success(t("resume-cloned"));
    });
  };

  const handleCardClick = () => {
    router.push(`/builder/${resume.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Card className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden rounded-none group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out relative">
      <div
        className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1"
        onClick={handleActionClick}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-background/80 hover:bg-primary hover:text-primary-foreground shadow-sm backdrop-blur-sm"
          onClick={handleClone}
        >
          <IconCopy className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-background/80 hover:bg-destructive hover:text-destructive-foreground shadow-sm backdrop-blur-sm"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>{t("delete-resume")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("delete-resume-description", { name: resume.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div onClick={handleCardClick} className="flex flex-col h-full">
        <CardHeader className="p-0 gap-0">
          <div className="h-full overflow-hidden">
            <div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out relative overflow-hidden">
              <div
                style={{
                  width: "210mm",
                  height: "297mm",
                  position: "absolute",
                  top: "0%",
                  left: "0%",
                  transform: "scale(0.35)",
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                <ResumeView resume={resume.data} />
              </div>
            </div>
          </div>
          <CardTitle className="py-6 pb-4 px-6">
            <span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
              {resume.name}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
          {/* Optionally show created/updated date */}
          {resume.updatedAt && (
            <div className="text-xs text-muted-foreground mb-2">
              {t("updated", {
                time: new Date(resume.updatedAt).toLocaleDateString(),
              })}
            </div>
          )}
        </CardContent>
        <CardFooter className="space-x-4 mt-auto">
          <div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
        </CardFooter>
      </div>
    </Card>
  );
}
