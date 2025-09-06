'use client'

import { useTranslations } from 'next-intl'
import type { Profile } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { ProfileSheet } from '../sheet/profile-sheet'

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
  const t = useTranslations('profile-form')
  const { resume, setResumeField } = useResumeStore((s) => s)

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
        <p className="text-center">{t('no-profile-added')}</p>
      )}
      <ProfileDragList
        items={profiles}
        getItemData={getProfileData}
        isItemData={isProfileData}
        setItems={setProfiles}
        EditSheet={ProfileSheet}
        itemType={t('type')}
        onDelete={(id) => {
          setProfiles(profiles.filter((p) => p.id !== id))
        }}
      />
    </div>
  )
}
