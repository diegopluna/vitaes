import type { Committee } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { ComitteeSheet } from '../sheet/comitte-sheet'

const comitteeKey = Symbol('comittee')

function getComitteeData(comittee: Committee): ItemData<Committee> {
	return {
		[comitteeKey]: true,
		itemId: comittee.id,
	}
}

function isComitteeData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Committee> {
	return data[comitteeKey] === true
}

const ComitteeDragList = DragList<Committee>

export function ComitteeForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)

	const comittees = resume.committees

	const setComittees = (items: Committee[]) => {
		setResumeField('committees', {
			...resume.committees,
			content: items,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{comittees.content.length === 0 && (
				<p className="text-center">
					{m['comittee-form.no-comittees-added']({ label: comittees.label })}
				</p>
			)}
			<ComitteeDragList
				items={comittees.content}
				getItemData={getComitteeData}
				isItemData={isComitteeData}
				setItems={setComittees}
				EditSheet={ComitteeSheet}
				itemType={comittees.label}
				onDelete={(id) => {
					setResumeField('committees', {
						...resume.committees,
						content: resume.committees.content.filter((w) => w.id !== id),
					})
				}}
			/>
		</div>
	)
}
