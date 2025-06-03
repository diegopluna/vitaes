import type { Language } from '@/@types/resume'
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

const languageExperienceFormSchema = z.object({
	language: z.string().min(1, m['language-sheet.language-required']()),
	fluency: z.string().min(1, m['language-sheet.fluency-required']()),
})

export function LanguageSheet({
	defaultValues,
}: {
	defaultValues?: Language
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const languages = resume.languages

	const form = useAppForm({
		validators: {
			onChange: languageExperienceFormSchema,
		},
		defaultValues: {
			language: defaultValues?.language || '',
			fluency: defaultValues?.fluency || '',
		},
		onSubmit: ({ value }) => {
			const language: Language = {
				...value,
				id: `${value.language}`,
			}
			if (defaultValues) {
				setResumeField('languages', {
					...languages,
					content: languages.content.map((w) =>
						w.id === defaultValues.id ? language : w,
					),
				})
			} else {
				setResumeField('languages', {
					...languages,
					content: [...languages.content, language],
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
							? m['language-sheet.edit']()
							: m['language-sheet.add']()
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
							? m['language-sheet.edit']()
							: m['language-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="language"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['language-sheet.language']()}
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
									name="fluency"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['language-sheet.fluency']()}
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
							</div>
						</ScrollArea>
						<Button className="mt-4" type="submit">
							{m['language-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
