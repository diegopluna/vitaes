import { withForm } from '@/components/form/form-context'
import { initialValue } from '@/utils/initial-value'
import { useSortable } from '@dnd-kit/sortable'
import { SocialPlatformSchema, type SocialProfile } from '@vitaes/types/resume'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { GripVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const SocialsItem = withForm({
  defaultValues: initialValue,
  props: {
    profile: {} as SocialProfile,
    index: 0,
  },
  render: function Render({ form, profile, index }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: profile.id,
    })
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    const onDelete = () => {
      form.setFieldValue(
        'personalInfo.socials',
        form
          .getFieldValue('personalInfo.socials')
          .filter((p) => p.id !== profile.id),
      )
    }
    const socialPlatformOptions = Object.values(SocialPlatformSchema.enum).map(
      (platform) => ({
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        value: platform,
      }),
    )

    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="p-3 space-y-2 bg-muted/30"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Profile {index + 1}
            </span>
          </div>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-2">
          <form.AppField
            name={`personalInfo.socials[${index}].platform`}
            children={(field) => (
              <field.FormSelect
                label="Platform"
                options={socialPlatformOptions}
              />
            )}
          />
          <form.AppField
            name={`personalInfo.socials[${index}].value`}
            children={(field) => (
              <field.FormInput label="Value (e.g. username, email, or URL)" />
            )}
          />
          <form.AppField
            name={`personalInfo.socials[${index}].display`}
            children={(field) => (
              <field.FormInput label="Display text (optional)" />
            )}
          />
        </div>
      </Card>
    )
  },
})
