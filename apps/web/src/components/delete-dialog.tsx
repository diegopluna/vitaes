import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { m } from '@/paraglide/messages'

interface DeleteDialogProps {
  open: boolean
  resumeName: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteDialog({
  open,
  resumeName,
  onOpenChange,
  onConfirm,
}: DeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div className="flex-1">
              <DialogTitle>{m['dialogs.deleteResume.title']()}</DialogTitle>
              <DialogDescription className="mt-1">
                {m['dialogs.deleteResume.description']({
                  resumeName,
                })}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {m['dialogs.deleteResume.cancel']()}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            {m['dialogs.deleteResume.button']()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
