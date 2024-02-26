import { CVHeaderAlignment, CVProps } from "@/types/cv-types";
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

    const setAccentColor = (value: string) => {
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
            </CardContent>
        </Card>
    )
}