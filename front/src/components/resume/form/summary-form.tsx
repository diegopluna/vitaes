import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/store/resume-store";

export const SummaryForm = () => {
  const basics = useResume((state) => state.basics);
  const updateBasics = useResume((state) => state.setBasics);
  return (
    <Card>
      <CardHeader className="text-lg font-bold">Summary</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="summary">Content</Label>
          <Textarea
            
            id="summary"
            value={basics.summary}
            onChange={(e) => updateBasics({ ...basics, summary: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
