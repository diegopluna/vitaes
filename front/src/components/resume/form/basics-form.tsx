import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/store/resume-store";

//TODO: Add validation, and avatar field
export const BasicsForm = () => {
  const basics = useResume((state) => state.basics);
  const updateBasics = useResume((state) => state.setBasics);

  return (
    <Card>
      <CardHeader className="text-lg font-bold">Basic Information</CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={basics.name}
            onChange={(e) => updateBasics({ ...basics, name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="label">Title</Label>
          <Input
            id="label"
            value={basics.label}
            onChange={(e) => updateBasics({ ...basics, label: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={basics.email}
            onChange={(e) => updateBasics({ ...basics, email: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={basics.phone}
            onChange={(e) => updateBasics({ ...basics, phone: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="url">Website</Label>
          <Input
            id="url"
            value={basics.url}
            onChange={(e) => updateBasics({ ...basics, url: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
