'use client'

import { Profile } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ProfileSheet } from './sheets/profile-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

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

export const ProfileForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('ProfileForm')

  const profiles = resume.basics.profiles

  const setProfiles = (profiles: Profile[]) => {
    setResumeField('basics', {
      ...resume.basics,
      profiles: profiles,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {profiles.length === 0 && (
        <p className="text-center">{t('noProfileAdded')}</p>
      )}
      <ProfileDragList
        items={profiles}
        getItemData={getProfileData}
        isItemData={isProfileData}
        setItems={setProfiles}
        EditSheet={ProfileSheet}
        itemType="Profile"
        onDelete={id => {
          setProfiles(profiles.filter(p => p.id !== id))
        }}
      />
    </div>
  )
}
