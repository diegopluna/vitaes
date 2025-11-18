import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAppForm } from './form/form-context'
import z from 'zod'
import { m } from '@/paraglide/messages'

interface CreateResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (name: string) => void
}

export function CreateResumeDialog({
  open,
  onOpenChange,
  onConfirm,
}: CreateResumeDialogProps) {
  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, { message: m['validation.name']() }),
      }),
    },
    onSubmit: ({ value }) => {
      onConfirm(value.name)
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle>{m['dialogs.createResume.title']()}</DialogTitle>
            <DialogDescription>
              {m['dialogs.createResume.description']()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <form.AppField
              name="name"
              children={(field) => (
                <field.FormInput
                  placeholder={m['dialogs.createResume.placeholder']()}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {m['dialogs.createResume.cancel']()}
            </Button>
            <Button type="submit" disabled={!form.state.isValid}>
              {m['dialogs.createResume.button']()}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
