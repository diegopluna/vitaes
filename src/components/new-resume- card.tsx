import { createResume } from '@/api/resume'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { IconFilePlus, IconLoader2 } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { useAppForm } from './ui/ts-form'

export function NewResumeCard() {
	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const navigate = useNavigate()

	const form = useAppForm({
		validators: {
			onChange: z.object({
				resumeName: z.string().min(1),
			}),
		},
		defaultValues: {
			resumeName: '',
		},
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await createResume({
					data: {
						name: value.resumeName,
						locale: getLocale(),
					},
				})
					.then((resume) => {
						setOpen(false)
						form.reset()
						navigate({
							to: '/builder/$id',
							params: {
								id: resume.id,
							},
						})
					})
					.catch((err) => {
						console.log(err)
						toast.error(m['new-resume-card.failed-to-create']())
					})
			})
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Card
					className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden rounded-none group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out"
					onClick={() => setOpen(true)}
				>
					<CardHeader className="p-0 gap-0">
						<div className="h-full overflow-hidden">
							<div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out">
								<IconFilePlus className="w-12 h-12 text-black group-hover:text-primary group-hover:scale-110 transition-all durantion-300 ease-in-out" />
							</div>
						</div>
						<CardTitle className="py-6 pb-4 px-6">
							<span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
								{m['new-resume-card.create-new']()}
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
						{m['new-resume-card.choose-template']()}
					</CardContent>
					<CardFooter className="space-x-4 mt-auto">
						<div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
					</CardFooter>
				</Card>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{m['new-resume-card.add-resume']()}</DialogTitle>
				</DialogHeader>
				<form.AppForm>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<form.AppField
								name="resumeName"
								children={(field) => (
									<field.FormItem>
										<field.FormLabel>
											{m['new-resume-card.resume-name']()}
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
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								{m['new-resume-card.cancel']()}
							</Button>
							<Button
								type="submit"
								disabled={form.state.isSubmitting || isPending}
							>
								{isPending && <IconLoader2 className="w-4 h-4 animate-spin" />}
								{m['new-resume-card.add']()}
							</Button>
						</DialogFooter>
					</form>
				</form.AppForm>
			</DialogContent>
		</Dialog>
	)
}
