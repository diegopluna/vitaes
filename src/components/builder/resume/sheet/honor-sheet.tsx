import type { Honor, HonorsPerLabel } from '@/@types/resume'
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
import { DragList } from '../dnd/list'
import { HonorTypeSheet } from './honor-type-sheet'

const honorsFormSchema = z.object({
	id: z.string(),
	label: z.string().min(1, 'Label is required'),
	honors: z.array(
		z.object({
			id: z.string(),
			year: z.string(),
			position: z.string(),
			honor: z.string(),
			location: z.string(),
		}),
	),
})

const honorTypeKey = Symbol('honor-type')

function getHonorsTypeData(honor: Honor, parentId: string): ItemData<Honor> {
	return {
		[honorTypeKey]: true,
		itemId: honor.id,
		parentId,
	}
}

function isHonorsTypeData(
	data: Record<string | symbol, unknown>,
): data is ItemData<Honor> {
	return data[honorTypeKey] === true
}

const HonorsTypeDragList = DragList<Honor>

export function HonorSheet({
	defaultValues,
}: {
	defaultValues?: HonorsPerLabel
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const honors = resume.honors

	const form = useAppForm({
		validators: {
			onChange: honorsFormSchema,
		},
		defaultValues: {
			id: defaultValues?.id || `${Date.now()}`,
			label: defaultValues?.label || '',
			honors: defaultValues?.honors || [],
		},
		onSubmit: ({ value }) => {
			const honor: HonorsPerLabel = {
				...value,
				id: `${value.label}`,
				honors: value.honors.map((h) => {
					return {
						id: `${h.honor} - ${h.year}`,
						honor: h.honor,
						location: h.location,
						position: h.position,
						year: h.year,
					} as Honor
				}),
			}
			if (defaultValues) {
				setResumeField('honors', {
					...honors,
					content: honors.content.map((h) =>
						h.id === defaultValues.id ? honor : h,
					),
				})
			} else {
				setResumeField('honors', {
					...honors,
					content: [...honors.content, honor],
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
						defaultValues ? m['honor-sheet.edit']() : m['honor-sheet.add']()
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
						{defaultValues ? m['honor-sheet.edit']() : m['honor-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="label"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['honor-sheet.label']()}
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
									name="honors"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												<div className="flex items-center justify-between w-full">
													<span>{m['honor-sheet.honors']()}</span>
													<Button
														variant="outline"
														size="icon"
														onClick={() => {
															field.setValue([
																...field.state.value,
																{
																	id: `${Date.now()} - ${Math.random()}`,
																	year: '',
																	position: '',
																	honor: '',
																	location: '',
																},
															])
														}}
													>
														<IconPlus className="size-4" />
													</Button>
												</div>
											</field.FormLabel>
											<field.FormControl>
												<div className="flex flex-col w-full gap-2 px-2 items-center">
													{field.state.value.length === 0 && (
														<p className="text-center text-sm">
															{m['honor-sheet.no-honors-added']({
																label: honors.label.toLowerCase(),
															})}
														</p>
													)}
													<HonorsTypeDragList
														items={field.state.value}
														getItemData={(item) =>
															getHonorsTypeData(item, form.state.values.id)
														}
														isItemData={isHonorsTypeData}
														setItems={field.handleChange}
														itemType="Honor"
														EditSheet={({ defaultValues }) => (
															<HonorTypeSheet
																defaultValues={defaultValues}
																honorTypeId={form.state.values.id}
																onUpdate={(honor) => {
																	if (defaultValues) {
																		// Update existing honor
																		const updatedHonors = field.state.value.map(
																			(h) =>
																				h.id === defaultValues.id ? honor : h,
																		)
																		field.handleChange(updatedHonors)
																	} else {
																		// Add new honor
																		field.handleChange([
																			...field.state.value,
																			honor,
																		])
																	}
																}}
															/>
														)}
														onDelete={(id) => {
															field.handleChange(
																field.state.value.filter((h) => h.id !== id),
															)
														}}
													/>
												</div>
											</field.FormControl>
										</field.FormItem>
									)}
								/>
							</div>
						</ScrollArea>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
