import type { Project, StringWithId } from '@/@types/resume'
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

const projectExperienceFormSchema = z.object({
	title: z.string().min(1, m['project-sheet.title-required']()),
	programmingLanguages: z.array(
		z.object({
			id: z.string(),
			value: z.string(),
		}),
	),
	repository: z.string().min(1, m['project-sheet.repository-required']()),
	description: z.array(
		z.object({
			id: z.string(),
			value: z.string(),
		}),
	),
	link: z.string().url(m['project-sheet.link-invalid']()),
	startDate: z.string().min(1, m['project-sheet.start-date-required']()),
	endDate: z.string(),
})

const projectLanguageKey = Symbol('project-language')
const projectDescriptionKey = Symbol('project-description')

function getProjectLanguageData(
	language: StringWithId,
): ItemData<StringWithId> {
	return {
		[projectLanguageKey]: true,
		itemId: language.id,
	}
}

function isProjectLanguageData(
	data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
	return data[projectLanguageKey] === true
}

function getProjectDescriptionData(
	description: StringWithId,
): ItemData<StringWithId> {
	return {
		[projectDescriptionKey]: true,
		itemId: description.id,
	}
}

function isProjectDescriptionData(
	data: Record<string | symbol, unknown>,
): data is ItemData<StringWithId> {
	return data[projectDescriptionKey] === true
}

const ProjectLanguageDragList = HighlightDragList<StringWithId>
const ProjectDescriptionDragList = HighlightDragList<StringWithId>

export function ProjectSheet({
	defaultValues,
}: {
	defaultValues?: Project
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const projects = resume.projects

	const form = useAppForm({
		validators: {
			onChange: projectExperienceFormSchema,
		},
		defaultValues: {
			title: defaultValues?.title || '',
			programmingLanguages: defaultValues?.programmingLanguages || [],
			repository: defaultValues?.repository || '',
			description: defaultValues?.description || [],
			link: defaultValues?.link || '',
			startDate: defaultValues?.startDate || '',
			endDate: defaultValues?.endDate || '',
		},
		onSubmit: ({ value }) => {
			const project: Project = {
				...value,
				endDate: value.endDate || '',
				id: `${value.title}`,
				programmingLanguages: value.programmingLanguages.map((p) => {
					return {
						id: p.value,
						value: p.value,
					} as StringWithId
				}),
				description: value.description.map((d) => {
					return {
						id: d.value,
						value: d.value,
					} as StringWithId
				}),
			}
			if (defaultValues) {
				setResumeField('projects', {
					...projects,
					content: projects.content.map((w) =>
						w.id === defaultValues.id ? project : w,
					),
				})
			} else {
				setResumeField('projects', {
					...projects,
					content: [...projects.content, project],
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
						defaultValues ? m['project-sheet.edit']() : m['project-sheet.add']()
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
							? m['project-sheet.edit']()
							: m['project-sheet.add']()}
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
												{m['project-sheet.title']()}
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
									name="repository"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['project-sheet.repository']()}
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
									name="link"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['project-sheet.link']()}
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
												{m['project-sheet.start-date']()}
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
												{m['project-sheet.end-date']()}
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
									name="programmingLanguages"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												<div className="flex items-center justify-between w-full">
													<span>
														{m['project-sheet.programming-languages']()}
													</span>
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
																'project-sheet.no-programming-languages-added'
															]()}
														</p>
													)}
													<ProjectLanguageDragList
														items={field.state.value}
														getItemData={getProjectLanguageData}
														isItemData={isProjectLanguageData}
														setItems={field.handleChange}
														itemType="Language"
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
								<form.AppField
									name="description"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												<div className="flex items-center justify-between w-full">
													<span>{m['project-sheet.description']()}</span>
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
															{m['project-sheet.no-description-added']()}
														</p>
													)}
													<ProjectDescriptionDragList
														items={field.state.value}
														getItemData={getProjectDescriptionData}
														isItemData={isProjectDescriptionData}
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
							{m['project-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
