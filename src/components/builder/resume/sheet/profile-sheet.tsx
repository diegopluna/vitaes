import type { Profile } from '@/@types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { IconPlus } from '@tabler/icons-react'
import { IconPencil } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'

const profileFormSchema = z.object({
	network: z.string().min(1, m['profile-sheet.network-required']()),
	username: z.string().min(1, m['profile-sheet.username-required']()),
	url: z.string().url(m['profile-sheet.url-invalid']()),
})

export function ProfileSheet({ defaultValues }: { defaultValues?: Profile }) {
	const [open, setOpen] = useState(false)
	const { resume, setResumeField } = useResumeStore((s) => s)

	const basics = resume.basics

	const form = useAppForm({
		validators: {
			onChange: profileFormSchema,
		},
		defaultValues: {
			network: defaultValues?.network || '',
			username: defaultValues?.username || '',
			url: defaultValues?.url || '',
		},
		onSubmit: ({ value }) => {
			const profile: Profile = {
				...value,
				id: `${value.network}`,
			}

			if (defaultValues) {
				setResumeField('basics', {
					...basics,
					profiles: basics.profiles.map((p) =>
						p.id === defaultValues.id ? profile : p,
					),
				})
			} else {
				setResumeField('basics', {
					...basics,
					profiles: [...basics.profiles, profile],
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
							? m['profile-sheet.edit-profile']()
							: m['profile-sheet.add-profile']()
					}
				>
					<Button variant="outline" size="icon" onClick={() => setOpen(true)}>
						{defaultValues ? (
							<IconPencil className="size-4" />
						) : (
							<IconPlus className="size-6" />
						)}
					</Button>
				</TooltipWrapper>
			</SheetTrigger>
			<SheetContent side="left" className="p-4">
				<SheetHeader>
					<SheetTitle>
						{defaultValues
							? m['profile-sheet.edit-profile']()
							: m['profile-sheet.add-profile']()}
					</SheetTitle>
				</SheetHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="space-y-8">
						<form.AppField
							name="network"
							children={(field) => (
								<field.FormItem>
									<field.FormLabel>
										{m['profile-sheet.network']()}
									</field.FormLabel>
									<field.FormControl>
										<Input
											placeholder={m['profile-sheet.network-placeholder']()}
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
							name="username"
							children={(field) => (
								<field.FormItem>
									<field.FormLabel>
										{m['profile-sheet.username']()}
									</field.FormLabel>
									<field.FormControl>
										<Input
											placeholder={m['profile-sheet.username-placeholder']()}
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
							name="url"
							children={(field) => (
								<field.FormItem>
									<field.FormLabel>{m['profile-sheet.url']()}</field.FormLabel>
									<field.FormControl>
										<Input
											placeholder={m['profile-sheet.url-placeholder']()}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
									</field.FormControl>
									<field.FormMessage />
								</field.FormItem>
							)}
						/>
						<Button type="submit">{m['profile-sheet.save']()}</Button>
					</form>
				</form.AppForm>
			</SheetContent>
		</Sheet>
	)
}
