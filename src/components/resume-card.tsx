import type { Resume } from '@/@types/resume'
import { useCloneResume, useDeleteResume } from '@/api/mutations'
import { m } from '@/paraglide/messages'
import { IconCopy, IconTrash } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import ResumeView from './resume/resume-view'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface ResumeCardProps {
	resume: {
		id: string
		name: string
		data: Resume
		createdAt?: string
		updatedAt?: string
	}
	onDelete?: () => void
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
	const navigate = useNavigate()
	const { mutate: deleteResume } = useDeleteResume({
		onSuccess: () => {
			toast.success(m['resume-card.resume-deleted']())
			onDelete?.()
		},
	})

	const { mutate: cloneResume } = useCloneResume({
		onSuccess: () => {
			toast.success(m['resume-card.resume-cloned']())
			onDelete?.() // Refresh the list to show the new cloned resume
		},
	})

	const handleDelete = () => {
		deleteResume({ data: { id: resume.id } })
	}

	const handleClone = () => {
		cloneResume({ data: { id: resume.id } })
	}

	const handleCardClick = () => {
		navigate({ to: '/builder/$id', params: { id: resume.id } })
	}

	const handleActionClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
	}

	return (
		<Card className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden rounded-none group hover:cursor-pointer dark:hover:shadow-muted hover:shadow-lg transition-all duration-300 ease-in-out relative">
			{/* Action buttons */}
			<div
				className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1"
				onClick={handleActionClick}
			>
				{/* Clone button */}
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 bg-background/80 hover:bg-primary hover:text-primary-foreground shadow-sm backdrop-blur-sm"
					onClick={handleClone}
				>
					<IconCopy className="h-4 w-4" />
				</Button>

				{/* Delete button */}
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 bg-background/80 hover:bg-destructive hover:text-destructive-foreground shadow-sm backdrop-blur-sm"
						>
							<IconTrash className="h-4 w-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="sm:max-w-[425px]">
						<AlertDialogHeader>
							<AlertDialogTitle>
								{m['resume-card.delete-resume']()}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{m['resume-card.delete-resume-description']({
									name: resume.name,
								})}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>{m['resume-card.cancel']()}</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDelete}
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							>
								{m['resume-card.delete']()}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div onClick={handleCardClick} className="flex flex-col h-full">
				<CardHeader className="p-0 gap-0">
					<div className="h-full overflow-hidden">
						<div className="w-full aspect-[1/1.414] bg-white flex items-center justify-center object-cover group-hover:bg-primary/10 transition-colors duration-300 ease-in-out relative overflow-hidden">
							<div
								style={{
									width: '210mm',
									height: '297mm',
									position: 'absolute',
									top: '0%',
									left: '0%',
									transform: 'scale(0.35)',
									transformOrigin: 'top left',
									pointerEvents: 'none',
									userSelect: 'none',
								}}
							>
								<ResumeView resume={resume.data} />
							</div>
						</div>
					</div>
					<CardTitle className="py-6 pb-4 px-6">
						<span className="text-primary group-hover:text-primary/80 transition-colors duration-300 ease-in-out">
							{resume.name}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="pb-0 text-muted-foreground group-hover:text-primary/60 transition-colors duration-300 ease-in-out">
					{/* Optionally show created/updated date */}
					{resume.updatedAt && (
						<div className="text-xs text-muted-foreground mb-2">
							{m['resume-card.updated']({
								time: new Date(resume.updatedAt).toLocaleDateString(),
							})}
						</div>
					)}
				</CardContent>
				<CardFooter className="space-x-4 mt-auto">
					<div className="w-full h-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100" />
				</CardFooter>
			</div>
		</Card>
	)
}
