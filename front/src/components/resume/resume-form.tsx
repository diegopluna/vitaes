import {
  AtSign,
  Book,
  Briefcase,
  DraftingCompass,
  FileCheck,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Languages,
  Medal,
  PencilRuler,
  Scroll,
  UserRound,
  Users,
} from "lucide-react";
import { TabsTriggerHelper } from "../ui/tab-trigger-helper";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { BasicsForm } from "./form/basics-form";
import { SummaryForm } from "./form/summary-form";
import { ProfilesForm } from "./form/profiles-form";

export const ResumeForm = () => {
  return (
    <Tabs defaultValue="basics" className="flex flex-row w-full">
      <TabsList className="mt-2 mr-2 grid h-full grid-rows-13">
        <TabsTriggerHelper
          icon={<UserRound />}
          id="basics"
          tooltip="Basic information"
        />
        <TabsTriggerHelper
          icon={<Scroll />}
          id="summary"
          tooltip="Summary"
        />
        <TabsTriggerHelper
          icon={<AtSign />}
          id="profiles"
          tooltip="Profiles"
        />
        <TabsTriggerHelper
          icon={<Briefcase />}
          id="work"
          tooltip="Work experience"
        />
        <TabsTriggerHelper
          icon={<HandHeart />}
          id="volunteer"
          tooltip="Volunteer experience"
        />
        <TabsTriggerHelper
          icon={<GraduationCap />}
          id="education"
          tooltip="Education"
        />
        <TabsTriggerHelper
          icon={<Medal />}
          id="awards"
          tooltip="Awards"
        />
        <TabsTriggerHelper
          icon={<FileCheck />}
          id="certificates"
          tooltip="Certificates"
        />
        <TabsTriggerHelper
          icon={<Book />}
          id="publications"
          tooltip="Publications"
        />
        <TabsTriggerHelper
          icon={<DraftingCompass />}
          id="skills"
          tooltip="Skills"
        />
        <TabsTriggerHelper
          icon={<Languages />}
          id="languages"
          tooltip="Languages"
        />
        <TabsTriggerHelper
          icon={<Gamepad2 />}
          id="interests"
          tooltip="Interests"
        />
        <TabsTriggerHelper
          icon={<Users />}
          id="references"
          tooltip="References"
        />
        <TabsTriggerHelper
          icon={<PencilRuler />}
          id="projects"
          tooltip="Projects"
        />
      </TabsList>
      <TabsContent className="w-full" value="basics">
        <BasicsForm />
      </TabsContent>
      <TabsContent className="w-full" value="summary">
        <SummaryForm />
      </TabsContent>
      <TabsContent className="w-full" value="profiles">
        <ProfilesForm />
      </TabsContent>
    </Tabs>
  );
};
