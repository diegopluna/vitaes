"use client"

import { AwesomeCVColor, AwesomeCVHeaderAlignment, CVProps, UbagaCVTextColor } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"

type Option<T extends string> = {
    value: T,
    label: string
}

function Selector<T extends string>({ label, value, onValueChange, options }: {label:string, value: T, onValueChange: (value: T) => void, options: Option<T>[] }) {
    return (
        <div className="space-y-1">
        <Label htmlFor="alignment">{label}</Label>
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
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
    )
}

function AwesomeCVSettingsForm() {
    const {cv,setCV} = useCV();
    const {awesomeCV: settings} = cv.settings;
    const updateSettings = (value: Partial<CVProps["settings"]["awesomeCV"]>) => {
        setCV(
            (prev: CVProps): CVProps => ({
                ...prev,
                settings: { ...prev.settings, awesomeCV: { ...prev.settings.awesomeCV, ...value } },
            })
        );
    }
    const setAccentColor = (value: AwesomeCVColor) => {
        updateSettings({ accentColor: value });
    };
    const setHeaderAlignment = (value: AwesomeCVHeaderAlignment) => {
        updateSettings({ headerAlignment: value });
    };
    return <>
      <Selector label="Accent Color" value={settings.accentColor} onValueChange={setAccentColor} options={[
            {value: "text-[#00A388]", label: "Awesome Emerald"},
            {value: "text-[#0395DE]", label: "Awesome Skyblue"},
            {value: "text-[#DC3522]", label: "Awesome Red"},
            {value: "text-[#EF4089]", label: "Awesome Pink"},
            {value: "text-[#FF6138]", label: "Awesome Orange"},
            {value: "text-[#27AE60]", label: "Awesome Nephritis"},
            {value: "text-[#95A5A6]", label: "Awesome Concrete"},
            {value: "text-[#131A28]", label: "Awesome Darknight"},
        ]} />
        <Selector label="Alignment" value={settings.headerAlignment} onValueChange={setHeaderAlignment} options={[
            {value: "start", label: "Left"},
            {value: "center", label: "Center"},
            {value: "end", label: "Right"},
        ]} />
    </>
}

function UbagaCV() {
    const {cv, setCV} = useCV();
    const {ubagaCV: settings} = cv.settings;
    const updateSettings = (value: Partial<CVProps["settings"]["ubagaCV"]>) => {
        setCV(
            (prev: CVProps): CVProps => ({
                ...prev,
                settings: { ...prev.settings, ubagaCV: { ...prev.settings.ubagaCV, ...value } },
            })
        );
    }
    const setTextColor = (value: UbagaCVTextColor) => {
        updateSettings({ textColor: value });
    }
    return <>
     <Selector label="Colors" value={settings.textColor} onValueChange={setTextColor} options={[
            {value: "pink", label: "Pink"},
            {value: "blue", label: "Blue"},
            {value: "green", label: "Green"},
            {value: "orange", label: "Orange"},
            {value: "purple", label: "Purple"},
            {value: "red", label: "Red"},
            {value: "teal", label: "Teal"},
            {value: "yellow", label: "Yellow"},
            {value: "black", label: "Black"},
        ]} />
    </>
}

export default function CVSettingsForm() {
    const { cv, setCV } = useCV()

    const loadCV = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    if (isCV(json)) {
                        setCV(json as CVProps);
                        toast.success("CV loaded successfully");
                    } else {
                        toast.error("Invalid JSON format");
                    }
                } catch (error) {
                    toast.error("Invalid JSON file");
                }   
            };
            reader.readAsText(file);
            e.target.value = "";
        }
    };

    const isCV = (o : any): o is CVProps => {
        if (
            typeof o === "object" &&
            o !== null &&
            "header" in o &&
            "summary" in o &&
            "experience" in o &&
            "honors" in o &&
            "presentations" in o &&
            "writings" in o &&
            "committees" in o &&
            "educations" in o &&
            "extracurriculars" in o &&
            "projects" in o &&
            "languages" in o &&
            "certificates" in o &&
            "settings" in o
        ) {
            return true;
        }
        return false;
    }

    return (
        <Card>
            <CardHeader className="text-lg font-bold">Settings</CardHeader>
            <CardContent className="space-y-2">
                <Selector label="Model" value={cv.settings.model} onValueChange={(value) => setCV((prev) => ({ ...prev, settings: { ...prev.settings, model: value } }))} options={[
                    {value: "awesome-cv", label: "Awesome CV"},
                    {value: "ubaga-cv", label: "Just your name in different colors"},
                ]} />
                {cv.settings.model === "awesome-cv" && <AwesomeCVSettingsForm />}
                {cv.settings.model === "ubaga-cv" && <UbagaCV />}
                <div className="space-y-1">
                    <Label htmlFor="loadCV">Load CV from JSON</Label>
                    <Input type="file" accept=".json" id="loadCV" onChange={loadCV} />
                </div>

            </CardContent>
        </Card>
    )
}