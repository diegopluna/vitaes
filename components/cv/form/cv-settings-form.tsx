import { CVColor, CVHeaderAlignment, CVProps } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"


export default function CVSettingsForm() {
    const { cv, setCV } = useCV()
    const { settings } = cv

    const updateSettings = (value: Partial<CVProps["settings"]>) => {
        setCV(
            (prev: CVProps): CVProps => ({
                ...prev,
                settings: { ...prev.settings, ...value },
            })
        );
    }

    const setAccentColor = (value: CVColor) => {
        updateSettings({ accentColor: value });
    };
    const setFontFamily = (value: string) => {
        updateSettings({ fontFamily: value });
    };
    const setFileName = (value: string) => {
        updateSettings({ fileName: value });
    };
    const setHeaderAlignment = (value: CVHeaderAlignment) => {
        updateSettings({ headerAlignment: value });
    };

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
                <div className="space-y-1">
                    <Label htmlFor="alignment">Alignment</Label>
                    <Select value={settings.headerAlignment} onValueChange={setHeaderAlignment}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the header alignment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="start">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="end">Right</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="Accent Color">Accent Color</Label>
                    <Select value={settings.accentColor} onValueChange={setAccentColor}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the accent color" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="text-[#00A388]">Awesome Emerald</SelectItem>
                                <SelectItem value="text-[#0395DE]">Awesome Skyblue</SelectItem>
                                <SelectItem value="text-[#DC3522]">Awesome Red</SelectItem>
                                <SelectItem value="text-[#EF4089]">Awesome Pink</SelectItem>
                                <SelectItem value="text-[#FF6138]">Awesome Orange</SelectItem>
                                <SelectItem value="text-[#27AE60]">Awesome Nephritis</SelectItem>
                                <SelectItem value="text-[#95A5A6]">Awesome Concrete</SelectItem>
                                <SelectItem value="text-[#131A28]">Awesome Darknight</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="loadCV">Load CV from JSON</Label>
                    <Input type="file" accept=".json" id="loadCV" onChange={loadCV} />
                </div>

            </CardContent>
        </Card>
    )
}