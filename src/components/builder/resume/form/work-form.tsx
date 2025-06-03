import type { Work } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { WorkSheet } from '../sheet/work-sheet'

const workKey = Symbol('work')

function getWorkData(work: Work): ItemData<Work> {
	return {
		[workKey]: true,
		itemId: work.id,
	}
}

function isWorkData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Work> {
	return data[workKey] === true
}

const WorkDragList = DragList<Work>

export function WorkForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)

	const works = resume.work

	const setWorks = (works: Work[]) => {
		setResumeField('work', {
			...resume.work,
			content: works,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{works.content.length === 0 && (
				<p className="text-center">
					{m['work-form.no-work-added']({ label: works.label })}
				</p>
			)}
			<WorkDragList
				items={works.content}
				getItemData={getWorkData}
				isItemData={isWorkData}
				setItems={setWorks}
				EditSheet={WorkSheet}
				itemType={works.label}
				onDelete={(id) => {
					setResumeField('work', {
						...resume.work,
						content: works.content.filter((work) => work.id !== id),
					})
				}}
			/>
		</div>
	)
}
