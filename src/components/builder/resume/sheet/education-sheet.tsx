import type { Education, StringWithId } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { useAppForm } from '@/components/ui/ts-form'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import type { ItemData } from '../dnd/drag'
import { HighlightDragList } from '../dnd/highlight-list'

const educationExperienceFormSchema = z.object({
	school: z.string().min(1, m['education-sheet.school-required']()),
	location: z.string().min(1, m['education-sheet.location-required']()),
	degree: z.string().min(1, m['education-sheet.degree-required']()),
	startDate: z.string().min(1, m['education-sheet.start-date-required']()),
	endDate: z.string(),
	description: z.array(
		z.object({
			id: z.string(),
			value: z.string(),
		}),
	),
})

const educationHighlightKey = Symbol('education-highlight')

function getEducationHighlightData(
	highlight: StringWithId,
): ItemData<StringWithId> {
	return {
		[educationHighlightKey]: true,
		itemId: highlight.id,
	}
}

function isEducationHighlightData(
	data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
	return data[educationHighlightKey] === true
}

const EducationHighlightDragList = HighlightDragList<StringWithId>

export function EducationSheet({
	defaultValues,
}: {
	defaultValues?: Education
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const form = useAppForm({
		validators: {
			onChange: educationExperienceFormSchema,
		},
		defaultValues: {
			school: defaultValues?.school || '',
			location: defaultValues?.location || '',
			degree: defaultValues?.degree || '',
			startDate: defaultValues?.startDate || '',
			endDate: defaultValues?.endDate || '',
			description: defaultValues?.description || [],
		},
		onSubmit: ({ value }) => {
			const education: Education = {
				...value,
				endDate: value.endDate || '',
				id: `${value.school} - ${value.degree}`,
				description: value.description.map((d) => {
					return {
						id: d.value,
						value: d.value,
					} as StringWithId
				}),
			}
			if (defaultValues) {
				setResumeField('education', {
					...resume.education,
					content: resume.education.content.map((w) => {
						if (w.id === defaultValues.id) {
							return education
						}
						return w
					}),
				})
			} else {
				setResumeField('education', {
					...resume.education,
					content: [...resume.education.content, education],
				})
			}
			setOpen(false)
			form.reset()
		},
	})

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		},
		[form],
	)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<TooltipWrapper
					tooltip={
						defaultValues
							? m['education-sheet.edit']()
							: m['education-sheet.add']()
					}
				>
					<Button variant="outline" size="icon" onClick={() => setOpen(true)}>
						{defaultValues ? (
							<IconPencil className="size-4" />
						) : (
							<IconPlus className="size-4" />
						)}
					</Button>
				</TooltipWrapper>
			</SheetTrigger>
			<SheetContent side="left" className="p-4">
				<SheetHeader>
					<SheetTitle>
						{defaultValues
							? m['education-sheet.edit']()
							: m['education-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="school"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['education-sheet.school']()}
											</field.FormLabel>
											<field.FormControl>
												<Input
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
												/>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
								<form.AppField
									name="location"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['education-sheet.location']()}
											</field.FormLabel>
											<field.FormControl>
												<Input
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
												/>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
								<form.AppField
									name="degree"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['education-sheet.degree']()}
											</field.FormLabel>
											<field.FormControl>
												<Input
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
												/>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
								<form.AppField
									name="startDate"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['education-sheet.start-date']()}
											</field.FormLabel>
											<field.FormControl>
												<Input
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
												/>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
								<form.AppField
									name="endDate"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['education-sheet.end-date']()}
											</field.FormLabel>
											<field.FormControl>
												<Input
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													onBlur={field.handleBlur}
												/>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
								<form.AppField
									name="description"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												<div className="flex items-center justify-between w-full">
													<span>{m['education-sheet.description']()}</span>
													<Button
														variant="outline"
														size="icon"
														className="size-8"
														onClick={(e) => {
															e.preventDefault()
															field.handleChange([
																...field.state.value,
																{ id: `${Date.now()}`, value: '' },
															])
														}}
													>
														<IconPlus size={14} />
													</Button>
												</div>
											</field.FormLabel>
											<field.FormControl>
												<div className="flex flex-col w-full gap-2 px-2 items-center">
													{field.state.value.length === 0 && (
														<p className="text-center text-sm">
															{m[
																'education-sheet.no-education-highlight-added'
															]({ label: resume.education.label })}
														</p>
													)}
													<EducationHighlightDragList
														items={field.state.value}
														getItemData={getEducationHighlightData}
														isItemData={isEducationHighlightData}
														setItems={field.handleChange}
														itemType="Description"
														onDelete={(id) => {
															field.handleChange(
																field.state.value.filter((h) => h.id !== id),
															)
														}}
														onChangeText={(id, text) => {
															field.handleChange(
																field.state.value.map((h) => {
																	if (h.id === id) {
																		return { ...h, value: text }
																	}
																	return h
																}),
															)
														}}
													/>
												</div>
											</field.FormControl>
											<field.FormMessage />
										</field.FormItem>
									)}
								/>
							</div>
						</ScrollArea>
						<Button className="mt-4" type="submit">
							{m['education-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
