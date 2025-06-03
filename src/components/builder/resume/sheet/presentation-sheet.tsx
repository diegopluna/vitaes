import type { Presentation, StringWithId } from '@/@types/resume'
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

const presentationFormSchema = z.object({
	event: z.string().min(1, m['presentation-sheet.event-required']()),
	role: z.string().min(1, m['presentation-sheet.role-required']()),
	location: z.string().min(1, m['presentation-sheet.location-required']()),
	date: z.string().min(1, m['presentation-sheet.date-required']()),
	description: z.array(
		z.object({
			id: z.string(),
			value: z.string(),
		}),
	),
})

const presentationDescriptionKey = Symbol('presentation-description')

function getPresentationDescriptionData(
	description: StringWithId,
): ItemData<{ id: string; value: string }> {
	return {
		[presentationDescriptionKey]: true,
		itemId: description.id,
	}
}

function isPresentationDescriptionData(
	data: Record<string | symbol, unknown>,
): data is ItemData<{ id: string; value: string }> {
	return data[presentationDescriptionKey] === true
}

const PresentationDescriptionDragList = HighlightDragList<StringWithId>

export function PresentationSheet({
	defaultValues,
}: {
	defaultValues?: Presentation
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const presentations = resume.presentations

	const form = useAppForm({
		validators: {
			onChange: presentationFormSchema,
		},
		defaultValues: {
			event: defaultValues?.event || '',
			role: defaultValues?.role || '',
			location: defaultValues?.location || '',
			date: defaultValues?.date || '',
			description: defaultValues?.description || [],
		},
		onSubmit: ({ value }) => {
			const presentation: Presentation = {
				...value,
				id: `${value.role} - ${value.event}`,
				description: value.description.map((d) => {
					return {
						id: d.id,
						value: d.value,
					} as StringWithId
				}),
			}

			if (defaultValues) {
				setResumeField('presentations', {
					...presentations,
					content: presentations.content.map((p) =>
						p.id === defaultValues.id ? presentation : p,
					),
				})
			} else {
				setResumeField('presentations', {
					...presentations,
					content: [...presentations.content, presentation],
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
							? m['presentation-sheet.edit']()
							: m['presentation-sheet.add']()
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
							? m['presentation-sheet.edit']()
							: m['presentation-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="event"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['presentation-sheet.event']()}
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
									name="role"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['presentation-sheet.role']()}
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
												{m['presentation-sheet.location']()}
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
									name="date"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['presentation-sheet.date']()}
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
													<span>{m['presentation-sheet.description']()}</span>
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
															{m['presentation-sheet.no-presentations-added']({
																label: presentations.label.toLowerCase(),
															})}
														</p>
													)}
													<PresentationDescriptionDragList
														items={field.state.value}
														getItemData={getPresentationDescriptionData}
														isItemData={isPresentationDescriptionData}
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
							{m['presentation-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
