import type { Profile } from '@/@types/resume'
import { m } from '@/paraglide/messages'
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
				<p className="text-center">{m['profile-form.no-profile-added']()}</p>
			)}
			<ProfileDragList
				items={profiles}
				getItemData={getProfileData}
				isItemData={isProfileData}
				setItems={setProfiles}
				EditSheet={ProfileSheet}
				itemType={m['profile-form.type']()}
				onDelete={(id) => {
					setProfiles(profiles.filter((p) => p.id !== id))
				}}
			/>
		</div>
	)
}
