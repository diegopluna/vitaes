import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useResume } from "@/store/resume-store";
import { ProfileModal } from "./modals/profile-modal";
import { Profile } from "@/@types/resume";
import { DragList } from "./dnd/list";
import { ItemData } from "./dnd/drag";

const profileKey = Symbol("profile");

function getProfileData(profile: Profile): ItemData<Profile> {
  return {
    [profileKey]: true,
    itemId: profile.id,
  };
}

function isProfileData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Profile> {
  return data[profileKey] === true;
}

const ProfileDragList = DragList<Profile>;

export const ProfilesForm = () => {
  const profiles = useResume((state) => state.basics.profiles);
  const basics = useResume((state) => state.basics);
  const updateBasics = useResume((state) => state.setBasics);

  const setProfiles = (profiles: Profile[]) => {
    updateBasics({ ...basics, profiles });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row w-full justify-between items-center">
        <h1 className="text-lg font-bold">Profiles</h1>
        <ProfileModal />
      </CardHeader>
      <CardContent className="space-y-2">
        {profiles.length === 0 && (
          <p className="text-center">No profiles added</p>
        )}
        <ProfileDragList
          items={profiles}
          getItemData={getProfileData}
          isItemData={isProfileData}
          setItems={setProfiles}
          EditModal={ProfileModal}
        />
      </CardContent>
    </Card>
  );
};
