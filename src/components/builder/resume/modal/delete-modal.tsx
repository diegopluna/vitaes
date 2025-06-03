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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { m } from '@/paraglide/messages'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

interface DeleteModalProps {
	type: string
	onDelete(id: string): void
	id: string
}

export const DeleteModal = ({ type, onDelete, id }: DeleteModalProps) => {
	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<TooltipWrapper tooltip={m['delete-modal.tooltip']({ type })}>
					<Button
						size="icon"
						variant="outline"
						onClick={(e) => {
							e.preventDefault()
							setOpen(true)
						}}
					>
						<IconTrash className="size-4" />
					</Button>
				</TooltipWrapper>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>
						{m['delete-modal.title']({ type })}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{m['delete-modal.description']()}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{m['delete-modal.cancel']()}</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault()
							onDelete(id)
						}}
					>
						{m['delete-modal.delete']()}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
