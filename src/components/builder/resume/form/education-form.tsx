import type { Education } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { EducationSheet } from '../sheet/education-sheet'

const educationKey = Symbol('education')

function getEducationData(education: Education): ItemData<Education> {
	return {
		[educationKey]: true,
		itemId: education.id,
	}
}

function isEducationData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Education> {
	return data[educationKey] === true
}

const EducationDragList = DragList<Education>

export function EducationForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)

	const educations = resume.education

	const setEducations = (educations: Education[]) => {
		setResumeField('education', {
			...resume.education,
			content: educations,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{educations.content.length === 0 && (
				<p className="text-center">
					{m['education-form.no-education-added']({ label: educations.label })}
				</p>
			)}
			<EducationDragList
				items={educations.content}
				getItemData={getEducationData}
				isItemData={isEducationData}
				setItems={setEducations}
				EditSheet={EducationSheet}
				itemType={educations.label}
				onDelete={(id) => {
					setResumeField('education', {
						...resume.education,
						content: resume.education.content.filter(
							(education) => education.id !== id,
						),
					})
				}}
			/>
		</div>
	)
}
