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
import { TemplateSchema, type Template } from '@vitaes/types/resume'
import { TemplateCard } from './template-card'

interface CreateResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (name: string, template: Template) => void
}

export function CreateResumeDialog({
  open,
  onOpenChange,
  onConfirm,
}: Readonly<CreateResumeDialogProps>) {
  const form = useAppForm({
    defaultValues: {
      name: '',
      template: 'awesome' as Template,
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, { message: m['validation.name']() }),
        template: TemplateSchema,
      }),
    },
    onSubmit: ({ value }) => {
      onConfirm(value.name, value.template)
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
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
          <div className="py-4 space-y-4">
            <form.AppField name="name">
              {(field) => (
                <field.FormInput
                  placeholder={m['dialogs.createResume.placeholder']()}
                />
              )}
            </form.AppField>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Choose a Template</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TemplateSchema.options.map((template) => (
                  <form.AppField key={template} name="template">
                    {(field) => (
                      <TemplateCard
                        name={template}
                        selected={field.state.value === template}
                        onClick={() => field.handleChange(template as Template)}
                      />
                    )}
                  </form.AppField>
                ))}
              </div>
            </div>
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
