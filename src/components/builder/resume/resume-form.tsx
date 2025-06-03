import type { Resume } from '@/@types/resume'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useSections } from '@/providers/section-provider'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'

export function ResumeForm() {
	const { setResumeField, resume } = useResumeStore((s) => s)
	const { sections, setSectionRef } = useSections()
	const [editingId, setEditingId] = useState<string | null>(null)
	const [labelValue, setLabelValue] = useState<string>('')

	const handleEditClick = (id: string, currentLabel: string) => {
		setEditingId(id)
		setLabelValue(currentLabel)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabelValue(e.target.value)
	}

	const handleInputBlur = () => {
		setEditingId(null)
		if (editingId) {
			if (editingId === 'summary') {
				setResumeField('basics', {
					...resume.basics,
					summary: {
						...resume.basics.summary,
						label: labelValue,
					},
				})
			} else {
				setResumeField(editingId as keyof Resume, {
					...resume[editingId as keyof Resume],
					label: labelValue,
				})
			}
		}
	}

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditingId(null)
			if (editingId) {
				if (editingId === 'summary') {
					setResumeField('basics', {
						...resume.basics,
						summary: {
							...resume.basics.summary,
							label: labelValue,
						},
					})
				} else {
					setResumeField(editingId as keyof Resume, {
						...resume[editingId as keyof Resume],
						label: labelValue,
					})
				}
			}
		}
	}

	const nonEditableIds = ['personal', 'profiles']

	return (
		<div className="space-y-12">
			{sections.map((section) => {
				const isEditable = !nonEditableIds.includes(section.id)
				const isEditing = editingId === section.id

				return (
					<div
						className="space-y-6"
						key={section.id}
						ref={(el) => setSectionRef(section.id, el)}
					>
						{section.sheet ? (
							<div className="flex flex-row w-full justify-between items-center">
								{isEditable ? (
									<div
										className={`relative group inline-block ${isEditing ? 'border border-primary rounded px-2 py-1' : ''}`}
									>
										{isEditing ? (
											<input
												className="text-2xl font-semibold bg-background border-b border-primary focus:outline-none px-1"
												value={labelValue}
												autoFocus
												onChange={handleInputChange}
												onBlur={handleInputBlur}
												onKeyDown={handleInputKeyDown}
											/>
										) : (
											<h2
												className="text-2xl font-semibold cursor-pointer group-hover:border group-hover:border-primary group-hover:rounded group-hover:px-2 group-hover:py-1 transition-all"
												onClick={() =>
													handleEditClick(section.id, section.title)
												}
											>
												{section.title}
												<span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
													<IconPencil className="size-4 text-primary" />
												</span>
											</h2>
										)}
									</div>
								) : (
									<h2 className="text-2xl font-semibold">{section.title}</h2>
								)}
								{section.sheet}
							</div>
						) : isEditable ? (
							<div
								className={`relative group inline-block ${isEditing ? 'border border-primary rounded px-2 py-1' : ''}`}
							>
								{isEditing ? (
									<input
										className="text-2xl font-semibold bg-background border-b border-primary focus:outline-none px-1"
										value={labelValue}
										autoFocus
										onChange={handleInputChange}
										onBlur={handleInputBlur}
										onKeyDown={handleInputKeyDown}
									/>
								) : (
									<h2
										className="text-2xl font-semibold cursor-pointer group-hover:border group-hover:border-primary group-hover:rounded group-hover:px-2 group-hover:py-1 transition-all"
										onClick={() => handleEditClick(section.id, section.title)}
									>
										{section.title}
										<span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<IconPencil className="size-4 text-primary" />
										</span>
									</h2>
								)}
							</div>
						) : (
							<h2 className="text-2xl font-semibold">{section.title}</h2>
						)}
						{section.form}
					</div>
				)
			})}
		</div>
	)
}
