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

interface RenameDialogProps {
  open: boolean
  currentName: string
  onOpenChange: (open: boolean) => void
  onConfirm: (newName: string) => void
}

export function RenameDialog({
  open,
  currentName,
  onOpenChange,
  onConfirm,
}: Readonly<RenameDialogProps>) {
  const form = useAppForm({
    defaultValues: {
      name: currentName,
    },
    validators: {
      onChange: z
        .object({
          name: z.string().min(1, { message: m['validation.name']() }),
        })
        .refine((data) => data.name !== currentName, {
          message: m['validation.name'](),
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
            <DialogTitle>{m['dialogs.renameResume.title']()}</DialogTitle>
            <DialogDescription>
              {m['dialogs.renameResume.description']()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <form.AppField name="name">
              {(field) => (
                <field.FormInput
                  placeholder={m['dialogs.renameResume.placeholder']()}
                />
              )}
            </form.AppField>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {m['dialogs.renameResume.cancel']()}
            </Button>
            <Button type="submit" disabled={!form.state.isValid}>
              {m['dialogs.renameResume.button']()}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
