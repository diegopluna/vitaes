'use client'
import { Profile } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { useResumeStore } from '@/providers/resume-store-provider'
import { DragList } from './dnd/list'
import { ProfileModal } from './modals/profile-modal'
// import { useResume } from '@/store/resume-store'

const profileKey = Symbol('profile')

function getProfileData(profile: Profile): ItemData<Profile> {
  return {
    [profileKey]: true,
    itemId: profile.id,
  }
}

function isProfileData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Profile> {
  return data[profileKey] === true
}

const ProfileDragList = DragList<Profile>

export const ProfilesForm = () => {
  const { resume, setBasics } = useResumeStore((state) => state)

  const profiles = resume.basics.profiles

  const setProfiles = (profiles: Profile[]) => {
    setBasics({ ...resume.basics, profiles })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {profiles.length === 0 && (
        <p className="text-center">No profiles added</p>
      )}
      <ProfileDragList
        items={profiles}
        getItemData={getProfileData}
        isItemData={isProfileData}
        setItems={setProfiles}
        EditModal={ProfileModal}
        itemType="profile"
        onDelete={(id) => {
          setProfiles(profiles.filter((p) => p.id !== id))
        }}
      />
    </div>
  )
}
