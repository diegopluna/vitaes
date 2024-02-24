import { CVProps, LanguageProficiency } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageForm() {
  const { cv, setCV } = useCV();
  const { languages } = cv;
  const updateLanguages = (value: Partial<CVProps["languages"]>) => {
    setCV(
      (prev: CVProps): CVProps => ({
        ...prev,
        languages: { ...prev.languages, ...value },
      })
    );
  };
  const setLanguagesEnabled = (value: boolean) => {
    updateLanguages({ enabled: value });
  };
  const setLanguagesLabel = (value: string) => {
    updateLanguages({ label: value });
  };
  const setLanguages = (value: CVProps["languages"]["languages"]) => {
    updateLanguages({ languages: value });
  };

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Languages</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="languagesEnabled">Enabled</Label>
            <Switch
              checked={languages.enabled}
              onCheckedChange={setLanguagesEnabled}
            />
          </div>
          {languages.enabled && (
            <div className="space-y-1">
              <Label htmlFor="languagesLabel">Label</Label>
              <Input
                id="languagesLabel"
                type="text"
                value={languages.label}
                onChange={(e) => setLanguagesLabel(e.target.value)}
              />
              <Button
                className="w-full items-center justify-center"
                variant={"ghost"}
                onClick={() =>
                  setLanguages([
                    ...languages.languages,
                    {
                      language: "",
                      proficiency: undefined,
                    },
                  ])
                }
              >
                <PlusCircle />
              </Button>
              <div className="space-y-2">
                {languages.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      id={`language-${index}`}
                      type="text"
                      value={language.language}
                      onChange={(e) => {
                        const newLanguages = [...languages.languages];
                        newLanguages[index].language = e.target.value;
                        setLanguages(newLanguages);
                      }}
                    />
                    <Select
                      value={language.proficiency}
                      onValueChange={(value) => {
                        const newLanguages = [...languages.languages];
                        newLanguages[index].proficiency = value as LanguageProficiency;
                        setLanguages(newLanguages);
                      }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                            <SelectItem value="Proficient">Proficient</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        const newLanguages = [...languages.languages];
                        newLanguages.splice(index, 1);
                        setLanguages(newLanguages);
                      }}
                    >
                      <MinusCircle />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
