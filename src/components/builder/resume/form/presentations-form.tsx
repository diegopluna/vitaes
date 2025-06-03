import type { Presentation } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { PresentationSheet } from '../sheet/presentation-sheet'

const presentationsKey = Symbol('presentation')

function getPresentationData(
	presentation: Presentation,
): ItemData<Presentation> {
	return {
		[presentationsKey]: true,
		itemId: presentation.id,
	}
}

function isPresentationData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Presentation> {
	return data[presentationsKey] === true
}

const PresentationDragList = DragList<Presentation>

export function PresentationsForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)

	const presentations = resume.presentations

	const setPresentations = (presentations: Presentation[]) => {
		setResumeField('presentations', {
			...resume.presentations,
			content: presentations,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{presentations.content.length === 0 && (
				<p className="text-center">
					{m['presentations-form.no-presentations-added']({
						label: presentations.label,
					})}
				</p>
			)}
			<PresentationDragList
				items={presentations.content}
				getItemData={getPresentationData}
				isItemData={isPresentationData}
				setItems={setPresentations}
				EditSheet={PresentationSheet}
				itemType={presentations.label}
				onDelete={(id) => {
					setResumeField('presentations', {
						...resume.presentations,
						content: presentations.content.filter(
							(presentation) => presentation.id !== id,
						),
					})
				}}
			/>
		</div>
	)
}
