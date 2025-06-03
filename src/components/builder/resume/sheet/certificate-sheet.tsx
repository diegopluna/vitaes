import type { Certificate, StringWithId } from '@/@types/resume'
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

const certificateExperienceFormSchema = z.object({
	title: z.string().min(1, m['certificate-sheet.title-required']()),
	issuer: z.string().min(1, m['certificate-sheet.issuer-required']()),
	date: z.string().min(1, m['certificate-sheet.date-required']()),
	description: z.array(
		z.object({
			id: z.string(),
			value: z.string(),
		}),
	),
})

const certificateHighlightKey = Symbol('certificate-highlight')

function getCertificateHighlightData(
	highlight: StringWithId,
): ItemData<StringWithId> {
	return {
		[certificateHighlightKey]: true,
		itemId: highlight.id,
	}
}

function isCertificateHighlightData(
	data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
	return data[certificateHighlightKey] === true
}

const CertificateHighlightDragList = HighlightDragList<StringWithId>

export function CertificateSheet({
	defaultValues,
}: {
	defaultValues?: Certificate
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const certificates = resume.certificates

	const form = useAppForm({
		validators: {
			onChange: certificateExperienceFormSchema,
		},
		defaultValues: {
			title: defaultValues?.title || '',
			issuer: defaultValues?.issuer || '',
			date: defaultValues?.date || '',
			description: defaultValues?.description || [],
		},
		onSubmit: ({ value }) => {
			const certificate: Certificate = {
				...value,
				id: `${value.title}`,
				description: value.description.map((d) => {
					return {
						id: d.value,
						value: d.value,
					} as StringWithId
				}),
			}
			if (defaultValues) {
				setResumeField('certificates', {
					...certificates,
					content: certificates.content.map((w) => {
						if (w.id === defaultValues.id) {
							return certificate
						}
						return w
					}),
				})
			} else {
				setResumeField('certificates', {
					...certificates,
					content: [...certificates.content, certificate],
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
							? m['certificate-sheet.edit']()
							: m['certificate-sheet.add']()
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
							? m['certificate-sheet.edit']()
							: m['certificate-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="title"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['certificate-sheet.title']()}
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
									name="issuer"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['certificate-sheet.issuer']()}
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
												{m['certificate-sheet.date']()}
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
													<span>{m['certificate-sheet.description']()}</span>
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
															{m['certificate-sheet.no-description-added']()}
														</p>
													)}
													<CertificateHighlightDragList
														items={field.state.value}
														getItemData={getCertificateHighlightData}
														isItemData={isCertificateHighlightData}
														setItems={field.handleChange}
														itemType={'Description'}
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
							{m['certificate-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
