import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper"
import { useResume } from "@/store/resume-store"
import {PlusCircle} from "lucide-react"

export const ProfilesForm = () => {
  const profiles = useResume((state) => state.basics.profiles);
  return (
    <Card>
      <CardHeader className="flex flex-row w-full justify-between items-center">
        <h1 className="text-lg font-bold">Profiles</h1>
        <TooltipWrapper tooltip="Add profile">
          <Button variant="outline" size="icon">
            <PlusCircle className="size-6"/>
          </Button>
        </TooltipWrapper>
      </CardHeader>
      <CardContent className="space-y-2">
        {profiles.length === 0 && <p className="text-center">No profiles added</p>}
      </CardContent>
    </Card>
  )
}