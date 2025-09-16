"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AwesomeCVColor,
  AwesomeCVHeaderAlignment,
  Resume,
} from "@/convex/resume/type";
import { isResume } from "@/lib/utils";
import { useResumeStore } from "@/providers/resume-store-provider";

type Option<T extends string> = {
  value: T;
  label: string;
};

function Selector<T extends string>({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  options: Option<T>[];
}) {
  const t = useTranslations("resume-settings");
  return (
    <div className="space-y-1">
      <Label htmlFor="alignment">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={t("select-an-option")} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ResumeSettings() {
  const t = useTranslations("resume-settings");
  const { resume, setResumeField, setResume } = useResumeStore((s) => s);
  const settings = resume.settings;
  const awesomeCVSettings = settings.awesomeCV;

  const setAccentColor = (value: AwesomeCVColor) => {
    setResumeField("settings", {
      ...settings,
      awesomeCV: {
        ...awesomeCVSettings,
        accentColor: value,
      },
    });
  };

  const setHeaderAlignment = (value: AwesomeCVHeaderAlignment) => {
    setResumeField("settings", {
      ...settings,
      awesomeCV: {
        ...awesomeCVSettings,
        headerAlignment: value,
      },
    });
  };

  // TODO: i18n this
  const loadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (isResume(json)) {
            setResume(json as Resume);
            toast.success("Resume loaded successfully");
          } else {
            toast.error("Invalid JSON format");
          }
        } catch (e) {
          toast.error("Invalid JSON file", {
            description: e instanceof Error ? e.message : "Unknown error",
          });
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-12 ">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">{t("settings")}</h2>
        <div className="px-2 flex-flex-col w-full space-y-4">
          <Selector
            label={t("label")}
            value={settings.model}
            onValueChange={(value) =>
              setResumeField("settings", { ...settings, model: value })
            }
            options={[{ value: "awesome-cv", label: "Awesome CV" }]}
          />
          {settings.model === "awesome-cv" && (
            <>
              <Selector
                label={t("accent-color")}
                value={awesomeCVSettings.accentColor}
                onValueChange={setAccentColor}
                options={[
                  { value: "text-[#00A388]", label: "Awesome Emerald" },
                  { value: "text-[#0395DE]", label: "Awesome Skyblue" },
                  { value: "text-[#DC3522]", label: "Awesome Red" },
                  { value: "text-[#EF4089]", label: "Awesome Pink" },
                  { value: "text-[#FF6138]", label: "Awesome Orange" },
                  { value: "text-[#27AE60]", label: "Awesome Nephritis" },
                  { value: "text-[#95A5A6]", label: "Awesome Concrete" },
                  { value: "text-[#131A28]", label: "Awesome Darknight" },
                ]}
              />
              <Selector
                label={t("alignment")}
                value={awesomeCVSettings.headerAlignment}
                onValueChange={setHeaderAlignment}
                options={[
                  {
                    value: "start",
                    label: t("alignment-left"),
                  },
                  {
                    value: "center",
                    label: t("alignment-center"),
                  },
                  {
                    value: "end",
                    label: t("alignment-right"),
                  },
                ]}
              />
            </>
          )}
          <div className="space-y-1">
            <Label htmlFor="loadResume">{t("load-resume")}</Label>
            <Input
              type="file"
              accept=".json"
              id="loadResume"
              onChange={loadResume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
