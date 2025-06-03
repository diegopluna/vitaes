import type { Committee } from '@/@types/resume'
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

const comitteeExperienceFormSchema = z.object({
	year: z.string().min(1, m['comittee-sheet.year-required']()),
	position: z.string().min(1, m['comittee-sheet.position-required']()),
	organization: z.string().min(1, m['comittee-sheet.organization-required']()),
	location: z.string().min(1, m['comittee-sheet.location-required']()),
})

export function ComitteeSheet({
	defaultValues,
}: {
	defaultValues?: Committee
}) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const comittees = resume.committees

	const form = useAppForm({
		validators: {
			onChange: comitteeExperienceFormSchema,
		},
		defaultValues: {
			year: defaultValues?.year || '',
			position: defaultValues?.position || '',
			organization: defaultValues?.organization || '',
			location: defaultValues?.location || '',
		},
		onSubmit: ({ value }) => {
			const comittee: Committee = {
				...value,
				id: `${value.position} - ${value.organization}`,
			}
			if (defaultValues) {
				setResumeField('committees', {
					...resume.committees,
					content: comittees.content.map((w) =>
						w.id === defaultValues.id ? comittee : w,
					),
				})
			} else {
				setResumeField('committees', {
					...resume.committees,
					content: [...comittees.content, comittee],
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
							? m['comittee-sheet.edit']()
							: m['comittee-sheet.add']()
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
							? m['comittee-sheet.edit']()
							: m['comittee-sheet.add']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="flex flex-1 flex-col h-5/6">
						<ScrollArea>
							<div className="grid gap-4 py-4 px-1">
								<form.AppField
									name="year"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['comittee-sheet.year']()}
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
									name="position"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['comittee-sheet.position']()}
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
									name="organization"
									children={(field) => (
										<field.FormItem>
											<field.FormLabel>
												{m['comittee-sheet.organization']()}
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
												{m['comittee-sheet.location']()}
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
							{m['comittee-sheet.save']()}
						</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
