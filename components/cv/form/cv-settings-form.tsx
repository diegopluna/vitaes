import { CVColor, CVHeaderAlignment, CVProps } from "@/types/cv-types";
import { useCV } from "../use-cv";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

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
            </CardContent>
        </Card>
    )
}